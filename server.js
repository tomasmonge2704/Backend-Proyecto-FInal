import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
import express from "express";
import config from "./src/config.js";
import productosApiRouter from "./src/routers/productos.js";
import carritoApiRouter from "./src/routers/carrito.js";
import pageRouter from "./src/routers/page.js";
import exphbs from 'express-handlebars'
const app = express()


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

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/productos", productosApiRouter)
app.use("/api/carrito", carritoApiRouter)
app.use("/", pageRouter)
 const connectedServer = app.listen(config.PORT, () =>{
     console.log(`Servidor escuchando en el puerto ${config.PORT}`)
 })
  connectedServer.on('error', error=> console.log(`Error en el servidor ${error}`))

