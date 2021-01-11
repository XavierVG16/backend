const express = require('express');
const cors = require('cors');
const MysQlStore = require("express-mysql-session");
const session = require("express-session");
const path = require("path");
const multer = require("multer");

const app = express();
require("dotenv").config();

require('./database');
const { database } = require("./keys");
// Settings

app.set('port', process.env.PORT || 3000);
/**
 * 
 * // Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${process.env.CROSS_HOST}`);

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options(`${process.env.CROSS_HOST}`, (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});





  
app.use(function (req, res, next){
  var whileList = [
      'https://sistemabiblioteca-vl.herokuapp.com',
      'http://localhost:4200'

  ];
  var origen = req.headers.origin;
  if(whileList.indexOf(origen)>= -1){
      res.setHeader('Access-Control-Allow-Origin', origen);

  }
  res.setHeader('Access-Control-Allow-Header', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();

})
 */
// Middlewares

var whitelist = ['http://localhost:4200', 'http://localhost:4202', 'https://sistemabiblioteca-vl.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 
app. use(cors({origin: process.env.CROSS_HOST,
  reflightContinue: true
 }));


 
app.use(express.json());
app.use(
  session({
    secret: "xavier",
    resave: false,
    saveUninitialized: false,
    store: new MysQlStore(database),
    cookie: { secure: true }
  })
);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));



// Routes
app.use('/api/autenticar',require('./routes/auth.route'));
app.use('/api/usuario',require('./routes/usuario.route'));
app.use('/api/categoria',require('./routes/categorias.route'));
app.use('/api/lector',require('./routes/lector.route'));
app.use('/api/libro',require('./routes/libro.route'));
app.use('/api/prestamo',require('./routes/prestamo.route'));


// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
  console.log("environment:", process.env.NODE_ENV);
});