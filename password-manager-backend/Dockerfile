# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el yarn.lock al contenedor de trabajo
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el resto de la aplicación al contenedor de trabajo
COPY . .

# Expone el puerto donde se servirá la API
EXPOSE 5000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "src/server.js"]
