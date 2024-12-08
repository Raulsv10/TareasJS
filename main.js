let TipoCafe = ["Americano", "Capuchino", "Mate", "Frape"];
let total = 0;
IniciaCompra();

function IniciaCompra() {
  for (let i = 0; i <= TipoCafe.length - 1; i++) {
    if (confirm("Desea Comprar " + TipoCafe[i] + "?")) {
      let cantidad = prompt("Cuantos Cafes Requiere?");

      if (!parseInt(cantidad)) {
        alert("Favor de poner un Numero");
        cantidad = prompt("Cuantos Cafes Requiere?");
        if (!parseInt(cantidad)) {
          alert("Favor de poner un Numero tipo 1,2,3");
          cantidad = prompt("Cuantos Cafes Requiere?");
        }
        if (!parseInt(cantidad)) {
          alert("AAA Necio Que Pongas Digitos");
          cantidad = prompt("Cuantos Cafes QUIERES?");
        }
        if (!parseInt(cantidad)) {
          alert("POR NECIO SE TE PEDIRAN 5 CAFES DE CADA UNO DEL MENU");
          total = 5 * 56 + 5 * 70 + 5 * 100 + 5 * 86.5;
        }
      }
      if (total == 0) {
        validaCafe(TipoCafe[i], parseInt(cantidad));
      }

      return alert("El total de tu cuenta es: " + total);
    }
  }
}

function validaCafe(cafe, cantidad) {
  switch (cafe) {
    case "Americano":
      total = cantidad * 56;
      break;
    case "Capuchino":
      total = cantidad * 70;
      break;
    case "Mate":
      total = cantidad * 100;
      break;
    case "Frape":
      total = cantidad * 86.5;
      break;
    default:
      return alert("Hubo un error en el sistema");
  }
}
