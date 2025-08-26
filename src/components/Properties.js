import React, { useState, useEffect } from 'react';
import './Properties.scss';

const Properties = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('why-choose-us');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs = [
    {
      id: 'expertise',
      title: 'Experiencia',
      icon: 'fas fa-award',
      content: {
        title: '15+ Años de Experiencia',
        description: 'Somos expertos en el mercado inmobiliario con más de una década de experiencia exitosa.',
        features: [
          'Conocimiento profundo del mercado local',
          'Estrategias probadas de valoración',
          'Red extensa de compradores calificados',
          'Procesos optimizados para resultados rápidos'
        ],
        stat: {
          number: '500+',
          label: 'Propiedades Vendidas'
        }
      }
    },
    {
      id: 'technology',
      title: 'Tecnología',
      icon: 'fas fa-rocket',
      content: {
        title: 'Tecnología de Vanguardia',
        description: 'Utilizamos las herramientas más avanzadas para maximizar el valor de tu propiedad.',
        features: [
          'Análisis de mercado en tiempo real',
          'Marketing digital de alto impacto',
          'Tours virtuales profesionales',
          'Seguimiento inteligente de leads'
        ],
        stat: {
          number: '3x',
          label: 'Más Visibilidad'
        }
      }
    },
    {
      id: 'service',
      title: 'Servicio',
      icon: 'fas fa-heart',
      content: {
        title: 'Servicio Personalizado',
        description: 'Cada cliente es único. Ofrecemos atención personalizada y dedicada.',
        features: [
          'Asesoría personalizada gratuita',
          'Acompañamiento durante todo el proceso',
          'Comunicación constante y transparente',
          'Soporte post-venta completo'
        ],
        stat: {
          number: '98%',
          label: 'Clientes Satisfechos'
        }
      }
    }
  ];

  return (
    <section id="why-choose-us" className="why-choose-us">
      <div className="container">
        <div className={`section-header ${isVisible ? 'section-header--visible' : ''}`}>
          <h2 className="section-title">¿Por qué elegir ANPHERO?</h2>
          <p className="section-description">
            Descubre las ventajas que nos convierten en la mejor opción para vender tu propiedad
          </p>
        </div>

        <div className="why-choose-us__content">
          <div className={`tabs-container ${isVisible ? 'tabs-container--visible' : ''}`}>
            <div className="tabs-nav">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === index ? 'tab-button--active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="tab-button__icon">
                    <i className={tab.icon}></i>
                  </div>
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>

            <div className="tab-content">
              <div className={`tab-panel ${isVisible ? 'tab-panel--visible' : ''}`}>
                <div className="tab-panel__header">
                  <h3>{tabs[activeTab].content.title}</h3>
                  <p>{tabs[activeTab].content.description}</p>
                </div>

                <div className="tab-panel__body">
                  <div className="features-grid">
                    {tabs[activeTab].content.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <div className="feature-item__icon">
                          <i className="fas fa-check"></i>
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="stat-highlight">
                    <div className="stat-highlight__number">
                      {tabs[activeTab].content.stat.number}
                    </div>
                    <div className="stat-highlight__label">
                      {tabs[activeTab].content.stat.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`cta-section ${isVisible ? 'cta-section--visible' : ''}`}>
            <div className="cta-card">
              <div className="cta-card__content">
                <h3>¿Listo para vender tu propiedad?</h3>
                <p>Obtén una evaluación gratuita y descubre cuánto vale realmente tu inmueble</p>
                
                <div className="cta-card__benefits">
                  <div className="benefit-tag">
                    <i className="fas fa-clock"></i>
                    <span>Evaluación en 24h</span>
                  </div>
                  <div className="benefit-tag">
                    <i className="fas fa-dollar-sign"></i>
                    <span>100% Gratuita</span>
                  </div>
                  <div className="benefit-tag">
                    <i className="fas fa-chart-line"></i>
                    <span>Sin compromiso</span>
                  </div>
                </div>

                <div className="cta-card__actions">
                  <button 
                    className="btn btn--primary"
                    onClick={() => scrollToSection('contact')}
                  >
                    <i className="fas fa-phone"></i>
                    Solicitar Evaluación
                  </button>
                  <a 
                    href="https://wa.me/573223669110" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn--whatsapp"
                  >
                    <i className="fab fa-whatsapp"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Properties;
