// middleware/auth.js - Autenticación y autorización

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // El opcional chaining y el split están perfectos
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            error: 'Acceso denegado: Token no proporcionado' 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err) {
            // Diferenciamos si expiró o si es basura
            const message = err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';
            return res.status(403).json({ success: false, error: message });
        }
        
        // Guardamos todo el payload (id, role, etc.) en req.user
        req.user = decodedPayload; 
        next();
    });
};

const authorizeRoles = (...rolesPermitidos) => { // Usamos rest operator para mayor flexibilidad
    return (req, res, next) => {
        // Validación defensiva: ¿Existe el usuario y el rol?
        if (!req.user || !req.user.role) {
            return res.status(403).json({ 
                success: false, 
                error: 'Error de autorización: Rol no encontrado en el token' 
            });
        }

        if (!rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                error: `Requerido: [${rolesPermitidos}]. Tu rol: ${req.user.role}` 
            });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
