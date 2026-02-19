const {tecnologias} = require('../models/data'); 

//Creamos las tecnologias 
const crear= (data) => {
    if(data.nombre ==="") {
        const err = new Error('Deben estar el campo del nombre con al menos un caracter'); 
        err.code = 400
        throw err; 
    }

    const nuevaTecnologia = {
        id : tecnologias.length + 1, 
        nombre : data.nombre
    }

    tecnologias.push(nuevaTecnologia); 
    return nuevaTecnologia
}

//Leemos las tecnologias 
const leer = () => {
    return tecnologias
}

//Actualizamos cada tecnologia 
const actualizar = (id, data) => {
    const idNum = Number(id); 
    if (!Number.isInteger(idNum)) {
        const err = new Error('El id debe ser un numero');
        err.code = 400;
        throw err;
    }

    const index = tecnologias.findIndex(t => t.id === idNum)

    if (index === -1) {
        const err = new Error(`No se encontro la tecnologia con el ID ${idNum}`);
        err.code = 404; 
        throw err;
    }

    const tecnologiaActual = tecnologias[index]

    const nombre = data?.nombre?.trim()

    if (nombre !== undefined) tecnologiaActual.nombre = nombre

    tecnologias[index] = tecnologiaActual
    return tecnologiaActual
}

//Obtenemos las tecnologias 

const eliminar = (id) => {
    const idNum = Number(id)
    if(!Number.isInteger(idNum)) {
        const err = new Error ('El id debe ser un error');
        err.code = 400; 
        throw err;
    }

    const index = tecnologias.findIndex(t => t.id === idNum)

    if (index === -1) {
        const err = new Error(`No se encontro la tecnolgia con el id ${id}`)
        err.code = 404; 
        throw err; 
    }

    const [tecnologiaEliminada] = tecnologias.splice(index, 1); 
    return tecnologiaEliminada
}


module.exports = {
    crear, 
    leer, 
    actualizar, 
    eliminar
}