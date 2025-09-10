// Utilidades de logging condicional
// Los logs solo aparecen en desarrollo, no en producción

export const devLog = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

export const devWarn = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(...args);
  }
};

export const devError = (...args) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args);
  }
};

// Para errores críticos que siempre deben mostrarse
export const criticalError = (...args) => {
  console.error(...args);
};

// Para información importante que siempre debe mostrarse
export const info = (...args) => {
  console.info(...args);
};
