import React, { useState, useEffect } from 'react';
import { addProperty, updateProperty } from '../firebase/propertiesService';
import ImageUploader from './ImageUploader';
import './PropertyModal.scss';

const PropertyModal = ({ isOpen, onClose, property = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'apartamento',
    operacion: 'arriendo',
    precio: '',
    area: '',
    habitaciones: '',
    banos: '',
    ubicacion: '',
    direccion: '',
    caracteristicas: [],
    videoUrl: '',
    activo: true,
    destacado: false
  });

  const [newCharacteristic, setNewCharacteristic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fotos, setFotos] = useState([]);

  // Cargar datos de la propiedad si estamos editando
  useEffect(() => {
    if (property) {
      setFormData({
        titulo: property.titulo || '',
        descripcion: property.descripcion || '',
        tipo: property.tipo || 'apartamento',
        operacion: property.operacion || 'arriendo',
        precio: property.precio || '',
        area: property.area || '',
        habitaciones: property.habitaciones || '',
        banos: property.banos || '',
        ubicacion: property.ubicacion || '',
        direccion: property.direccion || '',
        caracteristicas: property.caracteristicas || [],
        videoUrl: property.videoUrl || '',
        activo: property.activo !== undefined ? property.activo : true,
        destacado: property.destacado || false
      });
      setFotos(property.fotos || []);
    } else {
      // Resetear formulario para nueva propiedad
      setFormData({
        titulo: '',
        descripcion: '',
        tipo: 'apartamento',
        operacion: 'arriendo',
        precio: '',
        area: '',
        habitaciones: '',
        banos: '',
        ubicacion: '',
        direccion: '',
        caracteristicas: [],
        videoUrl: '',
        activo: true,
        destacado: false
      });
      setFotos([]);
    }
  }, [property, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addCharacteristic = () => {
    if (newCharacteristic.trim()) {
      setFormData(prev => ({
        ...prev,
        caracteristicas: [...prev.caracteristicas, newCharacteristic.trim()]
      }));
      setNewCharacteristic('');
    }
  };

  const removeCharacteristic = (index) => {
    setFormData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index)
    }));
  };

  const handleImagesChange = (newImages) => {
    setFotos(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const propertyData = {
        ...formData,
        fotos: fotos,
        precio: parseFloat(formData.precio),
        area: parseFloat(formData.area),
        habitaciones: parseInt(formData.habitaciones),
        banos: parseInt(formData.banos)
      };

      if (property) {
        await updateProperty(property.id, propertyData);
      } else {
        await addProperty(propertyData);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError('Error al guardar la propiedad: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{property ? 'Editar Propiedad' : 'Nueva Propiedad'}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="titulo">Título *</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                required
                placeholder="Ej: Hermoso apartamento en Chapinero"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Describe la propiedad en detalle..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipo">Tipo *</label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="operacion">Operación *</label>
              <select
                id="operacion"
                name="operacion"
                value={formData.operacion}
                onChange={handleInputChange}
                required
              >
                <option value="arriendo">Arriendo</option>
                <option value="venta">Venta</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="precio">Precio *</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                required
                placeholder="1500000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="area">Área (m²) *</label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required
                placeholder="75"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="habitaciones">Habitaciones *</label>
              <input
                type="number"
                id="habitaciones"
                name="habitaciones"
                value={formData.habitaciones}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="banos">Baños *</label>
              <input
                type="number"
                id="banos"
                name="banos"
                value={formData.banos}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="2"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ubicacion">Ubicación *</label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
                placeholder="Chapinero, Bogotá"
              />
            </div>

            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                placeholder="Carrera 15 # 85-32"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="videoUrl">URL del Video</label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div className="form-group">
            <label>Características</label>
            <div className="characteristics-input">
              <input
                type="text"
                value={newCharacteristic}
                onChange={(e) => setNewCharacteristic(e.target.value)}
                placeholder="Ej: Piscina, Garaje, Balcón..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCharacteristic())}
              />
              <button type="button" onClick={addCharacteristic} className="btn-add">
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="characteristics-list">
              {formData.caracteristicas.map((char, index) => (
                <span key={index} className="characteristic-tag">
                  {char}
                  <button
                    type="button"
                    onClick={() => removeCharacteristic(index)}
                    className="remove-tag"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <ImageUploader
            images={fotos}
            onImagesChange={handleImagesChange}
            propertyId={property?.id}
            disabled={loading}
          />

          <div className="form-group checkbox-row">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Propiedad Activa</span>
              </label>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Propiedad Destacada</span>
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn--secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Guardando...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  {property ? 'Actualizar' : 'Crear'} Propiedad
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyModal;