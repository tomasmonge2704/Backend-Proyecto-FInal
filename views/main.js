function deleteProd(id){
axios.delete(`http://localhost:8080/api/productos/${id}`)
.then((response) => {
    console.log(response)
})
.catch((err)=>{
    console.log(err)
})
}
function addProd(elem){

var nombre = document.getElementById('nombre').value
var precio = document.getElementById('precio').value
var fotoURL = document.getElementById('fotoURL').value
var codigo = document.getElementById('codigo').value
var stock = document.getElementById('stock').value

axios.post(`http://localhost:8080/api/productos/`,{
  nombre:nombre,
  precio:precio,
  fotoURL:fotoURL,
  codigo:codigo,
  stock:stock
})
.then((response) => {
    console.log(response)
})
.catch((err)=>{
    console.log(err)
})
}
function addToCart(id) {

axios.get(`http://localhost:8080/api/productos/${id}`)
.then((response) => {
        const elem = response.data[0]
        axios.post(`http://localhost:8080/api/carrito/${user}/productos`,{
  id:elem.id,
  nombre:elem.nombre,
  precio:elem.precio,
  fotoURL:elem.fotoURL,
  codigo:elem.codigo,
  stock:elem.stock
})
      .then((response) => {
        console.log(response)
    })
    })
.catch((err) => {
        console.log(err)
    });
}