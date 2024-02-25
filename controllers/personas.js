// CONTROLADOR DE PERSONAS

const { response } = require('express'); // lo desestructuramos para utilizar los res.
const { default: mongoose } = require('mongoose');
// importaciones internas
const Personas = require('../models/personas');


// inicio lógica del controlador

const personasGet = async(req, res = response, next) => {

    const desde = req.query.desde | 0; // tomamos el desde de el request
   
    // Si no viene colocamos 0 por defecto
    try {
        
        const cantidadPersonas = await Personas.count({estado: true});
    
        const [personas] = await Promise.all([ // ARRAY DE PROMESAS
            Personas
            .find({estado: true})
            .find({nombre: new RegExp( req.query.criterio, 'i')})
            .populate("carrera")
            .skip(desde) // se saltea los anteriores a este número
            .limit(5), // nos muestra hasta este número
            
            Personas.countDocuments()

        ]);
    
        res.status(200).json({
            ok: true,
            personas,
            cantidadPersonas:cantidadPersonas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


};


const personasPost = async (req, res = response) => { // el post de usuarios - Agregar

    // al pasar por el token ya nos indica que estamos logueados, tenemos uid
    
    const persona = new Personas({
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

    const id = new mongoose.Types.ObjectId(req.params.id);
   // const uid = req.uid; // uid del usuario porque lo tenemos al pasar por JWT

   try {

    const personaActualizada = await Personas.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true});
    if(!personaActualizada) {
      return res.status(404).json({
        error: 'La persona no existe'
      });
    }
    return res.status(201).json({
      ok: true,
      msg: 'Cambios efectuados correctamente'
    });
  

} catch (error) {

    console.log(error);

    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });
}

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
            msg: 'Cambios efectuados correctamente'
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

    let id = req.query.id
    

    try {

        let cambios = {
            estado: false
        }
        
        const personaEliminada = await Personas.findOneAndUpdate({_id: id}, {$set: cambios}, {new: true});
        if(!personaEliminada) {
          return res.status(404).json({
            error: 'La persona no existe en nuestros registros'
          });
        }
        return res.status(201).json({
          success: 'Document updated',
          msg: 'La persona seleccionada se ha eliminado de nuestro sistema'
        });

        

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const personabyId = async(req, res = response) => {
    try {

        const id = req.params.id

        const persona = await Personas.findById(id)
        .populate("carrera");

        res.status(200).json({
            ok: true,
            persona
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const personabyCarrera = async(req, res = response) => {
    
    const desde = req.body.desde | 0; // tomamos el desde de el request
    let idCarrera = req.body.id_carrera | '';

        console.log(idCarrera)
    try {

        

        const [personas] = await Promise.all([ // ARRAY DE PROMESAS
            Personas
        .find({estado: true})
        .find({carrera: req.body.id_carrera })
        .populate("carrera")
        .skip(desde) // se saltea los anteriores a este número
        .limit(5), // nos muestra hasta este número
    ]);

        res.status(200).json({
            ok: true,
            personas
        });

    } catch (error) {
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
    personasDelete,
    personabyId,
    personabyCarrera
}