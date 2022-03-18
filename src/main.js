import express from "express";
import config from './config.js';
import productosApiRouter from "./routers/productos.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/productos", productosApiRouter)


 const connectedServer = app.listen(config.PORT, () =>{
     console.log(`Servidor escuchando en el puerto ${config.PORT}`)
 })
  connectedServer.on('error', error=> console.log(`Error en el servidor ${error}`))