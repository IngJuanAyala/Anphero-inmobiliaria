// Script para agregar propiedades de muestra a Firebase
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config.js';

const sampleProperties = [
  {
    titulo: 'Casa Campestre en Cajicáxxxx',
    descripcion: 'Hermosa casa campestre con piscina y jardín amplio. Ideal para familias que buscan tranquilidad y contacto con la naturaleza.',
    tipo: 'casa',
    operacion: 'venta',
    precio: 680000000,
    ubicacion: 'Cajicá, Cundinamarca',
    area: 250,
    habitaciones: 4,
    banos: 3,
    activo: true,
    destacado: true,
    fotos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    fechaCreacion: serverTimestamp()
  },
  {
    titulo: 'Apartamento Ejecutivo en Zona Rosales',
    descripcion: 'Moderno apartamento en el corazón de la zona rosa. Excelente ubicación cerca a centros comerciales y oficinas.',
    tipo: 'apartamento',
    operacion: 'arriendo',
    precio: 2200000,
    ubicacion: 'Zona Rosa, Bogotá',
    area: 85,
    habitaciones: 2,
    banos: 2,
    activo: true,
    destacado: false,
    fotos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ],
    fechaCreacion: serverTimestamp()
  },
  {
    titulo: 'Casa Familiar en Suba',
    descripcion: 'Casa ideal para familias con excelente ubicación. Cerca a colegios, parques y transporte público.',
    tipo: 'casa',
    operacion: 'venta',
    precio: 450000000,
    ubicacion: 'Suba, Bogotá',
    area: 180,
    habitaciones: 3,
    banos: 2,
    activo: true,
    destacado: false,
    fotos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    fechaCreacion: serverTimestamp()
  },
  {
    titulo: 'Apartamento en Chapinero',
    descripcion: 'Apartamento moderno en una de las mejores zonas de Bogotá. Cerca a universidades y centros culturales.',
    tipo: 'apartamento',
    operacion: 'arriendo',
    precio: 1800000,
    ubicacion: 'Chapinero, Bogotá',
    area: 75,
    habitaciones: 2,
    banos: 1,
    activo: true,
    destacado: true,
    fotos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    fechaCreacion: serverTimestamp()
  },
  {
    titulo: 'Casa en Chía',
    descripcion: 'Casa campestre con vista a la montaña. Perfecta para quienes buscan tranquilidad cerca a Bogotá.',
    tipo: 'casa',
    operacion: 'venta',
    precio: 520000000,
    ubicacion: 'Chía, Cundinamarca',
    area: 200,
    habitaciones: 3,
    banos: 3,
    activo: false,
    destacado: false,
    fotos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ],
    fechaCreacion: serverTimestamp()
  }
];

async function addSampleProperties() {
  try {
    for (const property of sampleProperties) {
      await addDoc(collection(db, 'properties'), property);
    }
    
    console.log('🎉 Todas las propiedades de muestra han sido agregadas exitosamente!');
  } catch (error) {
    console.error('❌ Error agregando propiedades:', error);
  }
}

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  // Solo ejecutar en el navegador
  window.addSampleProperties = addSampleProperties;
}

export default addSampleProperties;
