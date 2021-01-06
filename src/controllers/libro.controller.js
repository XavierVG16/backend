const pool = require("../database");

const libroCtrl = {};
libroCtrl.getLibros = async (req, res, next) => { 
    try {
        const libros = await pool.query('SELECT * , titulo_libro as LIBRO , editorial_libro  as EDITORIAL, autor_libro AS AUTOR FROM libros inner join categoria on libros.id_facultad = categoria.id');
        res.status(200).json(libros);
    } catch (error) {
        res.status(500).json(error);
    }
  
};

libroCtrl.createLibro = async (req, res, next) => {
  const{ codigo_libro, isbn_libro,titulo_libro, stock_libro, autor_libro, editorial_libro,ediccion_libro, publicacion_libro,  idioma_libro,ejemplares_libro,facultad} = req.body;
  const fac = await pool.query('select * from categoria where nombre = ?',facultad);
  fac.forEach(element => {
    id_facultad = element.id;
  });
  const newLibro = {codigo_libro, isbn_libro,titulo_libro, stock_libro, autor_libro, editorial_libro,ediccion_libro, publicacion_libro,  idioma_libro,ejemplares_libro,id_facultad}
  try {
    const libros = await pool.query('select * from libros where isbn_libro = ?',isbn_libro);
    if (libros.length == 0) {
        const lector  = await pool.query('insert into libros set ?', newLibro);
        res.status(200).json('Guardado con éxito!');
    } else {
        res.status(200).json( 'El libro ya existe!');
    }
     
  } catch (error) {
    res.status(500).json(error);
  }
 
};
libroCtrl.getLibro = async (req, res, next) => {
    const {id} = req.params;
    try {
        const libro = await pool.query('select * from libros where id_libro = ?',id);
        res.status(200).json(libro);
    } catch (error) {
        res.status(500).json(error);
    }
  
};

libroCtrl.editLibro = async (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    const{ codigo_libro, isbn_libro,titulo_libro, stock_libro, autor_libro, editorial_libro,ediccion_libro, publicacion_libro,  idioma_libro,ejemplares_libro,facultad} = req.body;
    const fac = await pool.query('select * from categoria where nombre = ?',facultad);
    fac.forEach(element => {
      id_facultad = element.id;
    });
  const editLibro = { codigo_libro, isbn_libro,titulo_libro, stock_libro, autor_libro, editorial_libro,ediccion_libro, publicacion_libro,  idioma_libro,ejemplares_libro,id_facultad }
  try {
    const categoria = await pool.query('Update libros  set ? where id_libro = ?',[editLibro,id]);
    res.status(200).json('Editado con éxito!');
      
  } catch (error) {
    res.status(500).json(error);
  }

};

libroCtrl.deleteLibro = async (req, res, next) => {
    const {id} = req.params;
    try {
        const categoria =  await pool.query('Delete from libros where id_libro = ?', id)
        res.status(200).json( 'Eliminado con éxito!');
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = libroCtrl;