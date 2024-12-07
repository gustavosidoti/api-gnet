// MIDDLEWARE PARA PROTEGER RUTAS

const {response, request } = require('express');
const jwt = require('jsonwebtoken');

// Importamos el modelo de usuario
const Usuario = require('../models/usuarios');

const validarJWT = async ( req = request, res = response, next ) => {
    
    const token = req.header('x-token'); // como lo llamemos aquí el frontend tendrá que enviarlo

    // Si no mandan token
    if ( !token ) {
        return res.status(404).json({
            msg: 'No hay token en la petición'
        });
    }
    
    // Validar si es correcto el token enviado
    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY); // verifica y extrae el uid del usuario que hace la eliminación
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            });
        }

        // Verificar si el uid tiene el estado en true
        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado en false'
            });
        }
        
        req.usuario = usuario;
        
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}