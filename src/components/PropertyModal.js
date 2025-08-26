import React from 'react';
import './PropertyModal.scss';

const PropertyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.link/poyb29', '_blank');
  };

  const handleVideoClick = () => {
    window.open('https://youtu.be/F6Zlhxcg5HY?si=bAxamJ3qfP83Fqng', '_blank');
  };

  return (
    <div className="property-modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="modal-header">
          <div className="property-image">
            <img src="/images/hero-property.jpg" alt="Casa Ciudad Tintal" />
            <div className="property-badge">
              <i className="fas fa-star"></i>
              <span>Destacada</span>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="property-title">
            <h2>Se Arrienda Casa Ubicada En Ciudad Tintal</h2>
            <div className="property-price">
              <span className="price-amount">COP 1,200,000.00</span>
              <span className="price-note">Administración Ya Incluida</span>
            </div>
          </div>

          <div className="property-actions">
            <button className="btn btn--primary" onClick={handleWhatsAppClick}>
              <i className="fab fa-whatsapp"></i>
              Contacto Directo WhatsApp
            </button>
            <button className="btn btn--outline" onClick={handleVideoClick}>
              <i className="fas fa-video"></i>
              Ver Vídeo del Inmueble
            </button>
          </div>

          <div className="property-details">
            <div className="details-section">
              <h3>Características De La Casa</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>4 Niveles</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>Sala comedor</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>3 Habitaciones</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>2 Baños</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>Cocina Integral</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>Zona de Ropa</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>Altillo</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>Parqueadero Comunal</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Requisitos</h3>
              <div className="requirements-list">
                <div className="requirement-item">
                  <i className="fas fa-check"></i>
                  <span>Certificación laboral</span>
                </div>
                <div className="requirement-item">
                  <i className="fas fa-check"></i>
                  <span>Desprendible de nómina últimos 3 meses</span>
                </div>
                <div className="requirement-item">
                  <i className="fas fa-check"></i>
                  <span>Extractos Bancarios últimos 3 meses</span>
                </div>
                <div className="requirement-item">
                  <i className="fas fa-check"></i>
                  <span>Codeudor Solvente</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Contacto</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>322 366 9110</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-user"></i>
                  <span>Real Estate Manager 1: Alexandra Rojas</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-user"></i>
                  <span>Real Estate Manager 2: Andrés Rodríguez</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-building"></i>
                  <span>ANPHERO INMOBILIARIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
