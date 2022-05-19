## Available Scripts
Comando para instalar dependencias
### `npm install`

comando para iniciar el servidor
### `npm start`
## Project structure

``` 
├── # src
│    ├── #contenedores
│    │   └──ContenedorArchivo.js
│    │   └──ContenedorFirebase.js
│    │   └──ContenedorMongoDb.js
│    ├── #daos
│    │   └──carritos
│    │   └──productos
│    ├── #models
│    │   └── carrito.js
│    │   └──productos.js
│    ├── #routers
│    │    └──carrito.js
│    │    └──productos.js
│    └── #config.js   
├── # carrito.json
├── # Productos.json
│   
└── server.js
   

```
## login
POST:http://localhost:8080/login
para hacerlo desde postman usar formato JSON:
{
    "username":"sad",
    "password":"123"
}
para cambiar la base de datos modificar "DB", en archivo config.js
### `DB:"firebase" o "mongo"`