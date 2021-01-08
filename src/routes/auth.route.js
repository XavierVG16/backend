const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const router = express.Router();
const auth = require("../controllers/auth.controller");


router.get('/', auth.signin)
router.get('/user/:id', auth.User);

module.exports = router;
