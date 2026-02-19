const proyectosService = require('../service/proyecto.service')
const funcionalidadService = require('../service/funcionalidades.service')
const tecnologiaService = require('../service/tecnologias.service');

//POST /proyectos
function crear(service, req, res) {
    try {
        const nuevo = service.crear(req.body); 
        return res.status(201).json({
            success : true,
            nuevo
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
        const proyectos = service.leer()
        return res.status(200).json({
            success : true, 
            count : proyectos.length, 
            proyectos
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
            mensaje : "El proyecto ha sido actualizado con exito",
            actualizado
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
            mensaje : "El proyecto ha sido elimino con efecto",
            eliminado
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
    crearProyecto : (req, res)=> crear(proyectosService, req, res),
    listarProyecto : (req, res)=> listar(proyectosService, req, res),
    actualizarProyecto : (req, res)=> actualizar(proyectosService, req, res), 
    eliminarProyecto : (req, res)=> eliminar(proyectosService, req, res), 
    crearFuncionalidad : (req, res)=> crear(funcionalidadService, req, res),
    listarFuncionalidad : (req, res)=> listar(funcionalidadService, req, res),
    actualizarFuncionalidad : (req, res)=> actualizar(funcionalidadService, req, res),
    eliminarFuncionalidad : (req, res)=> eliminar(funcionalidadService, req, res),
    crearTecnologia : (req, res)=> crear(tecnologiaService, req, res),
    leerTecnologia : (req, res)=> listar(tecnologiaService, req, res), 
    actualizarTecnologia : (req, res)=> actualizar(tecnologiaService, req, res), 
    eliminarTecnologia : (req, res)=> eliminar(tecnologiaService, req, res),
    crearContacto : (req, res)=> crear(contactoService, req, res),
    leerContacto : (req, res)=> listar(contactoService, req, res), 
    actualizarContacto : (req, res)=> actualizar(contactoService, req, res), 
    eliminarContacto : (req, res)=> eliminar(contactoService, req, res), 
}