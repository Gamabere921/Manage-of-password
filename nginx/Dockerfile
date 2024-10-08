# Usa una imagen base de Nginx
FROM nginx:alpine

# Copia la configuración personalizada de Nginx al contenedor
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto donde Nginx servirá la aplicación
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
