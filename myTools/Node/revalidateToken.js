import jwt from 'jsonwebtoken'

export const revalidateToken = (req, res, next) => {

    const token = req.header('x-token')

    !token && res.status(401).json({
        ok : false,
        msg : 'no token provided'
    })

    try {
      const { id_user, email } = jwt.verify(token, process.env.SECRET);
      req.id_user = id_user;
      req.email = email;
    } catch (err) {
      res.status(401).json({
        ok: false,
        msg: "fail validate token",
      });
    }

    
    next()

}
