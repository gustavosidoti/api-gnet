const Role = require('../models/rol');
const Usuario = require('../models/usuarios');

// Función que corrobora los roles válidos.
 const esRoleValido = async(role ='') =>{ 
    const existeRol = await Role.findOne({ role });
    if ( !existeRol ) {
            throw new Error(`El rol ${ role } no está registrado en la BD`)
    }
}

// Verificar si el correo existe
const emailExiste = async( email = '' ) =>{
    const existeEmail = await Usuario.findOne( { email });
    if( existeEmail ) {
       throw new Error(`El correo: ${ email }, ya está registrado`);
    }

}


module.exports = {
    esRoleValido,
    emailExiste
}
