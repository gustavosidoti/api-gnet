const {Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
}, {collection: 'roles'});

// formatear el schema y devolver al usuario lo que decidamos mostrarle
RoleSchema.method('toJSON', function() {

    const { // quitamos lo que no queremos devolver luego del post
        __v,
        ...object
    } = this.toObject();
    return object;
});

module.exports = model('Role', RoleSchema);
