const mongoose = require('mongoose'); 
const Counter = require('./Counter'); 

const contactoSchema = new mongoose.Schema({
    contactoId : {
        type : Number, 
        unique : true, 
        index : true, 
    }, 
    nombre : {
        type : String, 
        required : [true, "El nombre es obligatorio"], 
        trim : true, 
        minlength : [2, 'Minimo 2 caracteres'], 
        maxlength : [50, 'Maximo 50 caracteres']
    }, 
    email : {
        type : String, 
        required : [true, 'El email es obligatorio'], 
        trim : true, 
        lowercase : true, 
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    }, 
    mensaje : {
        type : String, 
        required : [true, 'El mensaje es obligatorio'], 
        trim : true, 
        minlength : [10, 'Minimo 10 caracteres'], 
        maxlength : [1000, 'Máximo 1000 caracteres'], 
    }, 
    telefono : {
        type : String, 
        trim : true
    }, 
    leido : {
        type : Boolean, 
        trim : true
    }, 
    fechaEnvio: {
        type : Date, 
        default : Date.now
    }
}, {
    timeStamps : true, 
    toJSON : {
        transform : (doc, ret) => {
            ret.id = ret.contactoId;  
            delete ret._id; 
            delete ret.__v; 
            return ret
        }
    }
});

//Middleware pre-save 
contactoSchema.pre('save', async function (next) {
    if(this.isNew && !this.contactoId){
        try {
            const counter = await Counter.findByIdAndUpdate(
                {model : "contacto"}, 
                {$inc :{seq : 1}}, 
                {new : true, upsert:true}
            ); 
            this.contactoId = counter.seq; 
            next();
        } catch (error) {
            next(error); 
        }
    } else {
        next(); 
    }
})

module.exports = mongoose.model('Contacto', contactoSchema); 