//controllers/auth.controller.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioService = require('../service/usuario.service');

// POST /auth/login
function login(req, res) {
    try {
        const { email, password } = req.body;
        const usuarios = usuarioService.leer();
        const usuario = usuarios.find(u => u.email === email);

        if (!usuario) {
            const err = new Error('Usuario no encontrado');
            err.code = 404;
            throw err;
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            const err = new Error('Contraseña incorrecta');
            err.code = 401;
            throw err;
        }

        // Usamos la misma clave secreta que en el registro
        const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Quitamos el password del objeto antes de enviarlo
        const { password: _, ...usuarioSinPassword } = usuario;

        return res.json({
            success: true,
            token,
            usuario: usuarioSinPassword
        });
    } catch (error) {
        const status = error.code || 400;
        return res.status(status).json({
            success: false,
            error: error.message
        });
    }
}

// POST /auth/register
async function register(req, res) { // Agregamos async
    try {
        const { password, ...datosUsuario } = req.body;
        
        // Corregimos el hashing asincrónico
        const hashedPassword = await bcrypt.hash(password, 10); 
        
        // Pasamos el hash y el resto de los datos
        const newUser = usuarioService.crear(hashedPassword, datosUsuario); 

        const token = jwt.sign(
            { id: newUser.id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: _, ...newUserSinPassword } = newUser;

        return res.status(201).json({
            success: true,
            mensaje: "Usuario registrado con éxito",
            token: token,
            usuario: newUserSinPassword
        });
    } catch (error) {
        const status = error.code || 400;
        return res.status(status).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    login,
    register
}