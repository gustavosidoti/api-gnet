// CONTROLADOR DE REPARACIONES

const { response } = require('express'); // lo desestructuramos para utilizar los res.
// importaciones internas
const Reparaciones = require('../models/reparaciones');


// inicio lógica del controlador

const reparacionesGet = async(req, res = response, next) => {

    const desde = 0; // tomamos el desde de el request
    // Si no viene colocamos 0 por defecto

    const [reparaciones] = await Promise.all([ // ARRAY DE PROMESAS
        Reparaciones
        .find({estado: true}, 'fechaIngreso fechaFinReparacion descripcionReparacion observaciones elemento usuario') // los campos que queremos
        .skip(desde), // se saltea los anteriores a este número
        
        Reparaciones.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        reparaciones
    });


};


const reparacionesPost = async (req, res = response) => { // el post de usuarios - Agregar

    // al pasar por el token ya nos indica que estamos logueados, tenemos uid
    const uid = req.uid;
    const reparacion = new Reparaciones({
        usuario: uid,
        ...req.body
    });

    try {
        // guardamos un BD
        const reparacionDB = await reparacion.save();

        res.status(200).json({
            ok: true,
            reparacionDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    

}

const reparacionesPut = async(req, res = response) => { // el put de usuarios - Actualizar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const reparacionDB = await Reparaciones.findById(id);

        if (!reparacionDB) {
            res.status(404).json({
                ok: true,
                msg: 'Reparación no encontrado por id'
            });
        }

        // actualizar
        const cambiosReparacion = {
            ...req.body,
            usuario: uid
        };

        const reparacionActualizada = await Reparaciones.findByIdAndUpdate(id, cambiosReparacion, { new: true });

        res.json({
            ok: true,
            persona: reparacionActualizada
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const reparacionesDelete = async(req, res = response) => { // el delete de usuarios - eliminar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const reparacionDB = await Reparaciones.findById(id);

        if (!reparacionDB) {
            res.status(404).json({
                ok: true,
                msg: 'Elemento no encontrado por id'
            });
        }

        // actualizar el estado para no eliminar de BD
        const cambiosReparacion = {
            estado : false,
            usuario: uid
        };

        const reparacionActualizada = await Personas.findByIdAndUpdate(id, cambiosReparacion, { new: true });

        res.json({
            ok: true,
            elemento: reparacionActualizada
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    reparacionesGet,
    reparacionesPost,
    reparacionesPut,
    reparacionesDelete
}