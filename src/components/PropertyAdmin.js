import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getProperties, 
  addProperty, 
  updateProperty, 
  deleteProperty,
  uploadMultipleImages 
} from '../firebase/propertiesService';
import './PropertyAdmin.scss';

const PropertyAdmin = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    tipo: 'casa',
    operacion: 'arriendo',
    precio: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fotos: [],
    video: '',
    caracteristicas: [],
    requisitos: []
  });

  // Cargar propiedades al montar el componente
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error cargando propiedades:', error);
      alert('Error cargando propiedades');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      fotos: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let propertyData = { ...formData };

      // Si hay fotos, subirlas primero
      if (formData.fotos.length > 0) {
        const propertyId = editingProperty?.id || `temp_${Date.now()}`;
        const imageUrls = await uploadMultipleImages(formData.fotos, propertyId);
        propertyData.fotos = imageUrls;
      }

      if (editingProperty) {
        // Actualizar propiedad existente
        await updateProperty(editingProperty.id, propertyData);
        alert('Propiedad actualizada correctamente');
      } else {
        // Agregar nueva propiedad
        await addProperty(propertyData);
        alert('Propiedad agregada correctamente');
      }

      // Limpiar formulario y recargar datos
      setFormData({
        tipo: 'casa',
        operacion: 'arriendo',
        precio: '',
        titulo: '',
        descripcion: '',
        ubicacion: '',
        fotos: [],
        video: '',
        caracteristicas: [],
        requisitos: []
      });
      setShowForm(false);
      setEditingProperty(null);
      loadProperties();

    } catch (error) {
      console.error('Error guardando propiedad:', error);
      alert('Error guardando propiedad');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      tipo: property.tipo,
      operacion: property.operacion,
      precio: property.precio,
      titulo: property.titulo,
      descripcion: property.descripcion,
      ubicacion: property.ubicacion,
      fotos: property.fotos || [],
      video: property.video || '',
      caracteristicas: property.caracteristicas || [],
      requisitos: property.requisitos || []
    });
    setShowForm(true);
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
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus"></i>
          Agregar Propiedad
        </button>
      </div>

      {showForm && (
        <div className="admin-form">
          <h3>{editingProperty ? 'Editar Propiedad' : 'Nueva Propiedad'}</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Tipo de Propiedad</label>
                <select 
                  name="tipo" 
                  value={formData.tipo} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                </select>
              </div>

              <div className="form-group">
                <label>Operación</label>
                <select 
                  name="operacion" 
                  value={formData.operacion} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="arriendo">Arriendo</option>
                  <option value="venta">Venta</option>
                </select>
              </div>

              <div className="form-group">
                <label>Precio (COP)</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  required
                  placeholder="1200000"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                required
                placeholder="Casa en Ciudad Tintal"
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Descripción detallada de la propiedad..."
              />
            </div>

            <div className="form-group">
              <label>Ubicación</label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
                placeholder="Ciudad Tintal, Bogotá"
              />
            </div>

            <div className="form-group">
              <label>URL del Video (YouTube)</label>
              <input
                type="url"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="form-group">
              <label>Fotos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <small>Selecciona múltiples fotos (máximo 10)</small>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn--primary"
                disabled={loading}
              >
                {loading ? 'Guardando...' : (editingProperty ? 'Actualizar' : 'Agregar')}
              </button>
              <button 
                type="button" 
                className="btn btn--secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingProperty(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="properties-list">
        <h3>Propiedades Activas ({properties.length})</h3>
        
        {loading ? (
          <div className="loading">Cargando propiedades...</div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-image">
                  {property.fotos && property.fotos.length > 0 ? (
                    <img src={property.fotos[0]} alt={property.titulo} />
                  ) : (
                    <div className="no-image">
                      <i className="fas fa-image"></i>
                      <span>Sin imagen</span>
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
