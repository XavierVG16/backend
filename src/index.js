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

// Middlewares

app.use(cors({ 
  credentials: true,
  origin: process.env.CROSS_HOST,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization' }));

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
app.use('/autenticar',require('./routes/auth.route'));
app.use('/usuario',require('./routes/usuario.route'));
app.use('/categoria',require('./routes/categorias.route'));
app.use('/lector',require('./routes/lector.route'));
app.use('/libro',require('./routes/libro.route'));
app.use('/prestamo',require('./routes/prestamo.route'));


// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
  console.log("environment:", process.env.NODE_ENV);
});