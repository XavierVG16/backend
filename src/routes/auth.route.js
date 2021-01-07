const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const router = express.Router();
const auth = require("../controllers/auth.controller");

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
router.post('/', auth.signin)
router.get('/user/:id', auth.User);

module.exports = router;
