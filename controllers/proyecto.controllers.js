const proyectosService = require('../service/proyecto.service')

//POST /proyectos
function crear(req, res) {
    try {
        const nuevo = proyectosService.crearProyecto(req.body); 
        return res.status(201).json({
            success : true,
            proyecto : nuevo
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
function listar(req, res) {
    try {
        const proyectos = proyectosService.leerProyectos()
        return res.status(201).json({
            success : true, 
            count : proyectos.length, 
            proyectos : proyectos
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
function actualizar(req, res) {
    try {
        const actualizado = proyectosService.actualizarProyecto(req.params.id, req.body); 
        return res.json({
            succes : true, 
            mensaje : "El proyecto ha sido actualizado con exito",
            proyecto : actualizado
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
function eliminar(req, res) {
    try {
        const eliminado = proyectosService.eliminarProyecto(req.params.id)
        return res.json({
            success : true, 
            mensaje : "El proyecto ha sido elimino con efecto",
            proyecto : eliminado
        })
    } catch (error) {
        const status = error.code || 400; 
        return res.status(status).json({
            success : false, 
            error : error.message
        })
    }
}

module.exports= {
    crear, 
    listar,
    actualizar, 
    eliminar
}