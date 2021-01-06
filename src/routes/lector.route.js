const express = require("express");
const router = express.Router();
const lector = require("../controllers/lector.controller");

router.get('/', lector.getLectores)
router.post('/', lector.createLector)
router.get('/:id', lector.getLector)
router.put('/:id', lector.editLector);
router.delete('/:id', lector.deleteLector)
module.exports = router;
