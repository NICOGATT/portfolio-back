const { usuario } = require('../models/data');

function leer() {
    return usuario;
}

function crear(pass, data) {
    const { nombre,apellido, email, role, createdAt, updatedAt } = data;
    const nuevoUsuario = {
        id: usuario.length + 1,
        nombre,
        apellido,
        email,
        password : pass,
        role,
        createdAt,
        updatedAt
    };
    usuario.push(nuevoUsuario);
    return nuevoUsuario;
}

function actualizar(data) {
    const index = usuario.findIndex(u => u.id === 1);
    if (index === -1) {
        const err = new Error('Usuario no encontrado');
        err.code = 404;
        throw err;
    }
    const { nombre, email, password } = data;
    if (nombre !== undefined) usuario[index].nombre = nombre;
    if (email !== undefined) usuario[index].email = email;
    if (password !== undefined) usuario[index].password = password;
    return usuario[index];
}

function eliminar(id) {
    const index = usuario.findIndex(u => u.id === id);
    if (index === -1) {
        const err = new Error('Usuario no encontrado');
        err.code = 404;
        throw err;
    }
    usuario.splice(index, 1);
    return true;
}

module.exports = { leer, crear, actualizar, eliminar };
