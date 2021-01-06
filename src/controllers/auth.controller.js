const pool = require("../database");
const jwt = require("jsonwebtoken");
const helpers = require("../lib/helper");
const authCtrl = {};
authCtrl.signin = async (req, res, next) => {
    const { email, pass_usuario } = req.body
console.log(req.body)
    try {
        const usuarioC = await pool.query('select * from usuarios where email = ?', email)
console.log(usuarioC)
        if (usuarioC.length == 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' })


        } else {
            const user = usuarioC[0];
            const validPassword = await helpers.matchPassword(pass_usuario, user.pass_usuario);
            if (!validPassword) {
                return res.status(401).json({

                    message: "Contraseña incorrecto",
                });


            }
            const token = jwt.sign({ id: user.id_usuario }, process.env.SECRET);

            res.status(200).send({
                token: token
            });

        }
    } catch (error) {
        console.log(error);
    }


}

authCtrl.User = async (req, res, next) => {

    const { id } = req.params;
    const token = id

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded.id)
    const user = await pool.query('select * from usuarios where id_usuario = ?', decoded.id)

    res.json(user[0])

}
module.exports = authCtrl;