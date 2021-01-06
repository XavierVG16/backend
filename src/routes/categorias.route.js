const express = require("express");
const router = express.Router();
const categoria = require("../controllers/categoria.controller");

router.get('/', categoria.getCategorias)
router.post('/', categoria.createCategoria)
router.get('/:id', categoria.getCategoria)
router.put('/:id', categoria.editCategoria);
router.delete('/:id', categoria.deleteCategoria)
module.exports = router;
