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
item = `<tr>
            <th colspan="3" class="text-end">Total:</th>
            <th>$${total}</th>
            <th></th> 
        </tr>`;
prodCar.innerHTML = item;
