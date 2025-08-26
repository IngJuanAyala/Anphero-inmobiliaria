import React from 'react';
import './About.scss';

const About = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__header">
          <h2 className="section-title">Quienes Somos</h2>
          <p className="section-subtitle">
            Somos una empresa inmobiliaria comprometida con la excelencia y el servicio al cliente
          </p>
        </div>

        <div className="about__content">
          <div className="about__text">
            <div className="about__intro">
              <h3>¡Nuestro compromiso es contigo y nuestra pasión es el servicio!</h3>
              <p>
                En Anphero Inmobiliaria entendemos que tu hogar es más que una propiedad, 
                es el lugar donde construyes tus sueños y recuerdos. Por eso nos dedicamos 
                a brindarte un servicio personalizado y profesional.
              </p>
            </div>

            <div className="about__features">
              <div className="feature">
                <div className="feature__icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature__content">
                  <h4>Tu inmueble en excelentes manos</h4>
                  <p>
                    Contamos con un equipo de expertos en finca raíz con años de experiencia 
                    en el mercado inmobiliario de Bogotá.
                  </p>
                </div>
              </div>

              <div className="feature">
                <div className="feature__icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="feature__content">
                  <h4>Resultados en tiempo récord</h4>
                  <p>
                    Si has intentado arrendar o vender tu propiedad sin obtener los resultados 
                    que esperas, nosotros nos encargamos gestionando eficientemente tu inmueble.
                  </p>
                </div>
              </div>

              <div className="feature">
                <div className="feature__icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="feature__content">
                  <h4>Confianza y transparencia</h4>
                  <p>
                    Construimos relaciones duraderas basadas en la honestidad, 
                    la transparencia y el compromiso con nuestros clientes.
                  </p>
                </div>
              </div>
            </div>

            <div className="about__cta">
              <button 
                className="btn btn--primary"
                onClick={() => scrollToSection('contact')}
              >
                <i className="fas fa-phone"></i>
                Contáctanos Hoy
              </button>
            </div>
          </div>

          <div className="about__video">
            <div className="about__video-container">
              <iframe
                src="https://www.youtube.com/embed/YRDUBakk0tE"
                title="Video de presentación Anphero Inmobiliaria"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="about__video-frame"
              ></iframe>
              <div className="about__video-overlay">
                <div className="overlay__content">
                  <h4>Video de Presentación</h4>
                  <p>Conoce más sobre Anphero Inmobiliaria</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about__stats">
          <div className="stats__grid">
            <div className="stat-card">
              <div className="stat-card__icon">
                <i className="fas fa-home"></i>
              </div>
              <div className="stat-card__content">
                <h3>500+</h3>
                <p>Propiedades Gestionadas</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-card__content">
                <h3>1000+</h3>
                <p>Clientes Satisfechos</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <i className="fas fa-award"></i>
              </div>
              <div className="stat-card__content">
                <h3>15+</h3>
                <p>Años de Experiencia</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="stat-card__content">
                <h3>4.9</h3>
                <p>Calificación Promedio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
