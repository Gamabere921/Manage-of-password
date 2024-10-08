# Gestor de contraseñas

## Inspiración

Este proyecto empezó con la curiosidad de saber que parámetros debe tener una aplicación para que sea segura. Muchas veces podemos encontrar artículos de como vulnerar aplicaciones, de los errores que tiene una aplicación pero se habla poco de la importancia de saber desarrollar aplicaciones de forma segura e incluso practicas como estas te  ayudan a entender el funcionamiento de las aplicaciones y la razón de porque dichas vulnerabilidades funcionan. Sin duda desarrollar aplicaciones seguras ayuda a tener mejor compresión de la seguridad y vulnerabilidades de una aplicación 

## Objetivo

Un gestor de contraseñas es perfecto para saber como desarrollar una aplicación segura, debido a que necesitas proteger de buena forma tus propias contraseñas (cifrado de información), verificar que eres la persona que dices ser (autenticación), desarrollarlo de forma escalable (servicios desacoplados) y fácil instalación e uso (docker compose).

## Descripción

Este gestor de contraseñas es de facil instalacion y cuenta con:

- Login
- Generación de tokens con JTW
- Cifrado AES de las contraseñas
- Cifrado y descifrado unicamente en el backend
- APIs entre el frontend y backend
- Posibilidad de que se pueda usar entre varios usuarios.

## Requisitos

- Docker
- Docker compose

## Tutorial de uso:

1. Clonar repositorio con `git clone [https://github.com/Gamabere921/Manage-of-password.git](https://github.com/Gamabere921/Manage-of-password.git)`
2. Entrar a la carpeta del repositorio
3. Ejecutar el comando `docker-compose up -d —build` 
4. Verificar que se levantaron los cuatro contenedores con el comando  `docker ps`
5. Entrar a la aplicación web con [localhost](http://localhost) en el navegador.
6. Registrarte y despues iniciar sesión 

### Verificación de contraseñas cifradas

1. Accede al contenedor:
    
    `docker exec -it <container_name or ID> /bin/sh` 
    
2. Conectate a la base de datos:
    
    `psql -U user -d password_manager` 
    
3. Visualiza todos los usuarios
    
    `SELECT * FROM users;` 
    
4. Visualiza las contraseñas 
    
    `SELECT * FROM passwords;` 
    

Se puede observar todas las contraseñas de forma cifrada, por lo que si un atacante logra acceder a la base de datos, se va a encontrar con todas las contraseñas cifradas. Sin embargo cuando el usuario accede al apartado de “my passwords” puede visualizar su contraseña en texto plano, esto para que sea practico para el usuario promedio.

### Modificaciones sugeridas

Modificar el archivo `vi password-manager-backend/.env` 

```
DATABASE_URL=postgresql://user:password@db:5432/password_manager #modificar si se modifica el docker-compose principal
JWT_SECRET=37fe1bdd5be1ee796e6a7f6943e51db71bbfa6bd2dfdf9cac3e7190fffeb3052 # modificar
ENCRYPTION_KEY=81f3df926ad3d383e6977a99098a515152f9238754cd0c5adcafacad36063479 #modificar
```

Puedes generar nuevas key puedes usar el comando `openssl rand -hex 32` .Esto generará una clave de 64 caracteres hexadecimales, lo cual es adecuado para una clave secreta de 256 bits.

Modificar el archivo `vi docker-compose.yml` principal y cambia el usuario y contraseña de la base de datos

```
      POSTGRES_USER: user #Tu usuario
      POSTGRES_PASSWORD: password #Tu contraseña
```
