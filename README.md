# 🏠 Anphero Inmobiliaria - Sitio Web Moderno

Un sitio web moderno y profesional para Anphero Inmobiliaria, construido con React.js, SASS y las mejores prácticas de desarrollo web.

## ✨ Características

- **Diseño Moderno**: Interfaz elegante y profesional con los colores corporativos de Anphero
- **Totalmente Responsivo**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Navegación Suave**: Scroll suave entre secciones
- **Botón de WhatsApp**: Integración directa con WhatsApp para contacto inmediato
- **House Tour**: Sección especializada para mostrar el servicio de House Tour
- **Formulario de Contacto**: Formulario funcional con validaciones
- **SEO Optimizado**: Meta tags y estructura semántica para mejor posicionamiento
- **Performance**: Código optimizado y carga rápida

## 🚀 Tecnologías Utilizadas

- **React.js 18** - Framework principal
- **SASS/SCSS** - Preprocesador de CSS
- **CSS Grid & Flexbox** - Layouts modernos y responsivos
- **JavaScript ES6+** - Funcionalidades interactivas
- **Font Awesome** - Iconografía profesional
- **Google Fonts** - Tipografías elegantes (Inter + Playfair Display)

## 📱 Secciones del Sitio

1. **Header** - Navegación principal con logo y menú móvil
2. **Hero** - Sección principal con video de fondo y llamadas a la acción
3. **Quienes Somos** - Información sobre la empresa y equipo
4. **Servicios** - Catálogo de servicios inmobiliarios
5. **Propiedades** - Galería de propiedades con filtros
6. **House Tour** - Información sobre el servicio de House Tour
7. **Contacto** - Formulario de contacto e información de la empresa
8. **Footer** - Enlaces útiles y redes sociales
9. **Botón WhatsApp** - Botón flotante para contacto inmediato

## 🎨 Paleta de Colores

- **Azul Principal**: `#1e3a8a` - Color corporativo principal
- **Azul Secundario**: `#3b82f6` - Acentos y elementos secundarios
- **Naranja Acento**: `#f59e0b` - Llamadas a la acción y destacados
- **Texto Oscuro**: `#1f2937` - Texto principal
- **Texto Claro**: `#6b7280` - Texto secundario
- **Blanco**: `#ffffff` - Fondos y texto sobre colores oscuros

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd finca-raiz-anphero
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Comandos Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de webpack (irreversible)

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.js       # Navegación principal
│   ├── Hero.js         # Sección hero
│   ├── About.js        # Sección quienes somos
│   ├── Services.js     # Servicios ofrecidos
│   ├── Properties.js   # Galería de propiedades
│   ├── HouseTour.js    # Información House Tour
│   ├── Contact.js      # Formulario de contacto
│   ├── Footer.js       # Pie de página
│   └── WhatsAppButton.js # Botón flotante WhatsApp
├── styles/             # Estilos SASS
│   ├── index.scss      # Estilos principales y variables
│   └── components/     # Estilos de componentes
├── App.js              # Componente principal
└── index.js            # Punto de entrada
```

## 🎯 Funcionalidades Principales

### Navegación
- Header fijo con navegación suave
- Menú móvil responsive
- Logo clickeable que lleva al inicio

### Hero Section
- Video de fondo (con fallback para navegadores sin soporte)
- Llamadas a la acción prominentes
- Estadísticas destacadas
- Indicador de scroll

### Propiedades
- Filtros por tipo (Arriendo/Venta)
- Tarjetas de propiedades con información detallada
- Botones de contacto directo por WhatsApp
- Diseño responsive con grid

### House Tour
- Reproductor de video integrado
- Galería de thumbnails
- Información sobre el servicio
- Proceso paso a paso

### Contacto
- Formulario funcional con validaciones
- Información de contacto completa
- Enlaces a redes sociales
- Botón de WhatsApp alternativo

### WhatsApp Integration
- Botón flotante con animación
- Tooltip informativo al hacer hover
- Mensaje predefinido personalizable
- Número de WhatsApp: 322 366 9110

## 📱 Responsive Design

El sitio está completamente optimizado para todos los dispositivos:

- **Desktop**: Layout completo con todas las funcionalidades
- **Tablet**: Adaptación de grids y navegación
- **Móvil**: Navegación móvil, botones táctiles, optimización de imágenes

## 🔧 Personalización

### Cambiar Colores
Los colores se pueden modificar fácilmente en `src/styles/index.scss`:

```scss
$primary-color: #1e3a8a;      // Azul principal
$secondary-color: #3b82f6;    // Azul secundario
$accent-color: #f59e0b;       // Naranja acento
```

### Modificar Contenido
- **Propiedades**: Editar el array en `src/components/Properties.js`
- **Servicios**: Modificar en `src/components/Services.js`
- **House Tours**: Actualizar en `src/components/HouseTour.js`
- **Información de Contacto**: Cambiar en `src/components/Contact.js`

### Agregar Imágenes
1. Colocar imágenes en la carpeta `public/images/`
2. Referenciar en los componentes como `/images/nombre-imagen.jpg`

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Servidor de Producción
```bash
npm install -g serve
serve -s build
```

### Despliegue en Netlify/Vercel
1. Conectar el repositorio
2. Configurar build command: `npm run build`
3. Configurar publish directory: `build`

## 📞 Información de Contacto

- **WhatsApp**: 322 366 9110
- **Email**: anpheroinmobiliaria@gmail.com
- **Dirección**: Centro Comercial Centro Mayor, Bogotá
- **Horarios**: Lun - Vie: 8:00 AM - 6:00 PM, Sáb: 9:00 AM - 2:00 PM

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Anphero Inmobiliaria** por confiar en nosotros para su sitio web
- **React.js** por proporcionar un framework excepcional
- **Font Awesome** por los iconos profesionales
- **Google Fonts** por las tipografías elegantes

---

**Desarrollado con ❤️ para Anphero Inmobiliaria**

*Tu inmueble se encuentra en excelentes manos, somos expertos.*
