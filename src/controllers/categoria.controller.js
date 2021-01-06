const pool = require("../database");

const categoriaCtrl = {};
categoriaCtrl.getCategorias = async (req, res, next) => {
    try {
        const categorias = await pool.query('select * from categoria');
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json(error);
    }
  
};

categoriaCtrl.createCategoria = async (req, res, next) => {
  const {nombre} = req.body;
  const newCategoria = {nombre}
  try {
    const categorias = await pool.query('select * from categoria where nombre = ?',nombre);
    if (categorias.length == 0) {
        const categoria  = await pool.query('insert into categoria set ?', newCategoria);
        res.status(200).json('Guardado con éxito!');
    } else {
        res.status(500).json({message:'La categoria ya existe!'});
    }
     
  } catch (error) {
    res.status(500).json({message:'No se pudo guardar la categoria'});
  }
 
};
categoriaCtrl.getCategoria = async (req, res, next) => {
    const {id} = req.params;
    try {
        const categorias = await pool.query('select * from categoria where id = ?',id);
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json(error);
    }
  
};

categoriaCtrl.editCategoria = async (req, res, next) => {
    const {nombre} = req.body;
    const {id} = req.params;
    console.log(nombre, id)

  const editCategoria = {nombre}
  try {
    const categoria = await pool.query('Update  categoria set ? where id = ? ',[ editCategoria, id]);
    res.status(200).json('Editado con éxito!');
    console.log(categoria)

  } catch (error) {
    res.status(500).json(error,'No se pudo guardar la categoria');
    console.log(error)

  }

};

categoriaCtrl.deleteCategoria = async (req, res, next) => {
    const {id} = req.params;
    try {
        const categoria =  await pool.query('Delete from categoria where id = ?', id)
        res.status(200).json( 'Eliminado con éxito!');
    } catch (error) {
        res.status(500).json(error);
    }
    

};

module.exports = categoriaCtrl;