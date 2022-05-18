import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
import express from "express";
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
import config from "./src/config.js";
import productosApiRouter from "./src/routers/productos.js";
import carritoApiRouter from "./src/routers/carrito.js";
import {getRoot,getLogin,getSignup,postLogin,postSignup,getFaillogin,getFailsignup,getLogout,failRoute} from "./src/routers/page.js";
import exphbs from 'express-handlebars'
const app = express()
//mongo
const mongoose = require('mongoose')
var bCrypt = require('bcryptjs');
const url = `mongodb+srv://tomas2:1roZJIVtj5JnG5HH@cluster0.nmb6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
const User = mongoose.model("User", new mongoose.Schema({ username: String,password: String,email: String,nombre: String, apellido: String }));
//mongo fin
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 10000000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))
app.use(express.static('views'))
app.engine("hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: null,
    layoutsDir:"./src/views",
    partialsDir:"./src/views"
}))
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }))
//passport
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err)
                return done(err);

            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false);
            }

            return done(null, user);
        });
    })
);

//singup
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ 'username': username }, function (err, user) {

            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }

            if (user) {
                console.log('User already exists');
                return done(null, false)
            }
            console.log(req.body,username,password)
            const newUser = {
                username: username,
                password: createHash(password),
                email: req.body.email,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
            }
            User.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Error in Saving user: ' + err);
                    return done(err);
                }
                console.log(user)
                console.log('User Registration succesful');
                return done(null, userWithId);
            });
        });
    })
)

function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
}
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

app.use(passport.initialize());
app.use(passport.session());
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/login")
    }
}
//fin passport
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/productos", productosApiRouter)
app.use("/api/carrito", carritoApiRouter)
app.get('/',checkAuthentication,getRoot);
app.get('/login',getLogin)
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }),postLogin)
app.get('/faillogin',getFaillogin);
app.get('/signup',getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }),postSignup);
app.get('/failsignup',getFailsignup);
app.get('/logout',getLogout)
app.get('*', failRoute);
 const connectedServer = app.listen(config.PORT, () =>{
     console.log(`Servidor escuchando en el puerto ${config.PORT}`)
 })
  connectedServer.on('error', error=> console.log(`Error en el servidor ${error}`))

