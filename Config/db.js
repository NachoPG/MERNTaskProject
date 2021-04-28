const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('Conectado correctamente a la base de datos');
    }catch (err){
        console.log(err);
        process.exit(1); //Detener el server
    }
}

module.exports = connectDB();