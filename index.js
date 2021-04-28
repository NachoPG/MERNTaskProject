const express = require('express');
const connectDB = require('./Config/db');
const cors = require('cors');

//Crear Servidor
const server = express();

//Conectar a la base de datos
connectDB;

//Habilitar CORS
server.use(cors());

//Habilitar express.JSON
server.use(express.json({extended:true}));
//Puerto del server
const PORT = process.env.PORT || 4000;

//Importar rutas
server.use('/api/users', require('./Routes/users'));
server.use('/api/auth', require('./Routes/auth'));
server.use('/api/proyectos', require('./Routes/proyectos'));
server.use('/api/tareas', require('./Routes/tareas'));



//Definir pagina principal
// server.get('/', (require,response) =>{
//     response.send('Hola Mundo');
// });

server.listen(PORT, () =>{
    console.log(`El servidor esta escuchando por el puerto ${PORT}`);
})