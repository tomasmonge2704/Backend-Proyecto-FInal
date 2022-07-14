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
│    │    └──page.js
│    │    └──passport.js
│    │    └──productos.js
│    ├── #views 
│    └── #config.js   
├── # carrito.json
├── # Productos.json
│   
└── server.js
   

```
## login por POSTMAN
POST:http://localhost:8080/login
para hacerlo desde postman usar formato JSON:
{
    "username":"sad",
    "password":"123"
}
## base de datos
para cambiar la base de datos modificar "DB", en archivo config.js
### `DB:"firebase" o "mongo"`
## Modo Cluster
para cambiar a modo Cluster modificar "CLUSTER" y poner "on", en archivo config.js
### `CLUSTER:"on" o "no"`