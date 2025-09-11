import React, { useState, useEffect } from 'react';
import AppRouter from './AppRouter';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-container">
            <img src={`${process.env.PUBLIC_URL}/logo-anphero-official.png`} alt="Anphero Inmobiliaria" className="loading-logo" />
            <div className="logo-text">
              <h1>ANPHERO</h1>
              <p>Inmobiliaria</p>
            </div>
          </div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return <AppRouter />;
}

export default App;
