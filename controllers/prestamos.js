// CONTROLADOR DE PRESTAMOS

const { response } = require('express'); // lo desestructuramos para utilizar los res.
// importaciones internas
const Prestamos = require('../models/prestamos');


// inicio lógica del controlador

const prestamosGet = async(req, res = response, next) => {

    const desde = 0; // tomamos el desde de el request
    // Si no viene colocamos 0 por defecto

    const [prestamos] = await Promise.all([ // ARRAY DE PROMESAS
        Prestamos
        .find({estado: true}, 'fechaCreacion fechaVencimiento fechaDevolucion observaciones persona elemento usuario') // los campos que queremos
        .skip(desde), // se saltea los anteriores a este número
        
        Prestamos.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        prestamos
    });


};


const prestamosPost = async (req, res = response) => { // el post de usuarios - Agregar

    // al pasar por el token ya nos indica que estamos logueados, tenemos uid
    const uid = req.uid;
    const prestamo = new Prestamos({
        usuario: uid,
        ...req.body
    });

    try {
        // guardamos un BD
        const prestamoDB = await prestamo.save();

        res.status(200).json({
            ok: true,
            prestamoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    

}

const prestamosPut = async(req, res = response) => { // el put de usuarios - Actualizar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const prestamoDB = await Prestamos.findById(id);

        if (!prestamoDB) {
            res.status(404).json({
                ok: true,
                msg: 'Prestamo no encontrado por id'
            });
        }

        // actualizar
        const cambiosPrestamo = {
            ...req.body,
            usuario: uid
        };

        const PrestamoActualizado = await Prestamos.findByIdAndUpdate(id, cambiosPrestamo, { new: true });

        res.json({
            ok: true,
            persona: PrestamoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const prestamosDelete = async(req, res = response) => { // el delete de usuarios - eliminar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const prestamoDB = await Prestamos.findById(id);

        if (!prestamoDB) {
            res.status(404).json({
                ok: true,
                msg: 'Elemento no encontrado por id'
            });
        }

        // actualizar el estado para no eliminar de BD
        const cambiosPrestamo = {
            estado : false,
            usuario: uid
        };

        const PrestamoActualizado = await Personas.findByIdAndUpdate(id, cambiosPrestamo, { new: true });

        res.json({
            ok: true,
            elemento: PrestamoActualizado
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
    prestamosGet,
    prestamosPost,
    prestamosPut,
    prestamosDelete
}