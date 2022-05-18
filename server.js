import express from "express";
import session from "express-session"
import config from "./src/config.js";
import productosApiRouter from "./src/routers/productos.js";
import carritoApiRouter from "./src/routers/carrito.js";
import { getRoot, getLogin, getSignup, postLogin, postSignup, getFaillogin, getFailsignup, getLogout, failRoute } from "./src/routers/page.js";
import exphbs from 'express-handlebars'
import { passport, checkAuthentication } from "./src/routers/passport.js";
const app = express()

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
    layoutsDir: "./src/views",
    partialsDir: "./src/views"
}))
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/productos", productosApiRouter)
app.use("/api/carrito", carritoApiRouter)
app.get('/', checkAuthentication, getRoot);
app.get('/login', getLogin)
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), postLogin)
app.get('/faillogin', getFaillogin);
app.get('/signup', getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), postSignup);
app.get('/failsignup', getFailsignup);
app.get('/logout', getLogout)
app.get('*', failRoute);

const connectedServer = app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${config.PORT}`)
})
connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))

