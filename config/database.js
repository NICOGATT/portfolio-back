const mongoose = require('mongoose'); 
require('dotenv').config(); 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI); 
        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
        console.log(`📦 Base de datos: ${conn.connection.name}`);

        //Eventos de conexion (util para debugging)
        mongoose.connection.on('error', (err) => {
            console.error('❌ Error en MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB desconectado');
        });
    }catch(e) {
        console.error('❌ Error conectando a MongoDB:', e.message); 
        process.exit(1); // Salir si no hay coneccion
    };
}

module.exports = connectDB; 