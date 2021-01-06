const pool = require("../database");

const prestamoCtrl = {};
prestamoCtrl.getPrestamos = async (req, res, next) => {
    try {
       const prestamos = await pool.query('SELECT * FROM prestamos inner join lectores on prestamos.id_lector = lectores.id_lector inner join libros on libros.id_libro = prestamos.id_libro');
      res.status(200).json(prestamos);
    } catch (error) {
        res.status(500).json(error);
    }
  
};
prestamoCtrl.getPrestamos_pendientes = async (req, res, next) => {
  try {
     const prestamos = await pool.query('SELECT * FROM prestamos inner join lectores on prestamos.id_lector = lectores.id_lector inner join libros on libros.id_libro = prestamos.id_libro where estado_prestamo = 1');
    res.status(200).json(prestamos);
  } catch (error) {
      res.status(500).json(error);
  }

};

prestamoCtrl.createPrestamo = async (req, res, next) => {
    const  { id_lector ,id_libro,fecha_prestamo, id_usuario}= req.body;
     const lista = await pool.query('select  *   from libros where  id_libro= ?', id_libro);
     const libro = lista[0]
     const total =  libro.ejemplares_libro;
     const total_prestado =  libro.prestados_libro
    const prestamoAdd = {
        id_libro ,
        id_lector,
        fecha_prestamo,
        id_usuario

    }
   
  try {
    if (total <= 0){
      res.status(500).json({message: 'EL Libro no esta Disponible'});

    } else{
      const prestamo = await pool.query('insert into prestamos set ?',[prestamoAdd]);
      const  ejemplares_libro = total - 1
      const prestados_libro = total_prestado  + 1;
      const editar_libro = { ejemplares_libro, prestados_libro}
      await pool.query('Update libros set  ? where id_libro = ? ',[editar_libro, id_libro]);
  
       res.status(200).json({status: 'Prestamo con éxito!'});
    }
 

  } catch (error) {
   res.status(500).json(error);
   console.log(error)
  }
 
};
prestamoCtrl.editPrestamo = async (req, res, next) => {
   
    const {id} = req.params;
   
    const {estado_prestamo} = req.body
    const lista = await pool.query('select  *   from prestamos where  id_prestamo= ?', id);
    const id_libros = lista[0]

    const lista_libros = await pool.query('select  *   from libros where  id_libro= ?', id_libros.id_libro);
  
    const libro = lista_libros[0]
    const total =  libro.ejemplares_libro;
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1;
    var yyyy = hoy.getFullYear();
    const fecha_devolucion = yyyy+'/'+mm+"/"+dd;
    const entregado = {estado_prestamo, fecha_devolucion}

  try {

    if (libro.ejemplares_libro = 0){
      res.status(500).json({massage: 'EL Libro no esta Disponible'});

    } else{
      const  ejemplares_libro = total + 1
  
      const editar_libro = { ejemplares_libro}
      await pool.query('Update libros set  ? where id_libro = ? ',[editar_libro, id_libros.id_libro]);
      await pool.query('Update prestamos set  ? where id_prestamo = ? ',[entregado, id]);
      res.status(200).json( 'Entrega con éxito!');
    }
   
  

  } catch (error) {
    res.status(500).json(error);
    console.log(error)

  }

};

prestamoCtrl.postRegistros = async (req, res, next) => {
  const {inicio, fin} = req.body
  console.log(req.body)
  try {
     const prestamos = await pool.query('SELECT * FROM prestamos inner join lectores on prestamos.id_lector = lectores.id_lector inner join libros on libros.id_libro = prestamos.id_libro where fecha_prestamo >= ? && fecha_prestamo <= ?', [inicio, fin]);
    res.status(200).json(prestamos);
    console.log(prestamos)
  } catch (error) {
      res.status(500).json(error);
  }

};

prestamoCtrl.getPrestamos_libros = async (req, res, next) => {
  try {
     const libros= await pool.query('SELECT  COUNT(*) AS TOTAL, titulo_libro as LIBRO , editorial_libro  as EDITORIAL, autor_libro AS AUTOR, isbn_libro, publicacion_libro, codigo_libro  FROM prestamos   inner join libros on prestamos.id_libro = libros.id_libro GROUP BY LIBRO ORDER BY TOTAL DESC');
    res.status(200).json(libros);
  } catch (error) {
      res.status(500).json(error);
  }

};
prestamoCtrl.getPrestamos_lectores = async (req, res, next) => {
  try {
     const libros= await pool.query('SELECT  *,nombres as NOMBRE, apellidos as APELLIDO ,COUNT(*) as TOTAL FROM prestamos inner join lectores on prestamos.id_lector = lectores.id_lector  GROUP BY nombres ORDER BY total DESC');
    res.status(200).json(libros);
  } catch (error) {
      res.status(500).json(error);
  }

};
module.exports = prestamoCtrl;