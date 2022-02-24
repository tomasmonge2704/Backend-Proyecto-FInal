const express = require("express");
const app = express();
const middlewares = require("./controllers/middlewares")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiProductos = require('./routes/productos');
const apiCarritos = require('./routes/carritos');
app.use("/api/productos", apiProductos);
app.use("/api/carrito", apiCarritos)

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);
app.use(middlewares.isAdmin);
//PORT 
const PORT = 8080 || process.env.PORT
app.listen(PORT,()=>{
  console.log('server on')
})