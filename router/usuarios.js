// ARCHIVO PARA DEFINIR RUTAS DE USUARIOS

// Importaciones

const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/rol');


// Middlewares
const {
        validarCampos,
        validarJWT,
        esAdminRole
} = require('../middlewares');

// helpers
const { esRoleValido, emailExiste } = require('../helpers/db-validators');

// Importaciones internas

const { usuariosGet, 
        usuariosPost, 
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuario');



// Rutas 

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), // no esté vacío 
        check('password', 'El password debe ser de más de 6 caracteres').isLength({ min: 6 }),
        check('email').custom( emailExiste ), 
        //check('role').custom( esRoleValido ),
        validarCampos // llamamos el middleware que hará la última revisión
], usuariosPost );

router.put('/:id', usuariosPut ); // requerimos un id

router.patch('/', usuariosPatch );

router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('role').custom( esRoleValido ),
], usuariosDelete );

// Compartimos el módulo
module.exports = router;
