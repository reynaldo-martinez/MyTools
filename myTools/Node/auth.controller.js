
import { encryptPassword } from "../helpers/encryptPassword";
import bcrypt from 'bcryptjs'
import { pool } from "../pool";


export async function signUp(req, res) {
  let { name, email, password } = req.body;

  try {
    //verificar que ese email no esté en uso
    const userExists = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rowCount > 0) {
      return res.status(500).json({
        ok: false,
        msg: "this email already exists",
      });
    } else {

      //en caso de que no exista, encriptar contraseña y hacer el insert
      password = encryptPassword(password);
      await pool.query(
        "INSERT INTO users (name, email, password, id_rol) VALUES($1, $2, $3, $4)",
        [name, email, password, 1]
      );

      return res.json({
        saved: true,
        msg: "Saved",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      saved : false,
      msg : 'ocurrió un error'
    })
  }
}



export async function signIn(req, res){
    
    const { email, password } = req.body;
    try {
      //verficar si el usuario existe
      const userExists = await pool.query(
        "SELECT email, password FROM users WHERE email = $1",
        [email]
      );
     
      if (userExists.rowCount == 0) {
        return res.status(400).json({
          ok: false,
          msg: "this email doesn't exists",
        });
      }

      //verificar la contraseña
      const validPassword = bcrypt.compareSync(password, userExists.rows[0].password)
      if (!validPassword) {
        return res.json({
          login: false,
          msg: "incorrect password",
        });
      }

      //generar token

      res.json({
        login : true,
        user : {
          email,
          password
        },
        token : 'hfdghadfghadf55hg255r5gh'
      })
    } catch (error) {
      console.log(error);
    }
    
}
