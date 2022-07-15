function deleteProd(id){
axios.delete(`http://localhost:8080/api/productos/${id}`)
.then((response) => {
    location.reload();
    console.log(response)
})
.catch((err)=>{
    console.log(err)
})
}
function addProd(elem){

var nombre = document.getElementById('nombre').value
var categoria = document.getElementById('categoria').value
var precio = document.getElementById('precio').value
var fotoURL = document.getElementById('fotoURL').value
var codigo = document.getElementById('codigo').value
var stock = document.getElementById('stock').value

axios.post(`http://localhost:8080/api/productos/`,{
  nombre:nombre,
  categoria:categoria,
  precio:precio,
  fotoURL:fotoURL,
  codigo:codigo,
  stock:stock
})
.then((response) => {
    console.log(response)
    location.reload();
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

//websokets
const socket = io.connect();
socket.on('messages', data => {
    console.log(data);
});

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}
