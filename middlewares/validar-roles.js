const { response } = require("express");

const esAdminRole = ( req, res = response, next ) => {

    if ( !req.usuario ) { // nos avisa que primero hay que llamar al otro middleware JWT
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    // acá desestructuramos esta info y preguntamos por si es ADMIN
    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ) {  // Si no es admin sale con el error

        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        })
    }

    // Si es ADMIN continua con la ejecución de la función eliminar
    next();
}

const tieneRole = ( ...roles ) =>{ // recibe los roles que le pasa la llamada
    return (req, res = response, next) =>{ // devuelve el resultado de esta función

        if ( !req.usuario ) { // 1 VALIDACIÓN: nos avisa que primero hay que llamar al otro middleware JWT
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

        if ( !roles.includes( req.usuario.rol ) ) {  // Si no viene el rol esperado sale con error
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${ roles }`
        });
    }
        
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}
