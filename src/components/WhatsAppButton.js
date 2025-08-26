import React, { useState, useEffect } from 'react';
import './WhatsAppButton.scss';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola! Me gustaría recibir información sobre sus servicios inmobiliarios.');
    window.open(`https://wa.me/573223669110?text=${message}`, '_blank');
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`whatsapp-button ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="whatsapp-button__main" onClick={handleWhatsAppClick}>
        <div className="whatsapp-icon">
          <i className="fab fa-whatsapp"></i>
        </div>
        <div className="whatsapp-text">
          <span className="text-primary">¡Hola!</span>
          <span className="text-secondary">¿Necesitas ayuda?</span>
        </div>
      </div>
      
      <div className="whatsapp-button__tooltip">
        <div className="tooltip__content">
          <h4>¡Contáctanos por WhatsApp!</h4>
          <p>Responde en segundos y recibe atención personalizada</p>
          <div className="tooltip__features">
            <div className="feature">
              <i className="fas fa-clock"></i>
              <span>Respuesta inmediata</span>
            </div>
            <div className="feature">
              <i className="fas fa-user"></i>
              <span>Atención personalizada</span>
            </div>
            <div className="feature">
              <i className="fas fa-home"></i>
              <span>Asesoría inmobiliaria</span>
            </div>
          </div>
          <button className="tooltip__cta" onClick={handleWhatsAppClick}>
            <i className="fab fa-whatsapp"></i>
            Chatear ahora
          </button>
        </div>
      </div>

      <div className="whatsapp-button__pulse"></div>
    </div>
  );
};

export default WhatsAppButton;
