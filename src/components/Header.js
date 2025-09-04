import React, { useState, useEffect } from 'react';
import './Header.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo" onClick={() => scrollToSection('hero')}>
            <div className="logo">
              <img src="./logo-anphero-official.png" alt="Anphero Inmobiliaria" className="logo__image" />
              <div className="logo__text">
                <h1>ANPHERO</h1>
                <span>Inmobiliaria</span>
              </div>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="header__nav hide-mobile">
            <ul className="nav__list">
              <li><button onClick={() => scrollToSection('about')}>Nosotros</button></li>
              <li><button onClick={() => scrollToSection('services')}>Servicios</button></li>
              <li><button onClick={() => scrollToSection('why-choose-us')}>¿Por qué elegirnos?</button></li>
              <li><button onClick={() => scrollToSection('testimonials')}>Testimonios</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Contacto</button></li>
            </ul>
          </nav>

          {/* Botón de contacto */}
          <div className="header__cta hide-mobile">
            <a href="https://wa.me/573223669110" target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
              <i className="fab fa-whatsapp"></i>
              WhatsApp
            </a>
          </div>

          {/* Botón móvil */}
          <button 
            className={`header__mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Menú móvil */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}>
          <nav className="mobile-menu__nav">
            <ul className="mobile-nav__list">
              <li><button onClick={() => scrollToSection('about')}>Nosotros</button></li>
              <li><button onClick={() => scrollToSection('services')}>Servicios</button></li>
              <li><button onClick={() => scrollToSection('why-choose-us')}>¿Por qué elegirnos?</button></li>
              <li><button onClick={() => scrollToSection('testimonials')}>Testimonios</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Contacto</button></li>
            </ul>
          </nav>
          <div className="mobile-menu__contact">
            <div className="contact-info__item">
              <i className="fas fa-phone"></i>
              <span>+57 322 366 9110</span>
            </div>
          </div>
          <div className="mobile-menu__cta">
            <a href="https://wa.me/573223669110" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <i className="fab fa-whatsapp"></i>
              Consulta Gratuita
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
