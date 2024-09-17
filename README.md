Aplicación Full Stack con Node.js, React, PostgreSQL y Docker

Este es un proyecto fullstack que consta de diferentes modulos integrados, un backend realizado con NodeJS, un Frontend creado con ReactJS y una base de datos PostgreSQL. Toda la aplicación está containerizada utilizando Docker para facilitar su despliegue y gestión.

Características

Backend: Servidor Node.js utilizando ormconfig, conectado a PostgreSQL.
Frontend: Aplicación React.js para la interfaz de usuario, construida y servida con Nginx.
Base de Datos: PostgreSQL para la persistencia de datos.
Dockerizado: Todos los servicios se ejecutan en contenedores aislados utilizando Docker Compose.

Requisitos Previos

Docker
Docker Compose

Variables de Entorno: Por rapidez se utiliza el mismo archivo .env para la ejecución (no recomendable para ambientes productivos)

Construye y arranca los contenedores usando Docker Compose:

docker-compose up --build

Esto iniciará tres servicios:

- Postgres: La base de datos PostgreSQL
- Backend: Servidor Node.js corriendo en el puerto 3000
- Frontend: Aplicación React.js corriendo en el puerto 80 (servida a través de Nginx)

Accede a la aplicación:
El frontend (React.js) estará disponible en http://localhost:80
La API del backend (Node.js) estará disponible en http://localhost:3000



Licencia: Este proyecto está licenciado bajo la Licencia MIT.