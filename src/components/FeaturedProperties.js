import React, { useState, useEffect } from 'react';
import { getProperties } from '../firebase/propertiesService';
import './FeaturedProperties.scss';

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);


  const loadFeaturedProperties = async () => {
    setLoading(true);
    try {
      const allProperties = await getProperties();
      
      // Filtrar solo las propiedades destacadas
      const featured = allProperties.filter(property => property.destacado === true);
      
      setFeaturedProperties(featured.slice(0, 3)); // Mostrar máximo 3 destacadas
    } catch (error) {
      console.error('Error cargando propiedades destacadas:', error);
      setFeaturedProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppClick = (property) => {
    const message = `Hola, me interesa la propiedad destacada: ${property.titulo} - ${formatPrice(property.precio)}`;
    const whatsappUrl = `https://wa.me/573223669110?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Función para abrir el modal de imágenes
  const handleImageClick = (property) => {
    if (property.fotos && property.fotos.length > 0) {
      setSelectedPropertyForModal(property);
      setModalImageIndex(0);
      setShowImageModal(true);
    }
  };

  // Función para navegación de imágenes en el modal
  const handleModalImageNavigation = (direction) => {
    if (!selectedPropertyForModal || !selectedPropertyForModal.fotos) return;

    const totalImages = selectedPropertyForModal.fotos.length;
    let newIndex;

    if (direction === 'next') {
      newIndex = (modalImageIndex + 1) % totalImages;
    } else {
      newIndex = modalImageIndex === 0 ? totalImages - 1 : modalImageIndex - 1;
    }

    setModalImageIndex(newIndex);
  };

  // Función para cerrar el modal de imágenes
  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedPropertyForModal(null);
    setModalImageIndex(0);
    setShowFullscreenImage(false);
  };

  // Función para abrir la imagen en pantalla completa
  const openFullscreenImage = () => {
    setShowFullscreenImage(true);
  };

  // Función para cerrar la imagen en pantalla completa
  const closeFullscreenImage = () => {
    setShowFullscreenImage(false);
  };

  // Función para navegación en pantalla completa
  const handleFullscreenNavigation = (direction) => {
    if (!selectedPropertyForModal || !selectedPropertyForModal.fotos) return;

    const totalImages = selectedPropertyForModal.fotos.length;
    let newIndex;

    if (direction === 'next') {
      newIndex = (modalImageIndex + 1) % totalImages;
    } else {
      newIndex = modalImageIndex === 0 ? totalImages - 1 : modalImageIndex - 1;
    }

    setModalImageIndex(newIndex);
  };

  if (loading) {
    return (
      <section className="featured-properties-section">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando propiedades destacadas...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredProperties.length === 0) {
    return null; // No mostrar la sección si no hay propiedades destacadas
  }

  return (
    <section className="featured-properties-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-star"></i>
            <span>Propiedades Destacadas</span>
          </div>
          <h2 className="section-title">Nuestras Mejores Oportunidades</h2>
          <p className="section-description">
            Propiedades seleccionadas especialmente por su excelente ubicación, características únicas y gran valor
          </p>
        </div>

        <div className="featured-grid">
          {featuredProperties.map((property) => (
            <div key={property.id} className="featured-card">
              <div className="featured-image" onClick={() => handleImageClick(property)}>
                {property.fotos && property.fotos.length > 0 ? (
                  <div className="property-image-container">
                    <img src={property.fotos[0]} alt={property.titulo} />
                    {property.fotos.length > 1 && (
                      <div className="multiple-images-indicator">
                        <i className="fas fa-images"></i>
                        <span>{property.fotos.length}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-image">
                    <i className="fas fa-image"></i>
                  </div>
                )}
                
                <div className="featured-badge">
                  <i className="fas fa-star"></i>
                  <span>DESTACADA</span>
                </div>

                <div className="property-badges">
                  <span className={`badge badge--${property.tipo}`}>
                    {property.tipo}
                  </span>
                  <span className={`badge badge--${property.operacion}`}>
                    {property.operacion}
                  </span>
                </div>
              </div>

              <div className="featured-content">
                <h3 className="featured-title">{property.titulo}</h3>
                
                <p className="featured-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {property.ubicacion}
                </p>

                <div className="featured-details">
                  <div className="detail-item">
                    <i className="fas fa-expand-arrows-alt"></i>
                    <span>{property.area} m²</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-bed"></i>
                    <span>{property.habitaciones} hab</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-bath"></i>
                    <span>{property.banos} baños</span>
                  </div>
                </div>

                <p className="featured-price">
                  {formatPrice(property.precio)}
                </p>

                <div className="featured-actions">
                  <button 
                    className="btn btn--primary"
                    onClick={() => handleWhatsAppClick(property)}
                  >
                    <i className="fab fa-whatsapp"></i>
                    Consultar
                  </button>
                  
                  {(property.video || property.videoUrl) && (
                    <button 
                      className="btn btn--outline"
                      onClick={() => window.open(property.video || property.videoUrl, '_blank')}
                    >
                      <i className="fas fa-video"></i>
                      Ver Video
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="featured-cta">
          <p>¿Quieres ver todas nuestras propiedades?</p>
          <a href="#properties" className="btn btn--outline">
            <i className="fas fa-home"></i>
            Ver Todas las Propiedades
          </a>
        </div>
      </div>

      {/* Modal de imágenes */}
      {showImageModal && selectedPropertyForModal && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={closeImageModal}>
              <i className="fas fa-times"></i>
            </button>

            <div className="image-modal-header">
              <h3>{selectedPropertyForModal.titulo}</h3>
              <p>{selectedPropertyForModal.ubicacion}</p>
            </div>

            <div className="image-modal-body">
              <div className="modal-image-container">
                <img
                  src={selectedPropertyForModal.fotos[modalImageIndex]}
                  alt={`${selectedPropertyForModal.titulo} - Imagen ${modalImageIndex + 1}`}
                  onClick={openFullscreenImage}
                  className="clickable-image"
                />
                <div className="zoom-indicator">
                  <i className="fas fa-search-plus"></i>
                  <span>Haz clic para ampliar</span>
                </div>

                {selectedPropertyForModal.fotos.length > 1 && (
                  <>
                    <button
                      className="modal-nav-btn modal-nav-btn--prev"
                      onClick={() => handleModalImageNavigation('prev')}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      className="modal-nav-btn modal-nav-btn--next"
                      onClick={() => handleModalImageNavigation('next')}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </>
                )}
              </div>

              {selectedPropertyForModal.fotos.length > 1 && (
                <div className="modal-image-thumbnails">
                  {selectedPropertyForModal.fotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto}
                      alt={`Miniatura ${index + 1}`}
                      className={`thumbnail ${index === modalImageIndex ? 'active' : ''}`}
                      onClick={() => setModalImageIndex(index)}
                    />
                  ))}
                </div>
              )}

              <div className="modal-image-info">
                <span className="image-counter">
                  {modalImageIndex + 1} / {selectedPropertyForModal.fotos.length}
                </span>
                <span className="image-price">
                  {formatPrice(selectedPropertyForModal.precio)}
                </span>
              </div>
            </div>

            <div className="image-modal-footer">
              <button
                className="btn btn--primary"
                onClick={() => handleWhatsAppClick(selectedPropertyForModal)}
              >
                <i className="fab fa-whatsapp"></i>
                Contactar por WhatsApp
              </button>

              {(selectedPropertyForModal.video || selectedPropertyForModal.videoUrl) && (
                <button
                  className="btn btn--outline"
                  onClick={() => window.open(selectedPropertyForModal.video || selectedPropertyForModal.videoUrl, '_blank')}
                >
                  <i className="fas fa-video"></i>
                  Ver Video
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de pantalla completa */}
      {showFullscreenImage && selectedPropertyForModal && (
        <div className="fullscreen-image-overlay" onClick={closeFullscreenImage}>
          <div className="fullscreen-image-content" onClick={(e) => e.stopPropagation()}>
            <button className="fullscreen-close-btn" onClick={closeFullscreenImage}>
              <i className="fas fa-times"></i>
            </button>

            <div className="fullscreen-image-container">
              <img
                src={selectedPropertyForModal.fotos[modalImageIndex]}
                alt={`${selectedPropertyForModal.titulo} - Imagen ${modalImageIndex + 1}`}
                className="fullscreen-image"
              />

              {selectedPropertyForModal.fotos.length > 1 && (
                <>
                  <button
                    className="fullscreen-nav-btn fullscreen-nav-btn--prev"
                    onClick={() => handleFullscreenNavigation('prev')}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button
                    className="fullscreen-nav-btn fullscreen-nav-btn--next"
                    onClick={() => handleFullscreenNavigation('next')}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              )}
            </div>

            <div className="fullscreen-image-info">
              <div className="image-counter">
                {modalImageIndex + 1} / {selectedPropertyForModal.fotos.length}
              </div>
              <div className="image-title">
                {selectedPropertyForModal.titulo}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;
