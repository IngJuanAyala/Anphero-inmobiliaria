# 🚨 ALERTA DE SEGURIDAD - ACCIÓN INMEDIATA REQUERIDA

## ⚠️ Clave de API Expuesta

Google Cloud Platform ha detectado que tu clave de API está expuesta públicamente en GitHub:

**Clave comprometida**: `AIzaSyB0W7QUYZTasoEubQ7VofxNqN3NPMjNbxo`  
**Proyecto**: `anphero-inmobiliaria-database`  
**URL expuesta**: https://github.com/IngJuanAyala/Anphero-inmobiliaria/blob/7b54bbab4f7b245447dba27311a7979e0cd0fac6/docs/static/js/main.f2339c97.js.map

## 🔥 ACCIONES INMEDIATAS (HACER AHORA)

### 1. Regenerar Clave de API (URGENTE)

1. **Ir a [Google Cloud Console](https://console.cloud.google.com/)**
2. **Navegar a "APIs y servicios" > "Credenciales"**
3. **Buscar la clave**: `AIzaSyB0W7QUYZTasoEubQ7VofxNqN3NPMjNbxo`
4. **Hacer clic en "Regenerar clave"**
5. **Copiar la nueva clave generada**

### 2. Crear Archivo de Variables de Entorno

1. **Crear archivo `.env.local`** en la raíz del proyecto:
   ```bash
   cp env.example .env.local
   ```

2. **Editar `.env.local`** y agregar la nueva clave:
   ```env
   REACT_APP_FIREBASE_API_KEY=nueva_clave_aqui
   REACT_APP_FIREBASE_AUTH_DOMAIN=anphero-inmobiliaria-database.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=anphero-inmobiliaria-database
   REACT_APP_FIREBASE_STORAGE_BUCKET=anphero-inmobiliaria-database.firebasestorage.app
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=904388407957
   REACT_APP_FIREBASE_APP_ID=1:904388407957:web:e51731540b77c8a72d219c
   REACT_APP_FIREBASE_MEASUREMENT_ID=G-W844GYSVT5
   ```

### 3. Limpiar Historial de Git

**Opción A: Recrear repositorio (Recomendado)**
```bash
# Hacer backup
cp -r . ../anphero-backup

# Eliminar historial
rm -rf .git
git init
git add .
git commit -m "Initial commit - Clean history"
git remote add origin https://github.com/IngJuanAyala/Anphero-inmobiliaria.git
git push -f origin main
```

**Opción B: Ver archivo `cleanup-git-history.md` para más opciones**

## ✅ Verificaciones de Seguridad

- [x] **Código limpio**: No hay claves hardcodeadas en `src/`
- [x] **`.gitignore` configurado**: `.env.local` está protegido
- [x] **Documentación actualizada**: README con instrucciones de seguridad
- [x] **Archivo de ejemplo**: `env.example` para otros desarrolladores

## 🔍 Verificación Final

```bash
# Verificar que no hay claves en el código
grep -r "AIzaSyB0W7QUYZTasoEubQ7VofxNqN3NPMjNbxo" src/
# Debe devolver: "No matches found" ✅

# Verificar que .env.local existe
ls -la .env.local
# Debe mostrar el archivo ✅
```

## 📞 Próximos Pasos

1. **Regenerar clave** (URGENTE)
2. **Crear `.env.local`** con nueva clave
3. **Limpiar historial de Git**
4. **Probar la aplicación** con `npm start`
5. **Eliminar este archivo** después de completar las acciones

## 🛡️ Prevención Futura

- **NUNCA** subir archivos `.env` a GitHub
- **SIEMPRE** usar variables de entorno
- **REVISAR** commits antes de hacer push
- **USAR** herramientas como `git-secrets` para detectar claves

---

**⏰ TIEMPO ESTIMADO**: 15-30 minutos  
**🔥 PRIORIDAD**: CRÍTICA - Hacer inmediatamente
