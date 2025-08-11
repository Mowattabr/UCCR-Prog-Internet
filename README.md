# GALAXIA MAGNA ACADEMY - PROGRAMACION INTERNET UCCR

Plataforma web interactiva desarrollada para la materia **PROGRAMACION INTERNET** del curso **II-51/02/VT/2/2025** en la Universidad Central de Costa Rica (UCCR).

## 🎓 Información del curso

- **Nombre corto:** II-51/02/VT/2/2025  
- **Nombre del curso:** PROGRAMACION INTERNET  
- **Categoría:** SEGUNDO CUATRIMESTRE 2025  
- **Docente:** Fabián Chinchilla Mayorga

## 🚀 Descripción del Proyecto

**Galaxia Magna Academy** es una aplicación web completa con arquitectura moderna cloud-first. Utiliza Vercel como backend y Go Live para desarrollo frontend, eliminando dependencias de servidores locales.

### ✨ Características Principales

- **Sistema de Login**: Autenticación de usuarios integrada con backend Vercel
- **Registro Avanzado**: Formulario completo con campos especializados y auto-generación de códigos
- **Control de Roles**: Sistema de roles con validación por contraseña (Estudiante, Profesor, Administrador)
- **Generación Automática**: Códigos de usuario únicos basados en fecha y rol
- **Efectos Especiales**: Sonido de lightsaber para selección Star Wars
- **Diseño Responsive**: Bootstrap 5.3 con interfaz moderna
- **Validación en Tiempo Real**: Feedback inmediato en formularios

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: PHP desplegado en Vercel
- **Framework CSS**: Bootstrap 5.3
- **Desarrollo**: VS Code con Go Live Extension
- **Hosting**: Vercel para API backend
- **Audio**: HTML5 Audio API

## 📁 Estructura del Proyecto

```
├── index.html              # Página principal de login
├── registro.html           # Formulario de registro de usuarios
├── style.css               # Estilos principales y animaciones
├── script.js               # Lógica frontend y comunicación API
├── backend/                # Backend desplegado en Vercel
│   ├── api/
│   │   └── index.php       # API endpoint principal
│   └── vercel.json         # Configuración de deployment
├── images/                 # Recursos gráficos
│   ├── GAM_transparent.png # Logo principal
│   ├── banner.png          # Banner Star Wars
│   └── avatares/           # Imágenes de género
├── misc/                   # Archivos multimedia
│   └── lightsaber-ignition-6816.mp3
└── Lab07/                  # Laboratorio actual
```

## 🎮 Funcionalidades

### Sistema de Usuario
- **Login**: Autenticación rápida en página principal
- **Registro de usuarios**: Página dedicada accesible solo para administradores
- **Validación**: Email, confirmación de contraseña y selección de género
- **Avatares**: Cambio dinámico según género seleccionado

### Panel de Administración
- **Acceso**: Botón "Iniciar como Administrador" lleva a registro.html
- **Registro completo**: Formulario con todos los campos e intereses
- **Navegación**: Enlaces para volver al inicio o acceder a ayuda

### Interactividad
- **Intereses**: Selección visual con efectos de iluminación
- **Mensaje Star Wars**: Easter egg especial con fade effect
- **Navegación**: Secciones expandibles (Cursos, Estudiantes, Profesores)

### Administración
- **Panel Admin**: Acceso exclusivo con credenciales especiales
- **Gestión de Profesores**: Asignación dinámica de materias

## 🔧 Instalación y Uso

### Para Development Local
1. **Clonar repositorio**
2. **Abrir index.html** en navegador web
3. **Backend ya está en Vercel**: No necesita configuración local

### Para Production
- **Frontend**: Desplegado en Vercel o cualquier hosting estático
- **Backend**: Ya desplegado en Vercel (https://backend-kt0bm09wc-mowattabrs-projects.vercel.app)

### Credenciales de Prueba

**Para el Profesor - Usuario Administrador de Prueba:**
- **Usuario**: `direct_admin`
- **Email**: `directadmin@test.com`
- **Rol**: Administrador
- **Código**: `2025_08_ADM_0003`

**Usuarios del Sistema:**
- **Login Admin**: `admin` / `admin` (página principal)
- **Registro**: Crear nuevos usuarios través del formulario de registro
- **Contraseñas de Rol**:
  - Profesor: `profesor`
  - Administrador: `admin`

**Nota**: El usuario `direct_admin` fue creado automáticamente para pruebas del profesor y está disponible en la base de datos `lista_usuarios`.

## � Migración a Vercel

Este proyecto fue migrado de XAMPP local a Vercel para production. Los archivos PHP originales están en `xampp-backup/` para referencia.

**Cambios realizados:**
- ✅ Backend PHP desplegado en Vercel
- ✅ Frontend actualizado para usar API de Vercel
- ✅ Archivos XAMPP movidos a backup
- ✅ README actualizado con nueva arquitectura

## �📖 Comentarios Educativos

El código incluye extensos comentarios explicativos que amplían las explicaciones de clase, facilitando el aprendizaje y consulta futura de conceptos como:
- Modelo de caja CSS
- Manipulación del DOM
- AJAX y comunicación asíncrona
- Validación de formularios
- Arquitectura serverless con Vercel

---

**Universidad Central de Costa Rica - Segundo Cuatrimestre 2025**  
*"Sapientia per Stellam" - Galaxia Magna Academy*



https://github.com/arg3ni5/II-51-Laboratorios/tree/main/backend
https://backend-kt0bm09wc-mowattabrs-projects.vercel.app