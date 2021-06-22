import jwt from 'jsonwebtoken'


export const getToken = ( id_user, email)=>{

    return new Promise((resolve, reject)=>{

        const payload = {id_user, email}
        jwt.sign(payload, process.env.SECRET, {
            expiresIn : '2h'
        }, (err, token)=>{
            err && reject('No token created')

            resolve(token)
        })

    })

}

//se llama de la siguiente manera en el controlador
const token = await getToken(id_user.rows[0].id_user, email)
