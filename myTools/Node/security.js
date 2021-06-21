//encrypt password 
import bcrypt from 'bcryptjs'

export const encryptPassword = (password)=>{
    const salt = bcrypt.genSaltSync()
    const encrypted = bcrypt.hashSync(password, salt)
    return encrypted;
}


//se llama de la siguiente manera en el controlador
req.body.password = encryptPassword(password);
