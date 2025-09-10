# ANPHERO Inmobiliaria

Sitio web para inmobiliaria con gestión de propiedades, imágenes y administración.

## 🚀 Características

- **Gestión de Propiedades**: Crear, editar y administrar propiedades
- **Galería de Imágenes**: Subida de imágenes con drag & drop
- **Modal de Zoom**: Visualización de imágenes en pantalla completa
- **Responsive Design**: Optimizado para móvil, tablet y desktop
- **Firebase Integration**: Base de datos y almacenamiento en la nube
- **WhatsApp Integration**: Contacto directo desde las propiedades

## 🛠️ Tecnologías

- **Frontend**: React.js, SCSS
- **Backend**: Firebase (Firestore, Storage)
- **Routing**: React Router DOM
- **Icons**: Font Awesome

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd Amphero-inmobiliaria
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   - Crear un archivo `.env.local` en la raíz del proyecto
   - Agregar las variables de entorno de Firebase:
   ```env
   REACT_APP_FIREBASE_API_KEY=tu_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   REACT_APP_FIREBASE_APP_ID=tu_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=tu_measurement_id
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm start
   ```

## 🔧 Configuración de Firebase

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── FeaturedProperties.js    # Propiedades destacadas
│   ├── PropertyModal.js         # Modal de propiedades
│   ├── ImageUploader.js         # Subida de imágenes
│   └── ...
├── firebase/            # Configuración de Firebase
│   ├── config.js        # Configuración principal
│   ├── propertiesService.js  # Servicios de propiedades
│   └── ...
├── styles/              # Estilos globales
└── App.js              # Componente principal
```

## 🚀 Scripts Disponibles

- `npm start` - Ejecutar en modo desarrollo
- `npm run build` - Crear build de producción
- `npm test` - Ejecutar tests

## 📱 Funcionalidades

### Gestión de Propiedades
- Crear nuevas propiedades
- Editar propiedades existentes
- Subir múltiples imágenes
- Marcar como destacadas

### Galería de Imágenes
- Drag & drop para subir imágenes
- Compresión automática de imágenes
- Visualización en modal con zoom
- Navegación entre imágenes

### Administración
- Panel de administración en `/admin`
- Gestión completa de propiedades
- Carga de datos de muestra

## 🔒 Seguridad

- Las credenciales de Firebase están en variables de entorno
- Las reglas de Firestore y Storage están configuradas
- El archivo `.env.local` está en `.gitignore`

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Soporte

Para soporte técnico, contactar al equipo de desarrollo.