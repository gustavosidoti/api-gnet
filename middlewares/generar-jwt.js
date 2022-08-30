const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) =>{

        const payload = { uid };
        // armado de la firma completa con sus componentes
        jwt.sign (payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token ) => {

            if( err ){
                console.log(err);
                reject( 'No se pudo generar el token' )
            }else{
                resolve( token );
            }
        })

    })
}

module.exports = {
    generarJWT
}
