import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProperties, deleteProperty } from '../firebase/propertiesService';
import PropertyModal from './PropertyModal';
import './PropertyAdmin.scss';

const PropertyAdmin = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Cargar propiedades al montar el componente
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error cargando propiedades:', error);
      alert('Error cargando propiedades');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingProperty(null);
    setShowModal(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProperty(null);
  };

  const handleModalSuccess = () => {
    loadProperties();
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      try {
        await deleteProperty(propertyId);
        alert('Propiedad eliminada correctamente');
        loadProperties();
      } catch (error) {
        console.error('Error eliminando propiedad:', error);
        alert('Error eliminando propiedad');
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="property-admin">
      <div className="admin-header">
        <div className="admin-header__left">
          <Link to="/" className="btn btn--secondary">
            <i className="fas fa-arrow-left"></i>
            Volver al sitio
          </Link>
          <h2>Gestión de Propiedades</h2>
        </div>
        <button 
          className="btn btn--primary"
          onClick={handleCreateNew}
        >
          <i className="fas fa-plus"></i>
          Agregar Propiedad
        </button>
      </div>

      <PropertyModal
        isOpen={showModal}
        onClose={handleModalClose}
        property={editingProperty}
        onSuccess={handleModalSuccess}
      />

      <div className="properties-list">
        <div className="properties-header">
          <h3>Todas las Propiedades ({properties.length})</h3>
          <div className="properties-stats">
            <span className="stat-active">
              <i className="fas fa-check-circle"></i>
              Activas: {properties.filter(p => p.activo !== false).length}
            </span>
            <span className="stat-inactive">
              <i className="fas fa-times-circle"></i>
              Inactivas: {properties.filter(p => p.activo === false).length}
            </span>
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Cargando propiedades...</div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property.id} className={`property-card ${property.activo === false ? 'property-card--inactive' : ''}`}>
                <div className="property-image">
                  {property.fotos && property.fotos.length > 0 ? (
                    <img src={property.fotos[0]} alt={property.titulo} />
                  ) : (
                    <div className="no-image">
                      <i className="fas fa-image"></i>
                      <span>Sin imagen</span>
                    </div>
                  )}
                  {property.activo === false && (
                    <div className="inactive-overlay">
                      <i className="fas fa-ban"></i>
                      <span>INACTIVA</span>
                    </div>
                  )}
                </div>
                
                <div className="property-info">
                  <h4>{property.titulo}</h4>
                  <p className="property-location">
                    <i className="fas fa-map-marker-alt"></i>
                    {property.ubicacion}
                  </p>
                  <p className="property-price">
                    {formatPrice(property.precio)}
                  </p>
                  <div className="property-badges">
                    {property.destacado && (
                      <span className="badge badge--destacada">
                        <i className="fas fa-star"></i>
                        DESTACADA
                      </span>
                    )}
                    <span className={`badge badge--${property.tipo}`}>
                      {property.tipo}
                    </span>
                    <span className={`badge badge--${property.operacion}`}>
                      {property.operacion}
                    </span>
                  </div>
                </div>
                
                <div className="property-actions">
                  <button 
                    className="btn btn--small btn--primary"
                    onClick={() => handleEdit(property)}
                  >
                    <i className="fas fa-edit"></i>
                    Editar
                  </button>
                  <button 
                    className="btn btn--small btn--danger"
                    onClick={() => handleDelete(property.id)}
                  >
                    <i className="fas fa-trash"></i>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyAdmin;
