const contactoService = require('../service/contacto.service');
//POST /proyectos


function crear(service, req, res) {
    try {
        const nuevo = service.crear(req.body); 
        return res.status(201).json({
            success : true,
            contacto : nuevo
        })
    } catch (error) {
        const status = error.code || 400; 
        return res.status(status).json({
            succes: false, 
            error : error.message
        })
    }
}

//GET /proyectos 
function listar(service, req, res) {
    try {
        const contactos= service.leer()
        return res.status(201).json({
            success : true, 
            count : contactos.length, 
            contactos : contactos
        })

    } catch (error) {
        const status = error.code || 500; 
        return res.status(status).json({
            success : false, 
            error : error.message
        })
    }
}

//PATCH /proyectos/:id
function actualizar(service, req, res) {
    try {
        const actualizado = service.actualizar(req.params.id, req.body); 
        return res.json({
            succes : true, 
            mensaje : "El contacto ha sido actualizado con exito",
            contacto : actualizado
        })
    } catch (error) {
        const status = error.code || 400; 
        return res.status(status).json({
            success : false, 
            error : error.message 
        })
    }
}


// DELETE /proyecto/:id
function eliminar(service,req, res) {
    try {
        const eliminado = service.eliminar(req.params.id)
        return res.json({
            success : true, 
            mensaje : "El contacto ha sido elimino con efecto",
            contacto : eliminado
        })
    } catch (error) {
        const status = error.code || 400; 
        return res.status(status).json({
            success : false, 
            error : error.message
        })
    }
}



module.exports = {
  crearContacto: (req, res) => crear(contactoService, req, res),

  leerContacto: (req, res) => listar(contactoService, req, res),

  actualizarContacto: (req, res) => actualizar(contactoService, req, res),

  eliminarContacto: (req, res) => eliminar(contactoService, req, res),
};