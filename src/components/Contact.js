import React from 'react';
import './Contact.scss';

const Contact = () => {
  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Dirección',
      content: 'Centro Comercial Centro Mayor, Bogotá',
      link: 'https://maps.google.com/?q=Centro+Comercial+Centro+Mayor+Bogota'
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp',
      content: '322 366 9110',
      link: 'https://wa.me/573223669110'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'anpheroinmobiliaria@gmail.com',
      link: 'mailto:anpheroinmobiliaria@gmail.com'
    },
    {
      icon: 'fas fa-clock',
      title: 'Horarios',
      content: 'Lun - Vie: 8:00 AM - 6:00 PM\nSáb: 9:00 AM - 2:00 PM'
    }
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      icon: 'fab fa-facebook',
      link: 'https://facebook.com/anpheroinmobiliaria',
      color: '#1877f2'
    },
    {
      name: 'YouTube',
      icon: 'fab fa-youtube',
      link: 'https://www.youtube.com/@anpheroinmobiliaria746',
      color: '#ff0000'
    },
    {
      name: 'TikTok',
      icon: 'fab fa-tiktok',
      link: 'https://tiktok.com/@anpheroinmobiliaria',
      color: '#000000'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__header">
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-description">
            Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__info">
            <div className="info__main">
              <h3>¡Hola! Escríbenos estamos para ayudarte</h3>
              <p>
                En Anphero Inmobiliaria estamos comprometidos con brindarte el mejor servicio. 
                No dudes en contactarnos para cualquier consulta sobre nuestros servicios o propiedades.
              </p>
            </div>

            <div className="info__cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-card__icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="info-card__content">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="info-card__link"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="info-card__text">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="info__social">
              <h4>Síguenos en redes sociales</h4>
              <div className="social__grid">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                  >
                    <i className={social.icon}></i>
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="info__cta">
              <div className="cta__content">
                <h4>¿Listo para vender tu propiedad?</h4>
                <p>Contáctanos ahora y obtén una evaluación gratuita</p>
                
                <div className="cta__actions">
                  <a 
                    href="https://wa.me/573223669110?text=Hola,%20me%20interesa%20una%20evaluación%20gratuita%20de%20mi%20propiedad"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn--primary"
                  >
                    <i className="fab fa-whatsapp"></i>
                    Consulta Gratuita
                  </a>
                  <a 
                    href="tel:+573223669110"
                    className="btn btn--outline"
                  >
                    <i className="fas fa-phone"></i>
                    Llamar Ahora
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

export default Contact;
