const { Router } = require('express');
const router = Router();
const usuario = require('../controllers/usuario.controller');

router.get('/', usuario.getUsuarios);
router.post('/', usuario.createUsuario);
router.get('/:id', usuario.getUsuario);
router.put('/:id', usuario.editUsuario);
router.delete('/:id', usuario.deleteUsuario);

module.exports = router;