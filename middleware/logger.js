// middleware/logger.js - Logging profesional

const morgan = require('morgan'); 

//Logger personalizado

const logger = (req, res, next) => {
    const inicio = Date.now(); 
    console.log('\n📌 ========== NUEVA PETICIÓN ==========');
    console.log(`⏰ ${new Date().toLocaleString()}`);
    console.log(`📨 ${req.method} ${req.url}`);
    console.log(`📦 Headers:`, req.headers['content-type'] || 'sin content-type');

    //Cuando termine la respuesta 
    res.on('finish', () => {
        const duracion = Date.now() - inicio; 

        console.log(`📊 ${res.statusCode} - ${duracion}ms`);
        console.log('=====================================\n');
    })

    next()
}

//Usar morgan para logs mas profesionales
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms '); 

module.exports = {logger, morganLogger}
