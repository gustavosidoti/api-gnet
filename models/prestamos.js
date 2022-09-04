// MODELO DE ELEMENTOS
const {Schema, model} = require('mongoose');

const PrestamoSchema = Schema({
        fechaCreacion: {
            type: Date,
            required: true,
            unique: false
        },
        fechaVencimiento: {
            type: Date,
            required: true,
            unique: false
        },
        fechaDevolucion: {
            type: Date,
            required: false,
            unique: false
        },
        observaciones: {
            type: String,
            required: false,
            unique: false
        },
        estado: {
            type: Boolean,
            default: true,
            required: true,
        },
        persona: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Persona'
        },
        elemento: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Elemento'
        },
        usuario: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        },

}, {collection: 'prestamo'});

// formatear el schema y devolver al usuario lo que decidamos mostrarle
PrestamoSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        ...object
    } = this.toObject();
    return object;
});


module.exports = model('Prestamo', PrestamoSchema);