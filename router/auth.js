// ARCHIVO PARA DEFINIR RUTAS DE AUTH
// path: api/login

// Importaciones de terceros

const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const {
    validarCampos, validarJWT,
} = require('../middlewares');

// importaciones internas

const { login, renewToken } = require('../controllers/auth');

// código de este archivo

// Rutas

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoriaaaaaaaaaaa').not().isEmpty(),
    validarCampos
],login );

// este path es api/login/renew
router.get('/login/renew', 
      validarJWT,
      renewToken
    );

// EXPORTACIONES 
module.exports = router;
