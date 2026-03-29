const Proyecto = require ('../models/Proyecto')

function crear(data){
    if (data.nombre === "" && data.descripcion === "") {
        return data.status(404).json({
            success : false, 
            error : "Lo campos nombre y descripcion deben tener contenido"
        })
    }
    const nuevoProyecto = {
        id : proyectos.length + 1, 
        nombre : data.nombre, 
        descripcion : data.descripcion, 
        tecnologiasIds : tecnologias,
        funcionalidadesIds : funcionalidades
    }
    proyectos.push(nuevoProyecto)

    return nuevoProyecto;
}

async function leer() {
    try {
        //GET /api/proyectos - Obtener todos los proyectos
        const {destacado, limit = 10} = req.query; 

        //Construir filtros
        let filtro = {}
        if (destacado === 'true') filtro.destacado = true; 

        //Ejecutar consulta
        const proyectos = await Proyecto.find(filtro).sort({destacado: -1, fechaDeCreacion : -1}).limit(parseInt(limit))
        
        const total = await Proyecto.countDocuments(filtro)
    } catch (error) {
        
    }
}

function actualizar(id, data) {
    const idNum = Number(id); 
    if (!Number.isInteger(id)) {
        throw new Error("ID invalido")
    }
    const index = proyectos.findIndex(p => p.id === idNum)

    if (!proyecto) {
        const err = new Error(`El proyecto con el ID ${idNum} no se encontro`)
        err.code = 404 
        throw err
    }

    const proyectoActual = proyectos[index]

    //Actualizacion parcial (PATCH style) : si no viene, se mantiene. 
    const nombre = data?.nombre?.trim();
    const descripcion = data?.descripcion?.trim(); 

    if(nombre !== undefined) proyectoActual.nombre = nombre; 
    if(descripcion !== undefined) proyectoActual.descripcion = descripcion;


    proyectos[index] = proyectoActual; 
    return proyectoActual; 
}

function eliminar(id) {
    const idNum = Number(id)
    if (!Number.isInteger(idNum)){
        throw new Error("El id debe ser un integer")
    }
    const index = proyectos.findIndex(p => p.id === idNumb)

    if(index === -1) {
       const err = new Error (`El proyecto con el ID ${idNum} no se encontro`)
       err.code = 404 // Opcional para que el controller sepa el status
       throw err; 
    }

    const [proyectoEliminado] = proyectos.splice(index, 1)[0]; 
    return proyectoEliminado;
}


module.exports = {
    crear, 
    leer, 
    actualizar, 
    eliminar
}