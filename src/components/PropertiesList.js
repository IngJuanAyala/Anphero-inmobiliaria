import React, { useState, useEffect } from 'react';
import { getProperties, getPropertiesByType, getPropertiesByOperation } from '../firebase/propertiesService';
import './PropertiesList.scss';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('todas');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    loadProperties();
  }, [activeFilter]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      // Siempre obtener todas las propiedades primero
      const allProperties = await getProperties();
      
      // Filtrar localmente
      let filteredProperties = allProperties;
      
      if (activeFilter === 'casas') {
        filteredProperties = allProperties.filter(p => p.tipo === 'casa');
      } else if (activeFilter === 'apartamentos') {
        filteredProperties = allProperties.filter(p => p.tipo === 'apartamento');
      } else if (activeFilter === 'arriendo') {
        filteredProperties = allProperties.filter(p => p.operacion === 'arriendo');
      } else if (activeFilter === 'venta') {
        filteredProperties = allProperties.filter(p => p.operacion === 'venta');
      }
      
      // Ordenar: destacadas primero, luego por fecha
      const sortedProperties = filteredProperties.sort((a, b) => {
        // Primero las destacadas
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        
        // Luego por fecha de creación
        if (a.fechaCreacion && b.fechaCreacion) {
          return b.fechaCreacion.toDate() - a.fechaCreacion.toDate();
        }
        return 0;
      });

      console.log('Propiedades cargadas:', allProperties);
      console.log('Propiedades filtradas y ordenadas:', sortedProperties);
      console.log('Total de propiedades a mostrar:', sortedProperties.length);
      setProperties(sortedProperties);
    } catch (error) {
      console.error('Error cargando propiedades:', error);
      setProperties([]);
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
    const message = `Hola, me interesa la propiedad: ${property.titulo} - ${formatPrice(property.precio)}`;
    const whatsappUrl = `https://wa.me/573223669110?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleVideoClick = (videoUrl) => {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  };


  const handleImageClick = (property) => {
    if (property.fotos && property.fotos.length > 0) {
      setSelectedPropertyForModal(property);
      setModalImageIndex(0);
      setShowImageModal(true);
    }
  };

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

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedPropertyForModal(null);
    setModalImageIndex(0);
  };

  const filters = [
    { id: 'todas', label: 'Todas', icon: 'fas fa-home' },
    { id: 'casas', label: 'Casas', icon: 'fas fa-home' },
    { id: 'apartamentos', label: 'Apartamentos', icon: 'fas fa-building' },
    { id: 'arriendo', label: 'Arriendo', icon: 'fas fa-key' },
    { id: 'venta', label: 'Venta', icon: 'fas fa-handshake' }
  ];

  if (loading) {
    return (
      <section className="properties-list-section">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando propiedades...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="properties-list-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nuestras Propiedades</h2>
          <p className="section-description">
            Descubre las mejores opciones inmobiliarias disponibles
          </p>
        </div>

        <div className="filters-container">
          <div className="filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <i className={filter.icon}></i>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="no-properties">
            <i className="fas fa-home"></i>
            <h3>No hay propiedades disponibles</h3>
            <p>Próximamente tendremos nuevas opciones para ti</p>
            <div className="debug-info" style={{marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '5px', fontSize: '12px'}}>
              <p><strong>Debug:</strong> Filtro activo: {activeFilter}</p>
              <p>Total de propiedades cargadas: {properties.length}</p>
            </div>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  {property.fotos && property.fotos.length > 0 ? (
                    <div className="property-image-container" onClick={() => handleImageClick(property)}>
                      <img 
                        src={property.fotos[0]} 
                        alt={property.titulo} 
                      />
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
                  
                  <div className="property-badges">
                    {property.destacado && (
                      <span className="badge badge--destacada">
                        <i className="fas fa-star"></i>
                        DESTACADA
                      </span>
                    )}
                    <span className={`badge badge--${property.tipo}`}>
                      {property.tipo}
                    </span>
                    <span className={`badge badge--${property.operacion}`}>
                      {property.operacion}
                    </span>
                  </div>
                </div>

                <div className="property-content">
                  <h3 className="property-title">{property.titulo}</h3>
                  
                  <p className="property-location">
                    <i className="fas fa-map-marker-alt"></i>
                    {property.ubicacion}
                  </p>

                  <p className="property-price">
                    {formatPrice(property.precio)}
                  </p>

                  <p className="property-description">
                    {property.descripcion?.substring(0, 100)}...
                  </p>

                  <div className="property-actions">
                    <button 
                      className="btn btn--primary"
                      onClick={() => handleWhatsAppClick(property)}
                    >
                      <i className="fab fa-whatsapp"></i>
                      Contactar
                    </button>
                    
                    {(property.video || property.videoUrl) && (
                      <button 
                        className="btn btn--outline"
                        onClick={() => handleVideoClick(property.video || property.videoUrl)}
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
        )}

        <div className="cta-section">
          <div className="cta-card">
            <h3>¿No encuentras lo que buscas?</h3>
            <p>Contáctanos y te ayudaremos a encontrar la propiedad perfecta</p>
            <a 
              href="https://wa.me/573223669110" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn--whatsapp"
            >
              <i className="fab fa-whatsapp"></i>
              Contactar por WhatsApp
            </a>
          </div>
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
                />
                
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
                  onClick={() => handleVideoClick(selectedPropertyForModal.video || selectedPropertyForModal.videoUrl)}
                >
                  <i className="fas fa-video"></i>
                  Ver Video
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PropertiesList;
