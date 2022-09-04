// MODELO DE ELEMENTOS
const {Schema, model} = require('mongoose');

const ReparacionSchema = Schema({
        fechaIngreso: {
            type: Date,
            required: true,
            unique: false
        },
        fechaFinReparacion: {
            type: Date,
            required: false,
            unique: false
        },
        descripcionReparacion: {
            type: String,
            required: true,
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

}, {collection: 'reparacion'});

// formatear el schema y devolver al usuario lo que decidamos mostrarle
ReparacionSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        ...object
    } = this.toObject();
    return object;
});


module.exports = model('Reparacion', ReparacionSchema);