const ssLstCar = "lstCar";

const Producto = function (id, nombre, dsc, precio, imgN) {
  this.id = id;
  this.nombre = nombre;
  this.dsc = dsc;
  this.precio = precio;
  this.imgN = imgN;
};

const carrito = function (id, nombre, dsc, cantidad, precio) {
  this.id = id;
  this.nombre = nombre;
  this.cantidad = cantidad;
  this.precio = precio;
};

let p1 = new Producto(
  1,
  "Café Americano",
  "El es una bebida de café preparada con agua caliente y un espresso, lo que resulta en un sabor más suave y menos intenso que el espresso puro, pero con una textura ligera y aromática.",
  60,
  "Americano.jpeg"
);
let p2 = new Producto(
  2,
  "Cappuccino",
  "El cappuccino es una bebida de café italiana que mezcla espresso, leche caliente y espuma de leche en partes iguales, ofreciendo un sabor equilibrado y una textura cremosa.",
  68,
  "Cappucino.jpeg"
);
let p3 = new Producto(
  3,
  "Café Espresso",
  "El café espresso es una bebida concentrada de sabor intenso, preparada al pasar agua caliente a presión por café molido fino, con una capa de crema en la superficie.",
  73,
  "Esppresso.jpeg"
);
let p4 = new Producto(
  4,
  "Café Latte",
  "El café latte es una bebida suave que combina un shot de espresso con abundante leche caliente y una ligera capa de espuma, ofreciendo un sabor cremoso y equilibrado.",
  65,
  "Latte.jpeg"
);
let p5 = new Producto(
  5,
  "Té Verde",
  "El té verde es una infusión natural hecha de hojas no oxidadas de la planta Camellia sinensis, con un sabor suave y fresco, rico en antioxidantes y propiedades saludables.",
  53,
  "Verde.jpeg"
);
let p6 = new Producto(
  6,
  "Té Chai",
  "El té chai es una mezcla aromática de té negro con especias como canela, cardamomo, jengibre y clavo, combinado con leche y azúcar, ofreciendo un sabor cálido y especiado.",
  56,
  "Chai.jpeg"
);
let p7 = new Producto(
  7,
  "Mate",
  "Es una infusión tradicional sudamericana hecha con hojas de yerba mate, conocida por su sabor herbal y amargo, además de sus propiedades energizantes.",
  80,
  "Mate.jpeg"
);
let p8 = new Producto(
  8,
  "Frappe",
  "El frappé es una bebida fría y espumosa hecha a base de café, hielo y, a menudo, leche o crema, mezclados hasta obtener una textura cremosa y refrescante.",
  120,
  "Frappe.jpeg"
);

let lstProductos = [p1, p2, p3, p4, p5, p6, p7, p8];
let lstCarrito = [];

const valor = [];
// sessionStorage.setItem(ssLstCar, valor);

function recuperacarrito() {
  const valor = sessionStorage.getItem(ssLstCar);
  if (valor) {
    console.log(`La variable "${ssLstCar}" tiene información: ${valor}`);
    let lst = localStorage.getItem(ssLstCar);
    lst !== null ? (lstCarrito = lst) : (lstCarrito = []);
  } else {
    console.log(`La variable "${ssLstCar}" no tiene información o no existe.`);
    lstCarrito = [];
  }
}

const prod = document.querySelector(".lstproduct");
// const prev = document.querySelector("#previous");
prod.innerHTML = "";
let item = "";
lstProductos.forEach((element) => {
  //console.log(element.nombre);
  item += `<div class="card menu shadow-sm p-2 m-2" style="width: 24rem;">
            <img src="./asset/img/${element.imgN}" alt="${element.nombre}">
            <div class="content">
                <h3>${element.nombre}</h3>
                <p class="card-body">${element.dsc}</p>
                <p class="precio">$${element.precio}</p>
            </div>
            <div class="container d-flex flex-nowrap justify-content-center" id="${element.id}">
                <div class="input-group txtCantidad">
                    <button class="btn btn-outline-info btn-sm btn-prev" id="previous"> - </button>
                    <input type="text" class="form-control text-center txt-cantidad" id="cantidad" value="1">
                    <button class="btn btn-outline-info btn-sm btn-next" id="next"> + </button>
                </div>&emsp;
                <button type="button" class="btn btn-outline-success btn-car">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        </div>`;

  prod.innerHTML = item;
});

recuperacarrito();

document.querySelectorAll(".btn-prev").forEach((button) => {
  button.addEventListener("click", function () {
    let inputField = this.nextElementSibling;
    let value = parseInt(inputField.value) || 1;
    if (value > 1) inputField.value = value - 1;
  });
});

document.querySelectorAll(".btn-next").forEach((button) => {
  button.addEventListener("click", function () {
    let inputField = this.previousElementSibling;
    let value = parseInt(inputField.value) || 1;
    if (value >= 1) inputField.value = value + 1;
  });
});

document.querySelectorAll(".txt-cantidad").forEach((button) => {
  button.addEventListener("change", function () {
    this.value = parseInt(this.value) || 1;
  });
});

document.querySelectorAll(".btn-car").forEach((button) => {
  button.addEventListener("click", function () {
    let id = this.parentElement.id;
    let item = lstProductos.filter((items) => items.id == id);
    const card = event.target.closest(".card");
    const txtCantidad = card.querySelector(".txt-cantidad");
    const cantidad = parseInt(txtCantidad.value);
    if (lstCarrito.length === 0)
      lstCarrito.push(
        new carrito(
          item[0].id,
          item[0].nombre,
          item[0].dsc,
          cantidad,
          item[0].precio
        )
      );
    else {
      let flag = false;
      lstCarrito.forEach((item) => {
        if (item.id == id) {
          item.cantidad = cantidad;
          flag = true;
        }
      });
      if (!flag)
        lstCarrito.push(
          new carrito(
            item[0].id,
            item[0].nombre,
            item[0].dsc,
            cantidad,
            item[0].precio
          )
        );
    }
    Toastify({
      text: "producto en carrito",
      duration: 3000,
    }).showToast();
  });
});

const button = document.getElementById("btn-carshop");

button.addEventListener("click", () => {
  if (lstCarrito.length === 0) {
    alert("Debe seleccionar algo del carrito");
    return;
  }
  sessionStorage.setItem("lstCar", JSON.stringify(lstCarrito));
  const recuperarDatosDelFormulario = JSON.parse(
    sessionStorage.getItem("lstCar")
  );
  console.log(recuperarDatosDelFormulario);
  window.location.href = "./Carrito.html";
});
