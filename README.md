# Club de Videojuegos

Bienvenido al Club de Videojuegos, una aplicación web construida con React y Firebase, diseñada para conectar a entusiastas de los videojuegos. Esta plataforma permite a los usuarios explorar y unirse a diferentes clubes de juegos, cada uno con una selección de videojuegos para disfrutar.

## Características

- **Visión General del Club**: Cada club cuenta con un nombre, descripción y una lista de videojuegos asociados.
- **Detalles del Juego**: Los videojuegos tienen un título, género y descripción.
- **Registro de Usuarios**: Los nuevos usuarios pueden registrarse con nombre, apellido, nombre de usuario, email, contraseña y videojuego favorito.
- **Membresía de Club**: Los usuarios pueden unirse a clubes registrando una membresía en la base de datos.
- **Perfil de Usuario**: Los usuarios pueden ver y modificar su información personal o retirarse de un club.
- **Datos Precargados**: Datos iniciales para videojuegos y clubes precargados en la base de datos (ver datos JSON en la última sección).
- **Funcionalidad de Búsqueda**: Los usuarios pueden buscar cualquier juego en el sistema.
- **Personalización de Foto de Perfil**: Funcionalidad añadida para establecer una foto de perfil.
- **Banner Dinámico**: Al elegir un videojuego favorito, el banner se actualiza con la imagen de dicho juego.
- **Búsqueda de Juegos Interactiva**: Al hacer clic en un juego buscado, se redirige al usuario al club que lo ofrece.

## Visión Técnica

- **React**: Para construir la interfaz de usuario y estructurar contenido incluyendo formularios, tablas y elementos visuales.
- **Redux**: Para el manejo del estado de la aplicación.
- **Tailwind CSS**: Para los estilos de la aplicación, asegurando una interfaz atractiva y moderna.
- **Firebase**: Utilizado como plataforma de desarrollo, base de datos Firestore, autenticación y alojamiento.
- **Diseño Responsivo**: Asegura que la aplicación es compatible con teléfonos, tabletas y escritorios.
- **CSS Styling**: Proporciona un aspecto atractivo y coherente.

## Esquema de la Base de Datos

Nota: Las IDs para Videojuegos y Clubes serán proporcionadas junto con los datos iniciales. Cada ID de Usuario corresponde a su UID generado por Firebase Auth.

## Condiciones de Entrega

- **Control de Versiones**: El proyecto se mantiene con Git y está alojado en GitHub.
- **Librería de Desarrollo Web**: React es utilizado para construir la aplicación web.
- **Navegación por URL**: React Router o librerías similares habilitan la navegación por URL dentro del sistema.
- **Componentes de Firebase**: El sistema está alojado con Firebase Hosting, usando Firebase Auth para inicio de sesión y registro, y Firestore para el almacenamiento de datos.

## Datos Precargados

Los datos iniciales sobre videojuegos y clubes se cargan manualmente en la base de datos para ahorrar tiempo de desarrollo y crear membresías.

## Criterios de Evaluación

- Estructura de componentes de React.
- Responsive.
- Estructura del Router.
- Funcionalidad a través de varias características.
- Configuración de Firebase y esfuerzo estético.

## Comenzando

Para ejecutar este proyecto localmente:

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias requeridas.
3. Configura tu proyecto Firebase y actualiza la configuración en la aplicación.
4. Ejecuta `npm start` para iniciar el servidor de desarrollo.

## Despliegue

La aplicación está desplegada con Firebase Hosting. Para instrucciones detalladas, consulta la [documentación de Firebase](https://firebase.google.com/docs/hosting).

## Contribuciones

Si estás interesado en contribuir, por favor lee las directrices de contribución antes de enviar tu PR.

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE.md).
