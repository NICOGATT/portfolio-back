const mongoose = require('mongoose');
const Counter = require('./Counter')

const proyectoSchema = new mongoose.Schema({
    proyectoId : {
        type : Number,
        unique: true, 
        index : true
    },
    titulo : {
        type : String, 
        required :[true, 'El titulo es obligatorio'], 
        trim : true, 
        maxLength: [100, 'Maximo 100 caracteres']
    }, 
    descripcion : {
        type : String, 
        trim : true
    }, 
    tecnologias: [{
        type : String, 
        trim : true
    }], 
    imagenUrl : {
        type : String,
        default: 'https://via.placeholder.com/300x200'
    },
    urlDemo : String, 
    urlRepo : String,
    destacado : {
        type : Boolean, 
        default : false
    }, 
    fechaDeCreacion : {
        type : Date,
        default : Date.now
    }
}, {
    timestamps : true, 
    toJSON : {
        transform : (doc, ret) => {
            ret.id = ret.proyectoId; 
            delete ret._id; 
            delete ret.__v; 
            return ret;
        }
    }
})


//middleware pre-save 

proyectoSchema.pre('save', async function (next) {
    if(this.isNew && !this.proyectoId) {
        try{
            const counter = await Counter.findOneAndUpdate(
                {model: "proyecto"},
                {$inc: {seq: 1}}, 
                {new : true, upsert:true}
            ); 
            this.proyectoId = counter.seq; 
            next();
        }catch (error) {
            next(error);
        }
    } else {
        next();
    }
})