const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }

}); // Definimos un objeto schema

// formatear el schema y devolver al usuario lo que decidamos mostrarle
UsuarioSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        _id,
        password,
        ...object
    } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema); // con esto exportamos el schema y le damos el nombre 'Usuario'
