import express from "express";
import config from "./src/config.js";
import productosApiRouter from "./src/routers/productos.js";
import carritoApiRouter from "./src/routers/carrito.js";
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/productos", productosApiRouter)
app.use("/api/carrito", carritoApiRouter)

 const connectedServer = app.listen(config.PORT, () =>{
     console.log(`Servidor escuchando en el puerto ${config.PORT}`)
 })
  connectedServer.on('error', error=> console.log(`Error en el servidor ${error}`))

