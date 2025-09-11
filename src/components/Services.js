import React from 'react';
import './Services.scss';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: 'fas fa-home',
      title: 'Arriendo de Propiedades',
      description: 'Gestionamos el arriendo de tu propiedad de manera eficiente, encontrando inquilinos calificados en el menor tiempo posible.',
      features: ['Mercadeo profesional', 'Selección de inquilinos', 'Gestión administrativa', 'Mantenimiento preventivo']
    },
    {
      id: 2,
      icon: 'fas fa-handshake',
      title: 'Venta de Inmuebles',
      description: 'Te ayudamos a vender tu propiedad al mejor precio del mercado con estrategias de mercadeo personalizadas.',
      features: ['Valoración profesional', 'Mercadeo digital', 'Negociación experta', 'Cierre de transacción']
    },
    {
      id: 3,
      icon: 'fas fa-search',
      title: 'Asesoría Inmobiliaria',
      description: 'Brindamos asesoría especializada para que tomes las mejores decisiones en el mercado inmobiliario.',
      features: ['Análisis de mercado', 'Inversión inmobiliaria', 'Financiamiento', 'Legal y tributario']
    }
  ];

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="services__header">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Ofrecemos servicios integrales en finca raíz para satisfacer todas tus necesidades inmobiliarias
          </p>
        </div>

        <div className="services__grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card__header">
                <div className="service-card__icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-card__title">{service.title}</h3>
              </div>
              
              <p className="service-card__description">{service.description}</p>
              
              <ul className="service-card__features">
                {service.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <i className="fas fa-check"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="service-card__cta">
                <a 
                  href={`https://wa.me/573223669110?text=Hola,%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(service.title)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--outline"
                >
                  <i className="fab fa-whatsapp"></i>
                  Consultar
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="services__highlight">
          <div className="highlight__content">
            <div className="highlight__text">
              <h3>¿Por qué elegir nuestros servicios?</h3>
              <ul className="highlight__list">
                <li>
                  <i className="fas fa-star"></i>
                  <span>Experiencia comprobada en el mercado inmobiliario de Bogotá</span>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <span>Equipo profesional con formación académica especializada</span>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <span>Tecnología de vanguardia para la gestión de propiedades</span>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <span>Compromiso total con la satisfacción del cliente</span>
                </li>
                <li>
                  <i className="fas fa-star"></i>
                  <span>Resultados medibles y garantizados</span>
                </li>
              </ul>
            </div>
            
            <div className="highlight__house-tour">
              <div className="house-tour__image">
                <img 
                  src="/images/services-highlight.jpg" 
                  alt="House Tour Profesional Anphero" 
                  className="house-tour__img"
                />
                <div className="house-tour__overlay">
                  <div className="overlay__content">
                    <div className="overlay__header">
                      <img src="/Anphero-inmobiliaria/logo-anphero-official.png" alt="Anphero" className="overlay__logo" />
                      <span>Servicios Anphero</span>
                    </div>
                    <h4>House Tour Profesional</h4>
                    <p>Incluido en todos nuestros servicios</p>
                    <div className="house-tour__benefits">
                      <div className="benefit">
                        <i className="fas fa-camera"></i>
                        <span>Fotografía Profesional</span>
                      </div>
                      <div className="benefit">
                        <i className="fas fa-video"></i>
                        <span>Video Estabilizado</span>
                      </div>
                      <div className="benefit">
                        <i className="fas fa-chart-line"></i>
                        <span>200% Más Probabilidad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
