const { validationResult } = require('express-validator'); // Para traer errores de validaciones


const validarCampos = ( req, res, next ) => { // los middlewares tienen el next para que siga
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors); // Esto me muestra los errores encontrados por falta de formato de correo
    }

    next();
}

module.exports = {
    validarCampos
}
