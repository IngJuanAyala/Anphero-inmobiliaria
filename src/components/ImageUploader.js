import React, { useState, useRef } from 'react';
import { uploadImage } from '../firebase/propertiesService';
import './ImageUploader.scss';

const ImageUploader = ({ images, onImagesChange, propertyId, disabled = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cancelUpload, setCancelUpload] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled || uploading) return;

    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const handleFileInput = async (e) => {
    if (disabled || uploading) return;
    
    const files = Array.from(e.target.files);
    await handleFiles(files);
  };

  const handleFiles = async (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Por favor selecciona solo archivos de imagen');
      return;
    }

    if (imageFiles.length > 10) {
      alert('Máximo 10 imágenes por propiedad');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setCancelUpload(false);
    
    try {
      const uploadedUrls = [];
      const totalFiles = imageFiles.length;
      
      for (let i = 0; i < imageFiles.length; i++) {
        if (cancelUpload) {
          throw new Error('Subida cancelada por el usuario');
        }
        
        const file = imageFiles[i];
        const compressedFile = await compressImage(file);
        
        // Agregar timeout para evitar que se quede cargando indefinidamente
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout: La subida tardó demasiado')), 30000);
        });
        
        const uploadPromise = uploadImage(compressedFile, propertyId || 'temp');
        
        const url = await Promise.race([uploadPromise, timeoutPromise]);
        uploadedUrls.push(url);
        
        // Actualizar progreso
        setUploadProgress(((i + 1) / totalFiles) * 100);
      }
      
      if (!cancelUpload) {
        onImagesChange([...images, ...uploadedUrls]);
      }
    } catch (error) {
      console.error('Error subiendo imágenes:', error);
      
      // Mostrar mensaje más específico según el tipo de error
      if (error.message.includes('cancelada')) {
        // No mostrar alerta si fue cancelada por el usuario
      } else if (error.message.includes('Timeout')) {
        alert('Error: La subida de imágenes tardó demasiado. Verifica tu conexión a internet.');
      } else if (error.code === 'storage/unauthorized') {
        alert('Error: No tienes permisos para subir imágenes. Verifica la configuración de Firebase.');
      } else if (error.code === 'storage/network-request-failed') {
        alert('Error: Problema de conexión. Verifica tu internet e intenta de nuevo.');
      } else {
        alert('Error subiendo imágenes: ' + (error.message || 'Error desconocido'));
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setCancelUpload(false);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calcular nuevas dimensiones (máximo 1200px de ancho)
        const maxWidth = 1200;
        const maxHeight = 1200;
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a blob con compresión
        canvas.toBlob((blob) => {
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        }, 'image/jpeg', 0.8);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const removeImage = (index) => {
    if (disabled) return;
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const openFileDialog = () => {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  };

  const cancelUploadProcess = () => {
    setCancelUpload(true);
  };

  return (
    <div className="image-uploader">
      <div className="image-uploader__header">
        <h4>Imágenes de la Propiedad</h4>
        <span className="image-count">
          {images.length}/10 imágenes
        </span>
      </div>

      {/* Área de drag & drop */}
      <div
        className={`drop-zone ${dragActive ? 'drop-zone--active' : ''} ${disabled ? 'drop-zone--disabled' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
          disabled={disabled}
        />
        
        {uploading ? (
          <div className="uploading-state">
            <div className="spinner"></div>
            <p>Subiendo imágenes...</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="progress-text">{Math.round(uploadProgress)}% completado</p>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={cancelUploadProcess}
            >
              <i className="fas fa-times"></i>
              Cancelar
            </button>
          </div>
        ) : (
          <div className="drop-zone__content">
            <i className="fas fa-cloud-upload-alt"></i>
            <h3>Arrastra y suelta imágenes aquí</h3>
            <p>o haz clic para seleccionar archivos</p>
            <div className="file-info">
              <small>Formatos: JPG, PNG, GIF</small>
              <small>Máximo: 10 imágenes, 5MB cada una</small>
            </div>
          </div>
        )}
      </div>

      {/* Vista previa de imágenes */}
      {images.length > 0 && (
        <div className="image-preview">
          <h5>Imágenes cargadas:</h5>
          <div className="image-grid">
            {images.map((url, index) => (
              <div key={index} className="image-item">
                <img src={url} alt={`Propiedad ${index + 1}`} />
                <button
                  type="button"
                  className="remove-image"
                  onClick={() => removeImage(index)}
                  disabled={disabled}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
