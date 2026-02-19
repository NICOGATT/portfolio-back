const Joi = require('joi')

const schemas = {
    registerSchema: Joi.object({
        nombre: Joi.string().min(2).max(50).required(),
        apellido: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        // Password con mínima seguridad
        password: Joi.string().min(8).required(), 
        // Solo permitimos roles específicos
        role: Joi.string().valid('admin', 'editor', 'user').default('user'),
        createdAt: Joi.date().forbidden(), // Prohibimos que el cliente lo envíe
        updatedAt: Joi.date().forbidden()
    }),

    loginSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    proyectoSchema: Joi.object({
        nombre: Joi.string().max(100).required(),
        descripcion: Joi.string().min(10).required(),
    }),

    // Para tablas maestras o simples
    tecnologiaSchema: Joi.object({
        nombre: Joi.string().min(1).required()
    }),
    funcionalidadesSchema: Joi.object({
        nombre: Joi.string().min(1).required()
    }),

    contactoSchema: Joi.object({
        nombre: Joi.string(),
        numero : Joi.string().min(10).max(15),
        email: Joi.string().email(),
        mensaje: Joi.string().min(10).max(500).required()
    })
}

const validacion = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = { validacion, schemas };