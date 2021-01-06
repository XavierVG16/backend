const pool = require("../database");

const lectorCtrl = {};
lectorCtrl.getLectores = async (req, res, next) => {
    try {
        const lectores = await pool.query('select * from lectores');
        res.status(200).json(lectores);
    } catch (error) {
        res.status(500).json(error);
    }
  
};

lectorCtrl.createLector = async (req, res, next) => {
    const{ nombres, apellidos, ci, telefono, direccion,tipolector } = req.body;
  const newLector = {nombres, apellidos, ci, telefono, direccion,tipolector}
  try {
    const lectores = await pool.query('select * from lectores where ci = ?',ci);
    if (lectores.length == 0) {
        const lector  = await pool.query('insert into lectores set ?', newLector);
        res.status(200).json('Guardado con éxito!');
    } else {
        res.status(500).json({message:'El Lector ya existe!'});
    }
     
  } catch (error) {
    res.status(500).json(error);
  }
 
};
lectorCtrl.getLector = async (req, res, next) => {
    const {id} = req.params;
    try {
        const lector = await pool.query('select * from lectores where ci = ?',id);
        if (lector.length == 0) {
          res.status(400).json({message: 'Lector no Encontrado'});
      } else {
        res.status(200).json(lector[0]);
      }
    } catch (error) {
        res.status(500).json(error);
    }
  
};

lectorCtrl.editLector = async (req, res, next) => {
    const { nombres, apellidos, ci, telefono, direccion,tipolector } = req.body;
    const {id} = req.params;
  const editLector = { nombres, apellidos, ci, telefono, direccion,tipolector }
  console.log(editLector)
  try {
    const categoria = await pool.query('Update lectores  set ? where id_lector = ?',[editLector, id]);
    res.status(200).json( 'Editado con éxito!');
      
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }

};

lectorCtrl.deleteLector = async (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    try {
        const categoria =  await pool.query('Delete from lectores where id_lector = ?', id)
        res.status(200).json('Eliminado con éxito!');
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = lectorCtrl;