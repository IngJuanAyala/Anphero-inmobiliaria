import React, { useState, useEffect } from 'react';
import './HouseTour.scss';

const HouseTour = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('house-tour');
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

  const handleVideoClick = () => {
    setIsVideoPlaying(true);
  };

  const getVideoEmbedUrl = (videoUrl) => {
    // Convertir URL de YouTube a formato embed
    const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&rel=0` : videoUrl;
  };

  const houseTours = [
    {
      id: 1,
      title: 'Apartamento Portal de Molinos 2',
      location: 'Portal de Molinos 2, Bogotá',
      type: 'Arriendo',
      price: '$1,200,000/mes',
      video: 'https://www.youtube.com/watch?v=kH41j9WKS7k',
      thumbnail: '/images/services-highlight.jpg',
      description: 'House Tour con Drone - Apartamento Portal de Molinos 2 ANPHERO INMOBILIARIA',
      features: ['2 habitaciones', '1 baño', 'Cocina integral', 'Balcón privado', 'Cerca a transporte'],
      views: '2.5k',
      likes: '98%'
    },
    {
      id: 2,
      title: 'Apartamento Castilla Imperial',
      location: 'Conjunto Residencial Castilla Imperial, Bogotá',
      type: 'Arriendo',
      price: '$1,500,000/mes',
      video: 'https://www.youtube.com/watch?v=w1KrNMghYY8',
      thumbnail: '/images/services-highlight.jpg',
      description: 'Apartamento Ubicado en Conjunto Residencial Castilla Imperial House Tour ANPHERO INMOBILIARIA',
      features: ['3 habitaciones', '2 baños', 'Cocina integral', 'Sala comedor', 'Zona residencial'],
      views: '3.2k',
      likes: '95%'
    },
    {
      id: 3,
      title: 'Macondo Santa Lucia - Apto1909',
      location: 'Macondo Santa Lucia, Bogotá',
      type: 'Arriendo',
      price: '$1,800,000/mes',
      video: 'https://www.youtube.com/watch?v=t6nT4BGN-yQ',
      thumbnail: '/images/services-highlight.jpg',
      description: 'Macondo Santa Lucia - Apto1909 House Tour Con Drone ANPHERO INMOBILIARIA',
      features: ['2 habitaciones', '2 baños', 'Cocina integral', 'Balcón', 'Amenities'],
      views: '1.8k',
      likes: '92%'
    },
    {
      id: 4,
      title: 'Apartamento Torres del 20 de Julio',
      location: 'Torres del 20 de Julio, Bogotá',
      type: 'Arriendo',
      price: '$2,200,000/mes',
      video: 'https://www.youtube.com/watch?v=mjavcJt_xyI',
      thumbnail: '/images/services-highlight.jpg',
      description: 'Apartamento Torres del 20 de Julio House Tour Con Drone ANPHERO INMOBILIARIA',
      features: ['3 habitaciones', '2 baños', 'Cocina integral', 'Sala comedor', 'Vista panorámica'],
      views: '2.1k',
      likes: '94%'
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-camera',
      title: 'Fotografía Profesional',
      description: 'Imágenes de alta calidad que muestran cada detalle de tu propiedad',
      color: '#ffd700'
    },
    {
      icon: 'fas fa-video',
      title: 'Video Estabilizado',
      description: 'Recorridos suaves y profesionales con estabilizadores de última generación',
      color: '#25d366'
    },
    {
      icon: 'fas fa-chart-line',
      title: '200% Más Probabilidad',
      description: 'Aumenta significativamente las posibilidades de arrendar o vender tu propiedad',
      color: '#ff6b6b'
    },
    {
      icon: 'fas fa-globe',
      title: 'Alcance Digital',
      description: 'Llega a más compradores e inquilinos potenciales a través de redes sociales',
      color: '#4ecdc4'
    }
  ];

  const stats = [
    { number: '500+', label: 'House Tours Realizados', icon: 'fas fa-video' },
    { number: '200%', label: 'Más Probabilidad de Venta', icon: 'fas fa-chart-line' },
    { number: '24h', label: 'Entrega del Material', icon: 'fas fa-clock' },
    { number: '98%', label: 'Clientes Satisfechos', icon: 'fas fa-heart' }
  ];

  return (
    <section id="house-tour" className="house-tour">
      <div className="container">
        <div className={`section-header ${isVisible ? 'section-header--visible' : ''}`}>
          <div className="section-header__badge">
            <i className="fas fa-video"></i>
            <span>Servicio Premium</span>
          </div>
          <h2 className="section-title">House Tour Profesional</h2>
          <p className="section-description">
            Transformamos tu propiedad en una experiencia visual inmersiva con tecnología de vanguardia. 
            Nuestros House Tours aumentan en un <strong>200%</strong> la probabilidad de vender o arrendar.
          </p>
        </div>

        <div className="house-tour__content">
          <div className={`house-tour__showcase ${isVisible ? 'house-tour__showcase--visible' : ''}`}>
            <div className="showcase__main">
              <div className="video-player">
                {isVideoPlaying ? (
                  <iframe 
                    src={getVideoEmbedUrl(houseTours[activeVideo].video)}
                    title={houseTours[activeVideo].title}
                    className="main-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="video-placeholder" onClick={handleVideoClick}>
                    <img 
                      src={houseTours[activeVideo].thumbnail} 
                      alt={houseTours[activeVideo].title}
                      className="placeholder-image"
                    />
                    <div className="play-button">
                      <i className="fas fa-play"></i>
                    </div>
                    <div className="video-overlay">
                      <div className="overlay__content">
                        <div className="overlay__badge">
                          <i className="fas fa-play"></i>
                          <span>Reproducir</span>
                        </div>
                        <h4>{houseTours[activeVideo].title}</h4>
                        <p className="overlay__location">
                          <i className="fas fa-map-marker-alt"></i>
                          {houseTours[activeVideo].location}
                        </p>
                        <div className="overlay__stats">
                          <span className="stat">
                            <i className="fas fa-eye"></i>
                            {houseTours[activeVideo].views} vistas
                          </span>
                          <span className="stat">
                            <i className="fas fa-thumbs-up"></i>
                            {houseTours[activeVideo].likes} aprobación
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="showcase__thumbnails">
              <h4>Ejemplos de House Tours</h4>
              <div className="thumbnails__grid">
                {houseTours.map((tour, index) => (
                  <div 
                    key={tour.id} 
                    className={`thumbnail-item ${activeVideo === index ? 'active' : ''}`}
                    onClick={() => {
                      setActiveVideo(index);
                      setIsVideoPlaying(false);
                    }}
                  >
                    <div className="thumbnail__header">
                      <h5>{tour.title}</h5>
                      <p>{tour.location}</p>
                    </div>
                    <div className="thumbnail__content">
                      <span className="thumbnail__type">{tour.type}</span>
                      <span className="thumbnail__price">{tour.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`house-tour__info ${isVisible ? 'house-tour__info--visible' : ''}`}>
            <div className="info__main">
              <h3>¿Por qué elegir nuestro House Tour?</h3>
              <p>
                Nuestro servicio de House Tour incluye fotografía profesional de alta calidad, 
                videos estabilizados con tecnología de vanguardia, y publicidad estratégica en 
                múltiples plataformas digitales.
              </p>
            </div>

            <div className="info__benefits">
              <div className="benefits__grid">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit__icon" style={{ backgroundColor: benefit.color }}>
                      <i className={benefit.icon}></i>
                    </div>
                    <div className="benefit__content">
                      <h5>{benefit.title}</h5>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info__stats">
              <div className="stats__grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-item__icon">
                      <i className={stat.icon}></i>
                    </div>
                    <div className="stat-item__content">
                      <span className="stat-item__number">{stat.number}</span>
                      <span className="stat-item__label">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info__cta">
              <div className="cta__content">
                <h4>¿Listo para transformar tu propiedad?</h4>
                <p>Obtén un House Tour profesional y maximiza las posibilidades de vender o arrendar</p>
                
                <div className="cta__benefits">
                  <div className="benefit-tag">
                    <i className="fas fa-check"></i>
                    <span>Fotografía profesional</span>
                  </div>
                  <div className="benefit-tag">
                    <i className="fas fa-check"></i>
                    <span>Video estabilizado</span>
                  </div>
                  <div className="benefit-tag">
                    <i className="fas fa-check"></i>
                    <span>Publicidad digital</span>
                  </div>
                </div>

                <div className="cta__actions">
                  <a 
                    href="https://wa.me/573223669110?text=Hola,%20me%20interesa%20el%20servicio%20de%20House%20Tour"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn--primary"
                  >
                    <i className="fab fa-whatsapp"></i>
                    Solicitar House Tour
                  </a>
                  <button 
                    className="btn btn--outline"
                    onClick={() => scrollToSection('contact')}
                  >
                    <i className="fas fa-phone"></i>
                    Llamar Ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`house-tour__process ${isVisible ? 'house-tour__process--visible' : ''}`}>
          <h3>Proceso del House Tour</h3>
          <div className="process__steps">
            <div className="step">
              <div className="step__number">1</div>
              <div className="step__content">
                <h4>Agendamiento</h4>
                <p>Programamos la visita a tu propiedad en el horario que más te convenga</p>
              </div>
            </div>
            <div className="step">
              <div className="step__number">2</div>
              <div className="step__content">
                <h4>Fotografía y Video</h4>
                <p>Realizamos la sesión fotográfica y grabación de video con equipos profesionales</p>
              </div>
            </div>
            <div className="step">
              <div className="step__number">3</div>
              <div className="step__content">
                <h4>Edición</h4>
                <p>Procesamos y editamos todo el material para obtener la mejor calidad</p>
              </div>
            </div>
            <div className="step">
              <div className="step__number">4</div>
              <div className="step__content">
                <h4>Publicación</h4>
                <p>Distribuimos tu House Tour en todas nuestras plataformas digitales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HouseTour;
