import React, { useState, useEffect } from 'react';
import './Hero.scss';
import PropertyModal from './PropertyModal';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const stats = [
    { number: '500+', label: 'Propiedades Arrendadas', icon: 'fas fa-home' },
    { number: '98%', label: 'Clientes Satisfechos', icon: 'fas fa-smile' },
    { number: '15+', label: 'Años de Experiencia', icon: 'fas fa-award' }
  ];

  const benefits = [
    { icon: 'fas fa-chart-line', title: 'Máximo Valor', description: 'Obtén el mejor precio por tu propiedad' },
    { icon: 'fas fa-clock', title: 'Venta Rápida', description: 'Proceso optimizado para resultados inmediatos' },
    { icon: 'fas fa-shield-alt', title: 'Seguridad Total', description: 'Transacciones 100% seguras y transparentes' }
  ];

  return (
    <section id="hero" className="hero">
      <div className="hero__background">
        <div className="hero__overlay"></div>
        <div className="hero__video-container">
          <video autoPlay muted loop playsInline className="hero__video">
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            {/* Fallback para navegadores que no soportan video */}
          </video>
        </div>
      </div>
      
      <div className="container">
        <div className="hero__content">
          <div className="hero__main">
            <div className="hero__text">
              <div className={`hero__badge ${isVisible ? 'hero__badge--visible' : ''}`}>
                <i className="fas fa-star"></i>
                <span>Líder en Bienes Raíces</span>
              </div>
              
              <h1 className={`hero__title ${isVisible ? 'hero__title--visible' : ''}`}>
                <span className="hero__title-main">Tu Propiedad</span>
                <span className="hero__title-highlight">Vale Más</span>
                <span className="hero__title-sub">de lo que piensas</span>
              </h1>
              
              <p className={`hero__description ${isVisible ? 'hero__description--visible' : ''}`}>
                Somos expertos en maximizar el valor de tu propiedad. Con nuestra estrategia 
                personalizada y tecnología avanzada, conseguimos los mejores precios del mercado 
                en tiempo récord.
              </p>
              
              <div className={`hero__stats ${isVisible ? 'hero__stats--visible' : ''}`}>
                <div className="stat-card">
                  <div className="stat-card__icon">
                    <i className={stats[currentStat].icon}></i>
                  </div>
                  <div className="stat-card__content">
                    <span className="stat-card__number">{stats[currentStat].number}</span>
                    <span className="stat-card__label">{stats[currentStat].label}</span>
                  </div>
                </div>
              </div>
              
              <div className={`hero__cta ${isVisible ? 'hero__cta--visible' : ''}`}>
                <button 
                  className="btn btn--primary hero__cta-primary"
                  onClick={() => scrollToSection('contact')}
                >
                  <i className="fas fa-phone"></i>
                  Evaluación Gratuita
                </button>
                <button 
                  className="btn btn--outline hero__cta-secondary"
                  onClick={() => scrollToSection('services')}
                >
                  <i className="fas fa-info-circle"></i>
                  Conocer Servicios
                </button>
              </div>
            </div>
          </div>
          
          <div className="hero__side">
            <div className={`hero__benefits ${isVisible ? 'hero__benefits--visible' : ''}`}>
              <h3 className="benefits__title">¿Por qué elegirnos?</h3>
              <div className="benefits__list">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-item__icon">
                      <i className={benefit.icon}></i>
                    </div>
                    <div className="benefit-item__content">
                      <h4>{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="benefits__cta">
                <a href="https://wa.me/573223669110" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
                  <i className="fab fa-whatsapp"></i>
                  Consulta Inmediata
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero__scroll-indicator">
        <div className="scroll-indicator__text">Descubre más</div>
        <div className="scroll-indicator__arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      
      <PropertyModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default Hero;
