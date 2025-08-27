# GALAXIA MAGNA ACADEMY - PROGRAMACION INTERNET UCCR

Plataforma web interactiva desarrollada para la materia **PROGRAMACION INTERNET** del curso **II-51/02/VT/2/2025** en la Universidad Central de Costa Rica (UCCR).

## 🎓 Información del curso

- **Nombre corto:** II-51/02/VT/2/2025  
- **Nombre del curso:** PROGRAMACION INTERNET  
- **Categoría:** SEGUNDO CUATRIMESTRE 2025  
- **Docente:** Fabián Chinchilla Mayorga

## 🚀 Descripción del Proyecto

**Galaxia Magna Academy** es una aplicación web completa con arquitectura moderna cloud-first. Utiliza **Vercel** como backend y **Supabase** como base de datos, eliminando dependencias de servidores locales.

### ✨ Características Principales

- **Sistema de Login Dual**: Autenticación por código de usuario o email/contraseña
- **Base de Datos Supabase**: Gestión completa de usuarios con campos personalizados
- **Perfil de Usuario**: Sistema completo de gestión de perfiles con campos editables
- **Registro Avanzado**: Formulario completo con validación en tiempo real
- **Control de Roles**: Sistema de roles con validación (Estudiante, Profesor, Administrador)
- **Generación Automática**: Códigos de usuario únicos basados en fecha y rol
- **Avatares Dinámicos**: Cambio automático según género seleccionado
- **Efectos Especiales**: Sonido de lightsaber para selección Star Wars
- **Diseño Responsive**: Bootstrap 5.3 con interfaz moderna y dark theme
- **Validación en Tiempo Real**: Feedback inmediato en formularios

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: PHP desplegado en Vercel
- **Base de Datos**: Supabase (PostgreSQL)
- **Framework CSS**: Bootstrap 5.3
- **Iconos**: FontAwesome 6.0
- **Desarrollo**: VS Code con extensiones
- **Hosting**: Vercel para API backend
- **Audio**: HTML5 Audio API

## 📁 Estructura del Proyecto

```
├── admin_tools_admins.html          ## Panel de administración de usuarios administradores
├── admin_tools_common.js            ## Funciones JS compartidas entre paneles admin
├── admin_tools_inactive_users.html  ## Panel para gestionar usuarios inactivos
├── admin_tools_online_training.html ## Panel de administración de capacitaciones online
├── admin_tools_professors.html      ## Panel de administración de profesores
├── admin_tools_students.html        ## Panel de administración de estudiantes
├── admin_tool_courses.html          ## Panel de administración de cursos
├── aprende_mas_popup.html           ## Popup informativo "Aprende más"
├── ayuda_popup.html                 ## Popup de ayuda
├── config.js                        ## Configuración global del proyecto
├── contacto_popup.html              ## Popup de contacto
├── cursos.html                      ## Página de listado de cursos
├── dashboard.html                   ## Panel principal de administración y navegación
├── images/                          ## Carpeta de imágenes y avatares
│   ├── banner.png                   ## Banner principal Star Wars
│   ├── Female.png                   ## Avatar femenino
│   ├── GAM_transparent.png          ## Logo principal transparente
│   ├── GMA.png                      ## Logo alternativo
│   ├── incognito.png                ## Avatar por defecto/incógnito
│   ├── Magna.png                    ## Logo alternativo Magna
│   ├── Male.png                     ## Avatar masculino
│   └── Other.png                    ## Avatar otro género
├── index.html                       ## Página principal/login
├── profile.html                     ## Perfil de usuario editable
├── profile.js                       ## Lógica JS para perfil de usuario
├── README.md                        ## Documentación del proyecto
├── registro.html                    ## Formulario de registro de usuarios
├── scripts.js                       ## Lógica JS principal y comunicación API
├── style.css                        ## Estilos y animaciones principales
├── supabase.js                      ## Conexión y funciones para Supabase
```

## 🎮 Funcionalidades

### Sistema de Usuario
- **Login Dual**: 
  - Por código de usuario (formato: 2025_08_ROL_XXXX)
  - Por email y contraseña
- **Gestión de Perfiles**: Sistema completo de edición de datos personales
- **Validación**: Email, confirmación de contraseña y campos requeridos
- **Avatares Dinámicos**: Cambio automático según género seleccionado
- **Persistencia**: Sesiones guardadas en localStorage

### Perfil de Usuario (profile.html)
- **Información Personal**: Nombre, email, teléfono editables
- **Datos Demográficos**: Género, intereses, fecha de nacimiento
- **Información del Sistema**: Rol, código de usuario, fecha de inscripción
- **Edición en Línea**: Click para editar con botones guardar/cancelar
- **Validación de Campos**: Verificación en tiempo real
- **Auto-guardado**: Cambios se guardan automáticamente en Supabase

### Sistema de Registro
- **Formulario Completo**: Todos los campos con validación
- **Generación de Códigos**: Automática basada en fecha y rol
- **Selección de Intereses**: Checkboxes múltiples con efectos visuales
- **Contraseñas de Rol**: Validación específica por tipo de usuario
- **Detección de Duplicados**: Verificación de email único

