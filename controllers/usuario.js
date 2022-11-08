const { response } = require('express'); // lo desestructuramos para utilizar los res.
const { validationResult } = require('express-validator'); // Para traer errores de validaciones
const bcryptjs = require('bcryptjs');
// importaciones internas
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../middlewares/generar-jwt'); 


// inicio lógica del controlador

const usuariosGet = async(req, res = response, next) => {

    const desde = 0; // tomamos el desde de el request
    // Si no viene colocamos 0 por defecto

    const [usuarios, total] = await Promise.all([ // ARRAY DE PROMESAS
        Usuario
        .find({}, 'nombre email role google img') // los campos que queremos
        .skip(desde) // se saltea los anteriores a este número
        .limit(5), // nos muestra hasta este número

        Usuario.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        usuarios,
        total
    });


};


const usuariosPost = async (req, res = response) => { // el post de usuarios - Agregar

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors); // Esto me muestra los errores encontrados por falta de formato de correo
    }


    const {
        email,
        password,
        nombre,
        role
    } = req.body; // queremos atrapar esos datos

    // creamos una instancia del modelo de usuario
    const usuario = new Usuario(req.body);

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt); // estos son metodos de bcrypt

    // guardamos un BD
    await usuario.save();

    // Generar el token - JWT
    const token = await generarJWT( usuario.id);

    res.json({
        msg: 'post API - controlador',
        usuario,
        token
    });

}

const usuariosPut = (req, res = response) => { // el put de usuarios - Actualizar

    const {
        id
    } = req.params; // extraemos el id de lo que envíe el usuario en la ruta.

    res.json({
        msg: 'put API - controlador'
    });

}

const usuariosPatch = (req, res = response) => { // el get de usuarios

    res.json({
        msg: 'patch API - controlador'
    });

}

const usuariosDelete = (req, res = response) => { // el delete de usuarios - eliminar

    res.json({
        msg: 'delete API - controlador'
    });

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}