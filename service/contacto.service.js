const {contactos} = require('../models/data')

const validacionContacto = (data) => {
    return data.nombre === "" || data.email === "" || data.numero === "" || data.numero.length === 13 || data.mensaje === ""
}


function crear(data) {
    if(validacionContacto(data)){
        throw new Error('Lo campos deben estar completos')
    }

    const nuevoContacto = {
        id : contactos.length + 1, 
        nombre : data.nombre.trim() , 
        email : data.email.trim(), 
        numero : data.numero, 
        mensaje : data.mensaje.trim() 
    }

    contactos.push(nuevoContacto); 
    return nuevoContacto; 
}

function leer() {
    return contactos; 
}

function actualizar(id, data) {
    const idNum = Number(id)
    if (!Number.isInteger(idNum)) {
        throw new Error('El id debe ser un numero')
    } 
    
    const index = contactos.findIndex(c => c.id === idNum); 

    if(index === -1) {
        throw new Error(`El contacto con el ID ${idNum} no fue encontrado`)
    }

    const contactoActual = contactos[index]
    
    const nombre = data?.nombre?.trim();
    const email = data?.email?.trim();
    const numero = data?.numero?.trim(); 
    const mensaje = data?.mensaje?.trim(); 

    if(nombre !== undefined) contactoActual.nombre = nombre;
    if(email !== undefined) contactoActual.email = email;
    if(numero !== undefined) contactoActual.numero = numero;
    if(mensaje !== undefined) contactoActual.mensaje = mensaje;

    contactos[index] = contactoActual;
    return contactoActual;
}

function eliminar(id) {
    const idNum = Number(id)
    if(!Number.isInteger(idNum)){
        const err = new Error('El id debe ser un numero positivo');
        err.code = 400; 
        throw err; 
    }

    const index = contactos.findIndex(c => c.id === idNum); 

    if (index === -1) {
        const err = new Error(`El contacto con el ID ${idNum} no se ha encontrado`);
        err.code = 404; 
        throw err; 
    }

    const [contactoEliminado] = contactos.splice(index, 1); 
    return contactoEliminado
}

module.exports = {
    crear, 
    leer, 
    actualizar, 
    eliminar
}