import React from 'react';
import './Footer.scss';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <div className="footer__brand">
              <div className="footer__logo">
                <img src="/Anphero-inmobiliaria/logo-anphero-official.png" alt="Anphero Inmobiliaria" className="footer-logo__image" />
                <div className="footer-logo__text">
                  <h3>ANPHERO</h3>
                  <span>Inmobiliaria</span>
                </div>
              </div>
              <p>
                Más que una empresa, somos una gran familia comprometida con brindarte 
                el mejor servicio inmobiliario en Bogotá.
              </p>
              <div className="footer__social">
                <a 
                  href="https://facebook.com/anpheroinmobiliaria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a 
                  href="https://www.youtube.com/@anpheroinmobiliaria746" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a 
                  href="https://tiktok.com/@anpheroinmobiliaria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>

            <div className="footer__links">
              <div className="footer__section">
                <h4>Servicios</h4>
                <ul>
                  <li><button onClick={() => scrollToSection('services')}>Arriendo de Propiedades</button></li>
                  <li><button onClick={() => scrollToSection('services')}>Venta de Inmuebles</button></li>
                  <li><button onClick={() => scrollToSection('services')}>Asesoría Inmobiliaria</button></li>
                  <li><button onClick={() => scrollToSection('house-tour')}>House Tour</button></li>
                </ul>
              </div>

              <div className="footer__section">
                <h4>Empresa</h4>
                <ul>
                  <li><button onClick={() => scrollToSection('about')}>Quienes Somos</button></li>
                  <li><button onClick={() => scrollToSection('about')}>Nuestro Equipo</button></li>
                  <li><button onClick={() => scrollToSection('testimonials')}>Testimonios</button></li>
                  <li><button onClick={() => scrollToSection('contact')}>Contacto</button></li>
                </ul>
              </div>

              <div className="footer__section">
                <h4>Propiedades</h4>
                <ul>
                  <li>
                    <a 
                      href="https://wa.me/573223669110?text=Hola,%20me%20interesa%20ver%20todas%20las%20propiedades%20disponibles"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Ver Todas
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://wa.me/573223669110?text=Hola,%20me%20interesa%20propiedades%20en%20arriendo"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Arriendo
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://wa.me/573223669110?text=Hola,%20me%20interesa%20propiedades%20en%20venta"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Venta
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://wa.me/573223669110?text=Hola,%20me%20interesa%20ver%20las%20propiedades%20destacadas"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Destacadas
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer__contact">
              <h4>Información de Contacto</h4>
              <div className="contact__item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Dirección:</strong>
                  <p>Centro Comercial Centro Mayor, Bogotá</p>
                </div>
              </div>
              <div className="contact__item">
                <i className="fab fa-whatsapp"></i>
                <div>
                  <strong>WhatsApp:</strong>
                  <p>322 366 9110</p>
                </div>
              </div>
              <div className="contact__item">
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Email:</strong>
                  <p>anpheroinmobiliaria@gmail.com</p>
                </div>
              </div>
              <div className="contact__item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Horarios:</strong>
                  <p>Lun - Vie: 8:00 AM - 6:00 PM</p>
                  <p>Sáb: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__legal">
              <p>&copy; {currentYear} Anphero Inmobiliaria. Todos los derechos reservados.</p>
              <div className="legal__links">
                <a href="#privacy">Política de Privacidad</a>
                <span>•</span>
                <a href="#terms">Términos y Condiciones</a>
                <span>•</span>
                <a href="#cookies">Política de Cookies</a>
              </div>
            </div>
            <div className="footer__cta">
              <a 
                href="https://wa.me/573223669110?text=Hola,%20me%20gustaría%20recibir%20más%20información"
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn--primary"
              >
                <i className="fab fa-whatsapp"></i>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
