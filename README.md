Full Stack Application with NodeJS, ReactJS, PostgreSQL and Docker

This is a full stack that contains differents modules integrated, one backend build in NodeJS, one Fronted created with ReactJS and 
a database with PostgreSQL. All the application have containers to make easy the management and deploytment.

Characteristics:

Backend: NodeJS Server that use ormconfig connected to PostgreSQL.
Frontend: ReactJS Application user interface, build and deploit with Apache server.
Data Base: PostgreSQL for persistence of data.
Dockers: All the services deployed are running in docker compose .

Requirements:

Docker
Docker Compose

Environment variables: In this case we use the .env file for the execution (not recommented to productive environments)

Build and run all the containers using docker compose:

docker-compose up --build

This will start all the services:

- Postgres: Database PostgreSQL running on port 5432
- Backend: Servidor Node.js running on port 3000
- Frontend: ReactJS application running on port 80 in apache server

Use the services:
Frontend (React.js) will be available in http://localhost:80
The backend API (Node.js) will be available in http://localhost:3000


Licence: This proyect is licenced by MIT