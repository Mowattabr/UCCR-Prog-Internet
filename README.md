# GALAXIA MAGNA ACADEMY - PROGRAMACION INTERNET UCCR

Plataforma web interactiva desarrollada para la materia **PROGRAMACION INTERNET** del curso **II-51/02/VT/2/2025** en la Universidad Central de Costa Rica (UCCR).

## 🎓 Información del curso

- **Nombre corto:** II-51/02/VT/2/2025  
- **Nombre del curso:** PROGRAMACION INTERNET  
- **Categoría:** SEGUNDO CUATRIMESTRE 2025  
- **Docente:** Fabián Chinchilla Mayorga

## 🚀 Descripción del Proyecto

**Galaxia Magna Academy** es una aplicación web completa que simula una plataforma universitaria. Combina tecnologías frontend y backend para crear una experiencia de usuario interactiva y funcional.

### ✨ Características Principales

- **Sistema de Registro**: Formulario completo con validación en tiempo real
- **Autenticación de Usuarios**: Login con verificación contra base de datos MySQL
- **Modo Administrador**: Panel especializado con credenciales `admin/admin`
- **Interfaz Dinámica**: Avatares por género, efectos visuales y animaciones CSS
- **Base de Datos**: Almacenamiento persistente de usuarios registrados
- **Diseño Responsive**: Compatible con diferentes dispositivos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP (deployed on Vercel)
- **Base de Datos**: MySQL
- **Frameworks**: Bootstrap 5.3
- **Hosting**: Vercel (Frontend & Backend)

## 📁 Estructura del Proyecto

```
├── index.html              # Página principal con login
├── registro.html           # Página de registro (solo administradores)
├── style.css               # Estilos principales
├── script.js               # Lógica de frontend
├── backend/                # Backend para Vercel
│   ├── api/
│   │   └── index.php       # API backend en Vercel
│   └── vercel.json         # Configuración de Vercel
├── images/                 # Recursos gráficos
│   ├── banner.png
│   ├── Magna.png
│   ├── GMA.png
│   └── avatares/
├── xampp-backup/           # Archivos PHP antiguos de XAMPP
└── Lab1-7/                 # Laboratorios anteriores
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
- **Usuario Admin**: `admin` / `admin`
- **Usuarios de prueba**: Registrar nuevos usuarios a través del formulario

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