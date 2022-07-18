import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
import express from "express";
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
import session from "express-session"
import config from "./config.js";
import { productosApiRouter, productos } from "./src/routers/productos.js";
import { carritoApiRouter } from "./src/routers/carrito.js";
import { pageRouter, failRoute } from "./src/routers/page.js";
import exphbs from 'express-handlebars'
import { passport } from "./src/routers/passport.js";
import __dirname from "./src/utils/__dirname.js";
import {loggerTodos} from "./src/utils/log4js.js";
import os from 'os'
import cluster from 'cluster'
const numCPUs = os.cpus().length;


let arrProductos = []
arrProductos = productos.listarAll()
const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];

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
    layoutsDir: __dirname + "/views",
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
app.use("/", pageRouter)
app.get('*', failRoute);

io.on('connection',socket => {
    socket.emit('messages', messages);

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
 });

app.use(express.static('views'))

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

if (cluster.isMaster && config.CLUSTER == "on" ){
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()
    })

}else{
    const connectedServer = httpServer.listen(config.PORT, () => {
        loggerTodos.info(`Servidor escuchando en el puerto ${config.PORT} - PID WORKER ${process.pid}`)
    })
    connectedServer.on('error', error => loggerTodos.fatal(`Error en el servidor ${error}`))
}


