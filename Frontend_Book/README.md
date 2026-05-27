# Frontend Book Dashboard

## Descripción del proyecto

Esta aplicación es un frontend moderno construido con React, Vite y Tailwind CSS diseñado para consumir una API REST de Spring Boot que expone recursos de libros en `http://localhost:8080/api/books`.

El propósito del proyecto es ofrecer una interfaz visual atractiva y funcional para realizar operaciones CRUD sobre libros, incluyendo creación, lectura, actualización, eliminación y búsqueda en tiempo real.

## Tecnologías principales

- **React**: biblioteca principal para interfaces de usuario.
- **Vite**: bundler moderno y servidor de desarrollo rápido.
- **Tailwind CSS**: sistema de utilidades CSS para estilos rápidos y diseño responsive.
- **Axios**: cliente HTTP para consumir la API REST.
- **JavaScript (ESM)**: código basado en módulos nativos.

## Estructura del proyecto

```
Frontend_Book/
├── dist/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BookForm.jsx
│   │   ├── BookList.jsx
│   ├── services/
│   │   └── BookService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Flujo del frontend

1. **Carga inicial**
   - `App.jsx` monta la aplicación y carga la lista de libros desde el backend usando `BookService.getAllBooks()`.

2. **Servicio de API**
   - `src/services/BookService.js` centraliza todas las llamadas HTTP a la API REST:
     - `getAllBooks()`
     - `getBookById(id)`
     - `createBook(book)`
     - `updateBook(id, book)`
     - `deleteBook(id)`

3. **Listado de libros**
   - `BookList.jsx` muestra los libros en una tabla estilizada con Tailwind.
   - Contiene botones para editar y eliminar cada libro.
   - Eliminar solicita confirmación y actualiza la lista automáticamente.

4. **Formulario de libro**
   - `BookForm.jsx` maneja creación y edición de libros.
   - Incluye validaciones de campos obligatorios y precio mayor a 0.
   - Limpia los campos tras guardar un libro nuevo.
   - Al editar, carga el libro seleccionado en el formulario.

5. **Búsqueda en tiempo real**
   - `App.jsx` mantiene el término de búsqueda en `searchTerm`.
   - Filtra la lista de libros por nombre al teclear.
   - La tabla se actualiza en tiempo real sin recargar la página.

## Comportamiento esperado

- Al crear un libro, el registro aparece inmediatamente en la tabla.
- Al editar un libro, los cambios se reflejan inmediatamente.
- Al eliminar un libro, desaparece de la lista.
- Al buscar por nombre, la lista se filtra al instante.

## Punto de conexión del backend

La URL base para la API está definida en `src/services/BookService.js`:

```js
const API_URL = 'http://localhost:8080/api/books';
```

Puedes modificar esta URL si tu backend utiliza otro host o puerto.

## Cómo ejecutar el frontend

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Construir para producción:

```bash
npm run build
```

## Consideraciones finales

- El frontend está preparado para conectarse con cualquier API REST compatible con los endpoints CRUD de libros.
- La UI está diseñada para ser moderna, accesible y responsiva.
- El código está organizado por componentes y servicios para facilitar el mantenimiento.
