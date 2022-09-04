// MODELO DE ELEMENTOS
const {Schema, model} = require('mongoose');

const ElementoSchema = Schema({
        descripcion: {
            type: String,
            required: [true, 'La descripción es necesaria'],
            unique: false
        },
        nro: {
            type: Number,
            required: [true, 'El número de los elementos es necesario'],
        },
        marca: {
            type: String,
            required: false,
            unique: false
        },
        modelo: {
            type: String,
            required: false,
            unique: false
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

}, {collection: 'elementos'});

// formatear el schema y devolver al usuario lo que decidamos mostrarle
ElementoSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        ...object
    } = this.toObject();
    return object;
});


module.exports = model('Elemento', ElementoSchema);
