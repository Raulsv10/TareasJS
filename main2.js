const recuperacarrito = JSON.parse(sessionStorage.getItem("lstCar"));
// console.log(recuperacarrito);

const prod = document.querySelector(".lstcarrito");
prod.innerHTML = "";
let item = "";
let subTot = 0;
let total = 0;
recuperacarrito.forEach((element) => {
  subTot = element.cantidad * element.precio;
  total += total + subTot;
  item += `<tr>
            <td>${element.nombre}</td>
            <td>${element.cantidad}</td>
            <td>${element.precio}</td>
            <td>${subTot}</td>
        </tr>`;

  prod.innerHTML = item;
});

const prodCar = document.querySelector(".Total");
prodCar.innerHTML = "";
const base = "MXN";
const monedas = [
  { tipo: "USD", icono: "$" },
  { tipo: "EUR", icono: "€" },
  { tipo: "JPY", icono: "¥" },
];
totales(monedas);
function totales(monedas) {
  item = `<tr>
    <th colspan="3" class="text-end">Total MXN:</th>
    <th>$ ${total}</th>
    <th></th> 
</tr>`;
  prodCar.innerHTML = item;
  monedas.forEach((item) => {
    const target = item.tipo;
    // console.log(target);
    fetch(`https://api.frankfurter.app/latest?from=${base}&to=${target}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[target];
        // console.log(`1 ${base} ${target} = ${rate} ${total} ${rate * total}`);
        item = `<tr>
            <th colspan="3" class="text-end">Total ${target}:</th>
            <th>${item.icono} ${rate * total}</th>
            <th></th> 
        </tr>`;
        prodCar.innerHTML += item;
      })
      .catch((error) => console.error("Error:", error));
  });
}

const button = document.querySelector(".btn-comprar");

button.addEventListener("click", () => {
  Swal.fire({
    title: "Felicidades has terminado tu compra!!",
    text: "Ahora tengo todos tus datos bancarios y me robare tu dinero",
    icon: "success",
  }).then(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: `Se te ha echo un cargo por: $50,000 USD`,
    });
  });
});
