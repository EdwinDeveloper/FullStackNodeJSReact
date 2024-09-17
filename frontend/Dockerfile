# Stage 1: Build the React app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Apache
FROM httpd:alpine

COPY --from=build /app/build /usr/local/apache2/htdocs/

# Expose port 80 for the web server
EXPOSE 80
