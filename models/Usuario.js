const mongoose = require('mongoose'); 
const Counter = require('./Counter')

const usuarioSchema = new mongoose.Schema({
    usarioId : {
        type : Number, 
        unique : true, 
        index : true
    },
    nombre : {
        type : String, 
        required : true, 
        lowercase : true, 
    }, 
    apellido : {
        type : String, 
        required : true, 
        lowercase : true
    }, 
    email : {
        type : String, 
        required: true, 
        lowercase : true
    }, 
    password : {
        type : String, 
        required : true, 
        select : false // No se devuelve en consultas por defecto
    }, 
    role : {
        type : String, 
        enum : ['user', 'admin'],
        default: ['user']
    }
}, {
    timestamps: true, 
    toJSON : {
        transform : (doc, ret) => {
            ret.id = ret.usuarioId; 
            delete ret._id;
            delete ret.__v; 
            return ret
        }
    }
})