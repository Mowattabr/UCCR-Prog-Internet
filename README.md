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
- **Backend**: PHP
- **Base de Datos**: MySQL
- **Frameworks**: Bootstrap 5.3
- **Servidor**: XAMPP/LAMP

## 📁 Estructura del Proyecto

```
├── index.html              # Página principal
├── style.css               # Estilos principales
├── script.js               # Lógica de frontend
├── registro.php            # Procesamiento de registro
├── verificar_usuario.php   # Validación de login
├── images/                 # Recursos gráficos
│   ├── banner.png
│   ├── Magna.png
│   ├── GMA.png
│   └── avatares/
└── Lab1-7/                 # Laboratorios anteriores
```

## 🎮 Funcionalidades

### Sistema de Usuario
- **Registro**: Formulario con validación de email, confirmación de contraseña y selección de género
- **Login**: Autenticación contra base de datos con mensajes de error específicos
- **Avatares**: Cambio dinámico según género seleccionado

### Interactividad
- **Intereses**: Selección visual con efectos de iluminación
- **Mensaje Star Wars**: Easter egg especial con fade effect
- **Navegación**: Secciones expandibles (Cursos, Estudiantes, Profesores)

### Administración
- **Panel Admin**: Acceso exclusivo con credenciales especiales
- **Gestión de Profesores**: Asignación dinámica de materias

## 🔧 Instalación y Uso

1. **Configurar servidor local** (XAMPP recomendado)
2. **Crear base de datos** `University-GMA`
3. **Importar estructura** de tabla `users`
4. **Colocar archivos** en directorio del servidor
5. **Acceder** via `localhost/proyecto`

### Credenciales de Prueba
- **Usuario Admin**: `admin` / `admin`
- **Usuarios de prueba**: Registrar nuevos usuarios a través del formulario

## 📖 Comentarios Educativos

El código incluye extensos comentarios explicativos que amplían las explicaciones de clase, facilitando el aprendizaje y consulta futura de conceptos como:
- Modelo de caja CSS
- Manipulación del DOM
- AJAX y comunicación asíncrona
- Validación de formularios
- Seguridad en PHP

---

**Universidad Central de Costa Rica - Segundo Cuatrimestre 2025**  
*"Sapientia per Stellam" - Galaxia Magna Academy*
