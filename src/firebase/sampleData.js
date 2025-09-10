// Datos de ejemplo para poblar Firestore
// Ejecuta este código en la consola del navegador para agregar datos de prueba

export const sampleProperties = [
  {
    tipo: 'casa',
    operacion: 'arriendo',
    precio: 1200000,
    titulo: 'Casa en Ciudad Tintal',
    descripcion: 'Hermosa casa de 4 niveles ubicada en Ciudad Tintal. Cuenta con 3 habitaciones, 2 baños, sala comedor, cocina integral, zona de ropa y altillo. Ideal para familias.',
    ubicacion: 'Ciudad Tintal, Bogotá',
    fotos: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    video: 'https://youtube.com/watch?v=F6Zlhxcg5HY',
    caracteristicas: [
      '4 Niveles',
      '3 Habitaciones',
      '2 Baños',
      'Sala comedor',
      'Cocina integral',
      'Zona de ropa',
      'Altillo',
      'Parqueadero comunal'
    ],
    requisitos: [
      'Certificación laboral',
      'Desprendible de nómina últimos 3 meses',
      'Extractos bancarios últimos 3 meses',
      'Codeudor solvente'
    ],
    activo: true
  },
  {
    tipo: 'apartamento',
    operacion: 'venta',
    precio: 250000000,
    titulo: 'Apartamento en Chapinero',
    descripcion: 'Moderno apartamento en el corazón de Chapinero. 2 habitaciones, 2 baños, balcón con vista a la ciudad. Cerca a universidades y centros comerciales.',
    ubicacion: 'Chapinero, Bogotá',
    fotos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    video: 'https://youtube.com/watch?v=example2',
    caracteristicas: [
      '2 Habitaciones',
      '2 Baños',
      'Sala comedor',
      'Cocina integral',
      'Balcón',
      'Parqueadero',
      'Portería 24h',
      'Zona de lavandería'
    ],
    requisitos: [
      'Documentos de identidad',
      'Certificación de ingresos',
      'Historia crediticia',
      'Enganche del 30%'
    ],
    activo: true
  },
  {
    tipo: 'casa',
    operacion: 'venta',
    precio: 180000000,
    titulo: 'Casa en Suba',
    descripcion: 'Casa campestre en Suba con amplios espacios verdes. 3 habitaciones, 2 baños, jardín, garaje para 2 carros. Perfecta para familias que buscan tranquilidad.',
    ubicacion: 'Suba, Bogotá',
    fotos: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    video: 'https://youtube.com/watch?v=example3',
    caracteristicas: [
      '3 Habitaciones',
      '2 Baños',
      'Sala comedor',
      'Cocina integral',
      'Jardín',
      'Garaje 2 carros',
      'Zona de ropa',
      'Patio trasero'
    ],
    requisitos: [
      'Documentos de identidad',
      'Certificación de ingresos',
      'Historia crediticia',
      'Enganche del 20%'
    ],
    activo: true
  }
];

// Función para agregar datos de ejemplo a Firestore
export const addSampleData = async () => {
  const { addDoc, collection } = await import('firebase/firestore');
  const { db } = await import('./config');
  
  try {
    const propertiesRef = collection(db, 'properties');
    
    for (const property of sampleProperties) {
      await addDoc(propertiesRef, {
        ...property,
        fechaCreacion: new Date()
      });
    }
    
    console.log('✅ Datos de ejemplo agregados correctamente');
  } catch (error) {
    console.error('Error agregando datos de ejemplo:', error);
  }
};
