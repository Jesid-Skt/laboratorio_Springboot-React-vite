# Proyecto: Book API (Backend)

Documento de referencia y guía de uso para el backend del laboratorio: API REST para gestión de libros con Spring Boot y documentación OpenAPI/Swagger.

---

## Resumen

Este proyecto implementa un backend en Java (Spring Boot) que expone una API REST para realizar un CRUD completo sobre la entidad `Book` (libro). La aplicación utiliza H2 (in-memory) como base de datos para pruebas y SpringDoc / Swagger para la documentación automática de la API.

Tecnologías principales:

- Java 17
- Spring Boot 3.x
- Spring Web
- Spring Data JPA
- H2 (in-memory)
- Lombok
- SpringDoc OpenAPI (Swagger UI)
- Maven (wrapper `mvnw.cmd` incluido)

---

## Estructura del proyecto (backend)

Rutas clave (ubicación relativa dentro del proyecto):

- `src/main/java/com/tdea/book/BookApplication.java` — clase principal.
- `src/main/java/com/tdea/book/Entity/Book.java` — entidad `Book`.
- `src/main/java/com/tdea/book/Entity/Enums/BookType.java` — enum `BookType` (EBOOK, SOFTCOPY, HARDCOVER).
- `src/main/java/com/tdea/book/Repository/BookRepository.java` — interfaz JPA repository.
- `src/main/java/com/tdea/book/Services/BookService.java` — capa de servicio (lógica de negocio).
- `src/main/java/com/tdea/book/Controllers/BookController.java` — controlador REST con endpoints `/api/books`.
- `src/main/java/com/tdea/book/Config/OpenApiConfig.java` — configuración de OpenAPI/Swagger.
- `src/main/resources/application.yml` — configuración (H2, JPA, server, springdoc).

Nota: en este repositorio las carpetas usan capitalización (`Entity`, `Repository`, `Services`, `Config`) y por ello los paquetes Java también están escritos con esa capitalización. Esto es funcional, pero la convención Java recomienda paquetes en minúsculas.

---

## Configuración y ejecución (Windows)

Requisitos previos:

- JDK 17 instalado y configurado (`java -version` debe mostrar 17).
- Maven wrapper incluido (`mvnw.cmd`).

Compilar y ejecutar desde la carpeta del proyecto (`C:\Users\LUZA\Desktop\book`):

```powershell
cd C:\Users\LUZA\Desktop\book
mvnw.cmd clean package -DskipTests
mvnw.cmd spring-boot:run
```

Alternativamente, crear JAR y ejecutar:

```powershell
mvnw.cmd package -DskipTests
java -jar target\book-0.0.1-SNAPSHOT.jar
```

La aplicación arranca en el puerto `8080` por defecto (configurado en `application.yml`).

---

## Endpoints principales (API)

Base: `http://localhost:8080/api/books`

- GET `/api/books` — Listar todos los libros. Opcional: parámetro query `name` para buscar por nombre (ej.: `/api/books?name=algo`).
- GET `/api/books/{id}` — Obtener libro por id.
- POST `/api/books` — Crear un libro. Devuelve HTTP 201 con el libro creado.
- PUT `/api/books/{id}` — Actualizar un libro existente. Devuelve HTTP 200 con el libro actualizado.
- DELETE `/api/books/{id}` — Eliminar libro. Devuelve HTTP 204 si se eliminó.

Ejemplo de payload JSON (POST/PUT):

```json
{
  "name": "Programación en Java",
  "isbnNumber": "978-1234567890",
  "publishDate": "2024-01-15",
  "price": 49.9,
  "type": "HARDCOVER"
}
```

Respuesta típica (201 creado): objeto `Book` con `id` asignado y mismos campos.

---

## Documentación OpenAPI / Swagger

SpringDoc ya está configurado. URLs disponibles:

- Swagger UI (interfaz): `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

Desde Swagger UI puedes explorar todos los endpoints, ver modelos (schemas), probar peticiones y ver respuestas.

Si Swagger UI no carga, verifica que la aplicación esté arrancada en el puerto 8080 y que la dependencia `springdoc-openapi-starter-webmvc-ui` esté correctamente descargada por Maven.

---

## H2 Console (BD en memoria)

Para acceder a la consola H2:

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:booksdb`
- User: `sa`
- Password: (vacío)

La base es en memoria, por lo que los datos se pierden al detener la aplicación.

---

## CORS

El backend permite peticiones desde `http://localhost:3000` (configuración `@CrossOrigin` en el controlador). Métodos permitidos: GET, POST, PUT, DELETE.

---

## Ejemplos rápidos con `curl`

- Listar libros:

```bash
curl -s http://localhost:8080/api/books | jq
```

- Crear libro:

```bash
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{"name":"Libro A","isbnNumber":"1111","publishDate":"2024-01-01","price":10.5,"type":"EBOOK"}'
```

- Editar libro (id 1):

```bash
curl -X PUT http://localhost:8080/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Libro A (ed)","isbnNumber":"1111","publishDate":"2024-01-01","price":12.0,"type":"EBOOK"}'
```

- Eliminar libro (id 1):

```bash
curl -X DELETE http://localhost:8080/api/books/1
```

---

## Integración desde frontend (Axios ejemplo)

Ejemplo de llamada con Axios para listar libros:

```javascript
import axios from 'axios';

const API = 'http://localhost:8080/api/books';

axios.get(API)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

Crear libro:

```javascript
axios.post(API, {
  name: 'Nuevo libro',
  isbnNumber: '2222',
  publishDate: '2024-02-02',
  price: 20.0,
  type: 'SOFTCOPY'
})
.then(res => console.log(res.data))
.catch(err => console.error(err));
```

---

## Notas y problemas comunes

- Si el IDE marca errores sobre Lombok o métodos faltantes, instala el plugin Lombok en IntelliJ y habilita annotation processing.
- Si aparece advertencia sobre el nombre de paquetes (lowercase recomendado), es sólo un warning de estilo; funciona en tiempo de ejecución.
- Si `org.springframework.data.jpa.repository.JpaRepository` no se resuelve en el IDE, reimporta el proyecto Maven para forzar la descarga de dependencias.

---

## Contacto / Autor

Proyecto creado como guía de laboratorio. Para dudas o mejoras, responde a este README o abre un issue en el repositorio.

---

Fin del documento.

