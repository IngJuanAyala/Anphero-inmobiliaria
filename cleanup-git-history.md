# 🧹 Limpieza del Historial de Git

## ⚠️ IMPORTANTE: Claves de API Expuestas

Si has subido claves de API a GitHub, necesitas limpiar el historial de Git para eliminar las claves comprometidas.

## 🔧 Pasos para Limpiar el Historial

### Opción 1: Recrear el Repositorio (Recomendado)

1. **Hacer backup del código actual**:
   ```bash
   cp -r . ../anphero-inmobiliaria-backup
   ```

2. **Eliminar el repositorio Git actual**:
   ```bash
   rm -rf .git
   ```

3. **Inicializar un nuevo repositorio**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Clean history"
   ```

4. **Agregar el remote**:
   ```bash
   git remote add origin https://github.com/IngJuanAyala/Anphero-inmobiliaria.git
   ```

5. **Forzar push (CUIDADO: esto elimina todo el historial)**:
   ```bash
   git push -f origin main
   ```

### Opción 2: Usar BFG Repo-Cleaner (Avanzado)

1. **Instalar BFG**:
   ```bash
   # Windows (con Chocolatey)
   choco install bfg

   # O descargar desde: https://rtyley.github.io/bfg-repo-cleaner/
   ```

2. **Limpiar claves específicas**:
   ```bash
   bfg --replace-text replacements.txt
   ```

3. **Crear archivo replacements.txt**:
   ```
   AIzaSyB0W7QUYZTasoEubQ7VofxNqN3NPMjNbxo==>***REMOVED***
   ```

## 🚨 Acciones Inmediatas Requeridas

### 1. Regenerar Claves en Google Cloud

1. **Ir a [Google Cloud Console](https://console.cloud.google.com/)**
2. **Navegar a "APIs y servicios" > "Credenciales"**
3. **Encontrar la clave: `AIzaSyB0W7QUYZTasoEubQ7VofxNqN3NPMjNbxo`**
4. **Hacer clic en "Regenerar clave"**
5. **Copiar la nueva clave**

### 2. Actualizar Variables de Entorno

1. **Crear archivo `.env.local`**:
   ```bash
   cp env.example .env.local
   ```

2. **Agregar la nueva clave**:
   ```env
   REACT_APP_FIREBASE_API_KEY=nueva_clave_aqui
   ```

### 3. Verificar Seguridad

- ✅ **`.env.local` está en `.gitignore`**
- ✅ **No hay claves hardcodeadas en el código**
- ✅ **README actualizado con instrucciones de seguridad**

## 📋 Checklist de Seguridad

- [ ] Regenerar clave de API en Google Cloud
- [ ] Crear archivo `.env.local` con nueva clave
- [ ] Limpiar historial de Git
- [ ] Verificar que no hay claves en el código
- [ ] Actualizar documentación
- [ ] Notificar a otros desarrolladores del equipo

## 🔍 Verificación Final

```bash
# Buscar claves en el código
grep -r "AIzaSyB0W7QUYZTasoEubQ7VofxNqN3NPMjNbxo" src/
grep -r "anphero-inmobiliaria-database" src/

# Si no encuentra nada, está limpio ✅
```

## 📞 Soporte

Si necesitas ayuda con la limpieza del historial, contacta al administrador del repositorio.
