function deleteProd(id) {
  axios
    .delete(`http://localhost:8080/api/productos/${id}`)
    .then((response) => {
      location.reload();
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
function addProd(elem) {
  var nombre = document.getElementById("nombre").value;
  var categoria = document.getElementById("categoria").value;
  var precio = document.getElementById("precio").value;
  var fotoURL = document.getElementById("fotoURL").value;
  var codigo = document.getElementById("codigo").value;
  var stock = document.getElementById("stock").value;
  var cantidad = document.getElementById("cantidad").value;
  axios
    .post(`http://localhost:8080/api/productos/`, {
      nombre: nombre,
      categoria: categoria,
      precio: precio,
      fotoURL: fotoURL,
      codigo: codigo,
      stock: stock,
      cantidad:cantidad
    })
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}
function addToCart(id) {
  axios
    .get(`http://localhost:8080/api/productos/${id}`)
    .then((response) => {
      const elem = response.data[0];
      axios
        .post(`http://localhost:8080/api/carrito/${user}/productos`, {
          id: elem.id,
          nombre: elem.nombre,
          precio: elem.precio,
          fotoURL: elem.fotoURL,
          codigo: elem.codigo,
          stock: elem.stock,
          cantidad:elem.cantidad
        })
        .then((response) => {

          console.log(response);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function filtrarCategoria() {
  var categoria = document.getElementById("exampleFormControlSelect1").value;
  window.location.href = `/productos/${categoria}`;
}
function filtrarId() {
  var id = document.getElementById("exampleFormControlSelect2").value;
  window.location.href = `/producto/${id}`;
}
