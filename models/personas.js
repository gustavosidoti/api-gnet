// MODELO DE ELEMENTOS
const {Schema, model} = require('mongoose');

const PersonaSchema = Schema({
        dni: {
            type: String,
            required: [true, 'El dni es necesario'],
            unique: true
        },
        nombre: {
            type: String,
            required: [true, 'El nombre es necesario'],
        },
        carrera: [{
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Carrera'
        }],
        estado: {
            type: Boolean,
            default: true,
            required: false,
        },
        

}, {collection: 'personas'});

// formatear el schema y devolver al usuario lo que decidamos mostrarle
PersonaSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        ...object
    } = this.toObject();
    return object;
});


module.exports = model('Persona', PersonaSchema);