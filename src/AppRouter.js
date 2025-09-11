import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Properties from './components/Properties';
import PropertiesList from './components/PropertiesList';
import FeaturedProperties from './components/FeaturedProperties';
import HouseTour from './components/HouseTour';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminRoute from './components/AdminRoute';
import './components/NotFound.scss';

// Componente para la página principal
const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Properties />
      <FeaturedProperties />
      <PropertiesList />
      <HouseTour />
      <Testimonials />
      <Contact />
    </>
  );
};


const AppContent = () => {
  const location = useLocation();

  // Manejar la redirección de GitHub Pages
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/?/')) {
      const newPath = path.split('/?/')[1];
      if (newPath) {
        window.history.replaceState(null, '', newPath);
        window.location.reload();
      }
    }
  }, []);

  const shouldShowHeader = !location.pathname.startsWith('/admin');
  
  return (
    <div className="App">
      {shouldShowHeader && <Header />}
      <main>
        <Routes>
          {/* Ruta principal - Página de inicio */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta de administración */}
          <Route path="/admin" element={<AdminRoute />} />
          
          {/* Ruta 404 - Página no encontrada */}
          <Route path="*" element={
            <div className="not-found">
              <div className="container">
                <h1>404 - Página no encontrada</h1>
                <p>La página que buscas no existe.</p>
                <a href="/" className="btn btn--primary">
                  Volver al inicio
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      {shouldShowHeader && <Footer />}
      {shouldShowHeader && <WhatsAppButton />}
    </div>
  );
};

// Componente principal con rutas
const AppRouter = () => {
  return (
    <Router basename="/Anphero-inmobiliaria">
      <AppContent />
    </Router>
  );
};

export default AppRouter;
