import { validationResult } from "express-validator";


export const validationRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};


//se llama en la ruta de esta manera, junto a los middlewares de express-validator
router
  .post("/signup", [

    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "contraseña debe tener mas de 7 caracteres").isLength({ min: 8 }),
    validationRequest

  ], signUp)
