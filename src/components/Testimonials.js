import React, { useState, useEffect } from 'react';
import './Testimonials.scss';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Juan Ayala',
      role: 'Cliente Satisfecho',
      content: 'Logré arrendar mi apartamento por medio de la inmobiliaria, quedé muy satisfecho porque ellos hicieron todo el estudio, house tour, publicaron en redes, me asesoraron y arrendaron mi apartamento muy rápido y sin inconvenientes. Lo recomiendo.',
      rating: 5,
      avatar: '/images/testimonial-1.jpg'
    },
    {
      id: 2,
      name: 'María González',
      role: 'Propietaria',
      content: 'Excelente servicio de House Tour. En menos de una semana lograron arrendar mi apartamento. El video quedó espectacular y la publicidad en redes sociales fue muy efectiva. Definitivamente los recomiendo.',
      rating: 5,
      avatar: '/images/testimonial-2.jpg'
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      role: 'Inquilino',
      content: 'Encontré mi apartamento ideal gracias a ANPHERO. El proceso fue muy transparente y profesional. Me asesoraron en todo momento y encontré exactamente lo que buscaba en el presupuesto que tenía.',
      rating: 5,
      avatar: '/images/testimonial-3.jpg'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      role: 'Propietaria',
      content: 'Vendí mi casa en tiempo récord con ANPHERO. Su estrategia de marketing digital y el House Tour profesional hicieron la diferencia. Recibí múltiples ofertas y logré vender por encima del precio esperado.',
      rating: 5,
      avatar: '/images/testimonial-4.jpg'
    }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i 
        key={index} 
        className={`fas fa-star ${index < rating ? 'filled' : ''}`}
      ></i>
    ));
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className={`testimonials__header ${isVisible ? 'testimonials__header--visible' : ''}`}>
          <div className="testimonials__badge">
            <i className="fas fa-heart"></i>
            <span>Clientes Satisfechos</span>
          </div>
          <h2 className="testimonials__title">Lo que dicen nuestros clientes</h2>
          <p className="testimonials__description">
            Descubre por qué cientos de propietarios e inquilinos confían en ANPHERO para sus necesidades inmobiliarias
          </p>
        </div>

        <div className={`testimonials__content ${isVisible ? 'testimonials__content--visible' : ''}`}>
          <div className="testimonials__main">
            <div className="testimonial__card">
              <div className="testimonial__content">
                <div className="testimonial__quote">
                  <i className="fas fa-quote-left"></i>
                  <p>{testimonials[activeTestimonial].content}</p>
                  <i className="fas fa-quote-right"></i>
                </div>
                
                <div className="testimonial__author">
                  <div className="author__info">
                    <h4>{testimonials[activeTestimonial].name}</h4>
                    <span>{testimonials[activeTestimonial].role}</span>
                    <div className="author__rating">
                      {renderStars(testimonials[activeTestimonial].rating)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonials__navigation">
            <div className="testimonials__dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${activeTestimonial === index ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Ir al testimonio ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <div className="testimonials__arrows">
              <button
                className="arrow arrow--prev"
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                aria-label="Testimonio anterior"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className="arrow arrow--next"
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                aria-label="Siguiente testimonio"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className={`testimonials__stats ${isVisible ? 'testimonials__stats--visible' : ''}`}>
          <div className="stats__grid">
            <div className="stat__item">
              <div className="stat__number">98%</div>
              <div className="stat__label">Clientes Satisfechos</div>
            </div>
            <div className="stat__item">
              <div className="stat__number">500+</div>
              <div className="stat__label">Propiedades Arrendadas</div>
            </div>
            <div className="stat__item">
              <div className="stat__number">4.9</div>
              <div className="stat__label">Calificación Promedio</div>
            </div>
            <div className="stat__item">
              <div className="stat__number">24h</div>
              <div className="stat__label">Tiempo Promedio de Respuesta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
