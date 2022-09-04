// CONTROLADOR DE ELEMENTOS

const { response } = require('express'); // lo desestructuramos para utilizar los res.
// importaciones internas
const Elementos = require('../models/elementos');


// inicio lógica del controlador

const elementosGet = async(req, res = response, next) => {

    const desde = 0; // tomamos el desde de el request
    // Si no viene colocamos 0 por defecto

    const [elementos, total] = await Promise.all([ // ARRAY DE PROMESAS
        Elementos
        .find({estado: true}, 'descripcion nro marca modelo usuario') // los campos que queremos
        .skip(desde) // se saltea los anteriores a este número
        .limit(5), // nos muestra hasta este número

        Elementos.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        elementos,
    });


};


const elementosPost = async (req, res = response) => { // el post de usuarios - Agregar

    // al pasar por el token ya nos indica que estamos logueados, tenemos uid
    const uid = req.uid;
    const elemento = new Elementos({
        usuario: uid,
        ...req.body
    });

    try {
        // guardamos un BD
        const elementoDB = await elemento.save();

        res.status(200).json({
            ok: true,
            elementoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    

}

const elementosPut = async(req, res = response) => { // el put de usuarios - Actualizar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const elemento = await Elementos.findById(id);

        if (!elemento) {
            res.status(404).json({
                ok: true,
                msg: 'Elemento no encontrado por id'
            });
        }

        // actualizar
        const cambiosElemento = {
            ...req.body,
            usuario: uid
        };

        const ElementoActualizado = await Elementos.findByIdAndUpdate(id, cambiosElemento, { new: true });

        res.json({
            ok: true,
            elemento: ElementoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const elementosDelete = async(req, res = response) => { // el delete de usuarios - eliminar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const elementoDB = await Elementos.findById(id);

        if (!elementoDB) {
            res.status(404).json({
                ok: true,
                msg: 'Elemento no encontrado por id'
            });
        }

        // actualizar el estado para no eliminar de BD
        const cambiosElemento = {
            estado : false,
            usuario: uid
        };

        const ElementoActualizado = await Elementos.findByIdAndUpdate(id, cambiosElemento, { new: true });

        res.json({
            ok: true,
            elemento: ElementoActualizado
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
    elementosGet,
    elementosPost,
    elementosPut,
    elementosDelete
}