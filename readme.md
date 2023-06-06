###INSTALANDO LAS LIBRERIAS DE NODE Y REACT####

1. abrir la carpeta raiz /utspermisos

2. abrir una terminal

3. escribir cd node y dar enter

4. escribir npm i y dar enter, esperar la descarga....

5. cerrar la terminal y en la carpeta raiz hacer cd reactfront

6. npm i y dar enter, esperar la descarga...

###CONFIGURANDO LA BASE DE DATOS LOCAL MYSQL###

1. Ejecutar el archivo backup.sql

2. Entrar a la carpeta node

3. Entrar a la carpeta database

4. En el archivo db.js sustituir con tus datos de conexión const db = new Sequelize("NombreDeTuBaseDeDatos", "usuario", "contraseña",

###CONFIGURANDO LA BASE DE DATOS EN LA NUBE MYSQL (OMITIR SI SE EJECUTAR DE MANERA LOCAL)###

1. En la carpeta node buscar el archivo .env

2. Sustituir por tu cadena de conexion generada en jawsdb

3. Descomentar el codigo de conexion a bd en la nube de db.js y comentar el de conexion local

4. En el archivo app.js hasta la parte de abajo comentar el codigo de conexion local y descomentar el de conexion remota

###CORRIENDO NUESTRO PROYECTO EN ###

1. Abriremos una terminal en la carpeta /node y ejecutaremos "nodemon app"

2. Sin cerrar la primer terminal abriremos otra en /reactfront y ejecutaremos "npm start"

3. Si todo salio bien el proyecto deberia correr en http://localhost:3000/

###ACCEDIENDO A LA APLICACION###

1. Para logearte necesitaras acceder mediante el user: ema@gmail.com pass: 131313

2. A partir de la sesion de administrador podras crear sesiones para los tutores y los alumnos
