// CONTROLADOR DE PERSONAS

const { response } = require('express'); // lo desestructuramos para utilizar los res.
// importaciones internas
const Personas = require('../models/personas');


// inicio lógica del controlador

const personasGet = async(req, res = response, next) => {

    const desde = 0; // tomamos el desde de el request
    // Si no viene colocamos 0 por defecto

    const [personas, total] = await Promise.all([ // ARRAY DE PROMESAS
        Personas
        .find({estado: true}, 'dni nombre carrera usuario') // los campos que queremos
        .skip(desde), // se saltea los anteriores a este número
        
        Personas.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        personas,
    });


};


const personasPost = async (req, res = response) => { // el post de usuarios - Agregar

    // al pasar por el token ya nos indica que estamos logueados, tenemos uid
    const uid = req.uid;
    const persona = new Personas({
        usuario: uid,
        ...req.body
    });

    try {
        // guardamos un BD
        const personaDB = await persona.save();

        res.status(200).json({
            ok: true,
            personaDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    

}

const personasPut = async(req, res = response) => { // el put de usuarios - Actualizar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const persona = await Personas.findById(id);

        if (!persona) {
            res.status(404).json({
                ok: true,
                msg: 'Elemento no encontrado por id'
            });
        }

        // actualizar
        const cambiosPersona = {
            ...req.body,
            usuario: uid
        };

        const PersonaActualizada = await Personas.findByIdAndUpdate(id, cambiosPersona, { new: true });

        res.json({
            ok: true,
            persona: PersonaActualizada
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const personasDelete = async(req, res = response) => { // el delete de usuarios - eliminar

    const id = req.params.id;
    const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

    try {

        const personaDB = await Personas.findById(id);

        if (!personaDB) {
            res.status(404).json({
                ok: true,
                msg: 'Persona no encontrada por id'
            });
        }

        // actualizar el estado para no eliminar de BD
        const cambiosPersona = {
            estado : false,
            usuario: uid
        };

        const PersonaActualizada = await Personas.findByIdAndUpdate(id, cambiosPersona, { new: true });

        res.json({
            ok: true,
            elemento: PersonaActualizada
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
    personasGet,
    personasPost,
    personasPut,
    personasDelete
}