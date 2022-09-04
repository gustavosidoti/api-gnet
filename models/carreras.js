// MODELO DE CARRRERAS
const {Schema, model} = require('mongoose');

const CarreraSchema = Schema({
        nombreCarrera:{
            type: String,
            required: [true, 'El nombre de la carrera es necesario']
        },
        estado: {
            type: Boolean,
            default: true,
            required: true,
        },
        usuario: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        },

}, {collection: 'carrera'});

// formatear el schema y devolver al usuario lo que decidamos mostrarle
CarreraSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        ...object
    } = this.toObject();
    return object;
});


module.exports = model('Carrera', CarreraSchema);