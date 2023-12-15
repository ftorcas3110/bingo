let numero;
let aleatorio;
let usados = [];
let contadorVictorias = [0, 0];
contador = 0;

//rellenar cartones al cargar la ventana

window.onload = crearCarta;

//funcion para rellenar los cartones

function crearCarta() {

    let cartones = document.getElementsByClassName("carton");

    for (let carton = 0; carton < 2; carton++) {

        for (let i = 0; i < 15; i++) {

            numero = document.createElement("div");
            numero.className = "valor";
            aleatorio = Math.floor(Math.random() * 90) + 1;
            numero.innerHTML = aleatorio;

            if (!usados.includes(aleatorio)) {

                cartones[carton].appendChild(numero);
                usados.push(aleatorio);

            } else {

                i--;

            }

        }

        usados = [];
    }

}

//evento de botón, iniciar juego

let boton = document.getElementById("numero");
let bolas = document.getElementsByClassName("salida");

boton.addEventListener("click", () => {
    boton.id = "";
    intervaloBolas = setInterval(() => {

        numero = document.createElement("div");
        numero.className = "valor";
        aleatorio = Math.floor(Math.random() * 90) + 1;
        numero.innerHTML = aleatorio;

        if (!usados.includes(aleatorio)) {

            bolas[0].appendChild(numero);
            usados.push(aleatorio);
        } else {

            aleatorio = repetido();
            numero.innerHTML = aleatorio;
            bolas[0].appendChild(numero);
            usados.push(aleatorio);
        }

        boton.className = "valor";
        boton.innerHTML = aleatorio;
        if (contadorVictorias[0] + contadorVictorias[1] != 29) {
            acierto(aleatorio);
        }
        
        contador++
        if (contador == 90) {
            clearInterval(intervaloBolas);
        }

    }, 1000);
});


//funcion comprobante de números acertados

function acierto(numero) {
    let carton = document.getElementsByClassName("jugador");
    let variableComprobante;

    for (let i = 0; i < carton.length; i++) {
        variableComprobante = carton[i].getElementsByClassName("valor");
        for (let j = 0; j < variableComprobante.length; j++) {
            if (variableComprobante[j].innerHTML == numero) {
                variableComprobante[j].className = "numeroCorrecto";
                contadorVictorias[i]++;
            }

            if (contadorVictorias[0] + contadorVictorias[1] == 30) {
                setTimeout(() => {
                    clearInterval(intervaloBolas);
                    window.alert("Empate!");
                }, 20);
                break;
            }

            if (contadorVictorias[i] == 15) {
                    setTimeout(() => {
                        clearInterval(intervaloBolas);
                        window.alert(`Gana ` + carton[i].firstChild.nextSibling.innerHTML);
                    }, 20);
                    break;
                }

            }

        }

    }



//funcion comprobante de repetidos

function repetido() {
    let nuevoNumero = Math.floor(Math.random() * 90) + 1;

    if (usados.includes(nuevoNumero)) {
        return repetido();
    } else {
        return nuevoNumero;
    }

}