// Importaciones de terceros
const { response } = require('express');
const bcryptjs = require('bcryptjs');

//Importaciones internas
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../middlewares/generar-jwt');


// código del archivo
const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el mail existe
        const usuarioDB = await Usuario.findOne({ email });
        
        if( !usuarioDB) { // si no viene el usuario correcto
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correctos - correo'
            });

        }

        // SI el usuario está activo

        if( !usuarioDB.status ) { // si el usuario está en false
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });

        }

        // Verificar la contraseña
        // esta funcion compara el pass recibido con el de la BD
        /*
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password);
        
        if( !validPassword ) { // si el validpassword está en false
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
*/
        // Generar el JWT
        const token = await generarJWT( usuarioDB.id );
        // Devolver el OK de la respuesta

        return res.status(200).json({ 
            ok: true,
            usuarioDB,
            token 
        
        })
        
    } catch (error) {
        // Manejamos el error
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    // Generar el JWT
    const token = await generarJWT( Usuario.id );

    res.json({
        ok: true,
        token
    });

}

// Exportaciones

module.exports = {
    login,
    renewToken
}

