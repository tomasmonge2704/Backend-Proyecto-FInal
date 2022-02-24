const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiProductos = require('./routes/productos');
const apiCarritos = require('./routes/carritos');
app.use("/api/productos", apiProductos);
app.use("/api/carrito", apiCarritos)


//PORT 
const PORT = 8080 || process.env.PORT
app.listen(PORT,()=>{
  console.log('server on')
})