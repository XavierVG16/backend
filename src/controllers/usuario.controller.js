const pool = require("../database");
const helpers = require('../lib/helper');
const jwt = require("jsonwebtoken");
const usuarioCtrl = {};
usuarioCtrl.getUsuarios = async (req, res, next) => {
  const equipo = await pool.query("select * from usuarios");

  res.status(200).json(equipo);
};

usuarioCtrl.createUsuario = async (req, res, next) => {
  const { nombres, apellidos, ci,email, pass_usuario, t_usuario, telefono } = req.body;


  const newUsuario = {
    nombres, apellidos, email, ci,pass_usuario, t_usuario, telefono
  };

  const lista = await pool.query('select * from usuarios  WHERE ci = ?', ci);
  if(lista.leigth){
    newUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);

    const user = await pool.query('insert into usuarios  set ?', newUsuario);
    console.log(user)
    const token = jwt.sign({ id: user.insertId }, process.env.SECRET);
  
    res.status(200).send({
      token: token
    });
  }else{
    res.status(500).json( {message:'el Usuario ya existe!'});

  }
 
};
usuarioCtrl.getUsuario = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  const usuario = await pool.query('select * from usuarios  WHERE idusuario =  ?', [id]);
  res.json(usuario);
};

usuarioCtrl.editUsuario = async (req, res, next) => {
  const { id } = req.params;

  const { nombres, apellidos, email, ci ,pass_usuario, t_usuario, telefono } = req.body;

  const editUsuario = {
    nombres, apellidos, email, ci, pass_usuario, t_usuario, telefono
  };
  editUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);
  await pool.query('UPDATE usuarios set ? WHERE id_usuario = ?', [editUsuario, id]);
  res.status(200).json( 'Editado con éxito!');
};

usuarioCtrl.deleteUsuario = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
  res.status(200).json('Eliminado con éxito!');
};

module.exports = usuarioCtrl;