const validarCampos = require('../middlewares/validar_campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');

module.exports = { // los 3 puntos significan trae todo
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}
