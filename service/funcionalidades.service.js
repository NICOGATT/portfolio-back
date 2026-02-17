const {funcionalidades, tecnologias} = require('../models/data'); 

//Crear funcionalidades 

function crearFuncionalidad(data) {
    if(data.nombre === ""){
        const err = new Error('El nombre debe tener al menos 1 caracter');
        err.code = 400;
        throw err;
    }

    const nuevaFuncionalidad = {
        id : funcionalidades.length + 1, 
        nombre : data.nombre
    };

    funcionalidades.push(nuevaFuncionalidad);
    return nuevaFuncionalidad;
}

// Leer todas las funcionalidades 

function leerFuncionalidades () {
    return funcionalidades;
}

//Actualizar las funcionalidades 

function actualizarFuncionalidad (id, data) {
    const idNum = Number(id)
    if (!Number.isInteger(id)) {
        const err = new Error('El id debe ser un numero');
        err.code = 400;
        throw err;
    }

    const index = funcionalidades.findIndex(f => f.id === idNum);

    if (index === -1) {
        throw new Error(`No se ha encontrado la funcionalidad con el ID ${idNum}`); 
    }

    const funcionalidadActual = funcionalidades[index]; 

    const nombre = data?.nombre?.trim(); 

    if(nombre !== undefined) funcionalidadActual.nombre = nombre; 

    funcionalidades[index] = funcionalidadActual;

    return funcionalidadActual; 
}


//Eliminar funcionalidad 
function eliminarFuncionalidad (id) {
    const idNum = Number(id)
    if(!Number.isInteger(idNum)){
        const err = new Error('El id debe ser un numero positivo');
        err.code = 400; 
        throw err; 
    }

    const index = funcionalidades.findIndex(f => f.id === idNum); 

    if (index === -1) {
        const err = new Error(`La funcionalidad con el ID ${idNum} no se ha encontrado`);
        err.code = 404; 
        throw err; 
    }

    const [funcionalidadEliminada] = funcionalidades.splice(index, 1)[0]; 
    return funcionalidadEliminada
}