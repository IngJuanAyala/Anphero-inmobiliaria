# Utilidades de Logging

Este directorio contiene utilidades para el logging condicional en la aplicación.

## Sistema de Logging

### `logger.js`

Proporciona funciones de logging que solo aparecen en desarrollo, no en producción.

#### Funciones disponibles:

- **`devLog(...args)`** - Logs normales solo en desarrollo
- **`devWarn(...args)`** - Warnings solo en desarrollo  
- **`devError(...args)`** - Errores solo en desarrollo
- **`criticalError(...args)`** - Errores críticos que siempre se muestran
- **`info(...args)`** - Información importante que siempre se muestra

#### Uso:

```javascript
import { devLog, devWarn, devError, criticalError, info } from '../utils/logger';

// Solo aparece en desarrollo
devLog('Cargando propiedades...');
devWarn('Advertencia: datos no encontrados');
devError('Error en la conexión');

// Siempre aparece
criticalError('Error crítico del sistema');
info('Aplicación iniciada correctamente');
```

#### Comportamiento:

- **Desarrollo** (`NODE_ENV=development`): Todos los logs aparecen
- **Producción** (`NODE_ENV=production`): Solo `criticalError` e `info` aparecen

#### Ventajas:

1. **Debugging fácil** - Logs detallados durante desarrollo
2. **Producción limpia** - Sin logs innecesarios en producción
3. **Performance** - Mejor rendimiento en producción
4. **Seguridad** - No expone información sensible en producción