### Base de Datos Supabase
- **Tabla lista_usuarios**: Gestión completa de usuarios
- **Campos disponibles**:
  - username (nombre completo)
  - email (único)
  - password (encriptada)
  - telefono
  - fecha_nacimiento
  - rol (estudiante/profesor/administrador)
  - fecha_inscripcion
  - codigo_usuario (único)
  - genero (m/f/o/n)
  - intereses (CSV)

### Interactividad
- **Efectos Visuales**: Animaciones CSS y transiciones suaves
- **Mensaje Star Wars**: Easter egg especial con efecto de sonido
- **Navegación Intuitiva**: Enlaces contextuales y breadcrumbs
- **Feedback Inmediato**: Mensajes de éxito/error en tiempo real

### Administración
- **Panel Admin**: Acceso exclusivo con credenciales especiales
- **Gestión de Usuarios**: Creación, edición y visualización
- **Debug Tools**: Herramientas de diagnóstico (removidas en producción)

## 🔧 Instalación y Uso

### Para Development Local
1. **Clonar repositorio**
2. **Abrir index.html** en navegador web moderno
3. **Backend en Vercel**: No necesita configuración local
4. **Base de datos Supabase**: Conectada automáticamente

### Para Production

### URLs del Proyecto
**Repositorio en GitHub**: https://github.com/arg3ni5/II-51-Laboratorios/tree/main/backend
### Credenciales de Prueba

**Usuario de Prueba Principal:**
- **Código**: `2025_08_A_2909`
- **Username**: `t`
- **Email**: `t@a.com`
- **Rol**: Estudiante

**Para el Sistema:**
- **Login Admin**: Usar código o email/contraseña
- **Registro**: Crear nuevos usuarios através del formulario
- **Contraseñas de Rol**:
  - Estudiante: `estudiante`
  - Profesor: `profesor`
  - Administrador: `admin`

**Nota**: Todos los usuarios se almacenan en Supabase y son persistentes.

## 🔄 Migración a Arquitectura Cloud

Este proyecto fue completamente migrado de XAMPP local a una arquitectura serverless moderna:

**Migración Realizada:**
- ✅ **Backend PHP** desplegado en Vercel
- ✅ **Base de datos** migrada a Supabase (PostgreSQL)
- ✅ **Frontend** actualizado para APIs REST
- ✅ **Sistema de perfiles** implementado con edición en línea
- ✅ **Autenticación dual** por código o email/contraseña
- ✅ **Gestión de sesiones** con localStorage
- ✅ **Validación robusta** con manejo de errores
- ✅ **Archivos XAMPP** movidos a backup para referencia

**Beneficios de la Nueva Arquitectura:**
- **Escalabilidad**: Supabase maneja cualquier carga
- **Performance**: APIs optimizadas y CDN global
- **Mantenimiento**: Sin servidores que mantener
- **Desarrollo**: Desarrollo local simplificado
- **Producción**: Deployment automático
- **Backup**: Datos seguros en Supabase

## 🎯 Funcionalidades Destacadas

### 1. Sistema de Login Dual
```javascript
// Login por código de usuario
codigo: "2025_08_A_2909"

// Login por email/contraseña
email: "t@a.com"
password: "userpass"
```

### 2. Perfil Editable
- **Click para editar**: Cualquier campo se puede modificar
- **Guardado automático**: Los cambios se sincronizan con Supabase
- **Validación en tiempo real**: Errores mostrados inmediatamente
- **Avatares dinámicos**: Cambio automático según género

### 3. Base de Datos Supabase
```sql
-- Estructura de la tabla lista_usuarios
CREATE TABLE lista_usuarios (
  username TEXT,
  email TEXT UNIQUE,
  password TEXT,
  telefono TEXT,
  fecha_nacimiento DATE,
  rol TEXT,
  fecha_inscripcion DATE,
  codigo_usuario TEXT UNIQUE,
  genero CHAR(1),
  intereses TEXT
);
```

## 📖 Comentarios Educativos

El código incluye extensos comentarios explicativos que amplían las explicaciones de clase, facilitando el aprendizaje y consulta futura de conceptos como:
- **Arquitectura Serverless** con Vercel y Supabase
- **APIs REST** y comunicación asíncrona
- **Manipulación del DOM** con JavaScript moderno
- **Gestión de estado** con localStorage
- **Validación de formularios** en tiempo real
- **Manejo de errores** y experiencia de usuario
- **Responsive Design** con Bootstrap 5.3
- **Seguridad** en aplicaciones web

---

**Universidad Central de Costa Rica - Segundo Cuatrimestre 2025**  
*"Sapientia per Stellam" - Galaxia Magna Academy*

## 🔗 Enlaces Importantes

- **Backend API**: https://backend-kt0bm09wc-mowattabrs-projects.vercel.app
- **GitHub Repo**: https://github.com/arg3ni5/II-51-Laboratorios/tree/main/backend
