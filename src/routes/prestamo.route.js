const express = require("express");
const router = express.Router();
const prestamo = require("../controllers/prestamo.controller");

router.get('/', prestamo.getPrestamos)
router.get('/pendiente', prestamo.getPrestamos_pendientes)
router.post('/', prestamo.createPrestamo)
router.post('/registro', prestamo.postRegistros)
router.get('/lectores', prestamo.getPrestamos_lectores)
router.get('/libros', prestamo.getPrestamos_libros)

router.put('/:id', prestamo.editPrestamo);

module.exports = router;