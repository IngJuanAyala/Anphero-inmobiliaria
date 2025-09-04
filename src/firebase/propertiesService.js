import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './config';

// Obtener todas las propiedades activas
export const getProperties = async () => {
  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(
      propertiesRef, 
      where('activo', '==', true),
      orderBy('fechaCreacion', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const properties = [];
    
    querySnapshot.forEach((doc) => {
      properties.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return properties;
  } catch (error) {
    console.error('Error obteniendo propiedades:', error);
    throw error;
  }
};

// Obtener propiedades por tipo (casa/apartamento)
export const getPropertiesByType = async (tipo) => {
  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(
      propertiesRef, 
      where('tipo', '==', tipo),
      where('activo', '==', true),
      orderBy('fechaCreacion', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const properties = [];
    
    querySnapshot.forEach((doc) => {
      properties.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return properties;
  } catch (error) {
    console.error('Error obteniendo propiedades por tipo:', error);
    throw error;
  }
};

// Obtener propiedades por operación (arriendo/venta)
export const getPropertiesByOperation = async (operacion) => {
  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(
      propertiesRef, 
      where('operacion', '==', operacion),
      where('activo', '==', true),
      orderBy('fechaCreacion', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const properties = [];
    
    querySnapshot.forEach((doc) => {
      properties.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return properties;
  } catch (error) {
    console.error('Error obteniendo propiedades por operación:', error);
    throw error;
  }
};

// Agregar nueva propiedad
export const addProperty = async (propertyData) => {
  try {
    const propertiesRef = collection(db, 'properties');
    const docRef = await addDoc(propertiesRef, {
      ...propertyData,
      fechaCreacion: serverTimestamp(),
      activo: true
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error agregando propiedad:', error);
    throw error;
  }
};

// Actualizar propiedad
export const updateProperty = async (propertyId, propertyData) => {
  try {
    const propertyRef = doc(db, 'properties', propertyId);
    await updateDoc(propertyRef, {
      ...propertyData,
      fechaActualizacion: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error('Error actualizando propiedad:', error);
    throw error;
  }
};

// Eliminar propiedad (marcar como inactiva)
export const deleteProperty = async (propertyId) => {
  try {
    const propertyRef = doc(db, 'properties', propertyId);
    await updateDoc(propertyRef, {
      activo: false,
      fechaEliminacion: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error('Error eliminando propiedad:', error);
    throw error;
  }
};

// Subir imagen a Storage
export const uploadImage = async (file, propertyId) => {
  try {
    const imageRef = ref(storage, `properties/${propertyId}/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    throw error;
  }
};

// Eliminar imagen de Storage
export const deleteImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error('Error eliminando imagen:', error);
    throw error;
  }
};

// Subir múltiples imágenes
export const uploadMultipleImages = async (files, propertyId) => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, propertyId));
    const downloadURLs = await Promise.all(uploadPromises);
    
    return downloadURLs;
  } catch (error) {
    console.error('Error subiendo múltiples imágenes:', error);
    throw error;
  }
};
