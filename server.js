import express from "express";
import session from "express-session"
import config from "./src/config.js";
import {productosApiRouter,productos} from "./src/routers/productos.js";
import {carritoApiRouter} from "./src/routers/carrito.js";
import {pageRouter,failRoute} from "./src/routers/page.js";
import exphbs from 'express-handlebars'
import {passport} from "./src/routers/passport.js";
const app = express()

import path from 'path';
import {fileURLToPath} from 'url';
let arrProductos = []
arrProductos = productos.listarAll()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
    layoutsDir:  __dirname + "/views",
    partialsDir: __dirname + "/views"
}))
app.set("views", "./views");
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use("/api/productos", productosApiRouter)
app.use("/api/carrito", carritoApiRouter)
app.use("/",pageRouter)
app.get('*',failRoute);


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const connectedServer = app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${config.PORT}`)
})
connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))

