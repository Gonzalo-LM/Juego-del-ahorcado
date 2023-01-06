var ingresar_palabra = document.querySelector("#palabra");
var ingresar_letra = document.querySelector("#letra");
var adivinar_palabra = document.querySelector("#adivinar");
var cantidad_palabra = document.querySelector("#cantidad");

var btn_empezar = document.querySelector("#btnempezar");
var btn_ingresar = document.querySelector("#btnIngresar");
var btn_limpiar = document.querySelector("#limpiar");

var cuerpo = document.querySelector("#cuerpo");
var brazo_D = document.querySelector("#brazo_D");
var brazo_I = document.querySelector("#brazo_I");
var pierna_D = document.querySelector("#pierna_D");
var pierna_I = document.querySelector("#pierna_I");

cuerpo.style.visibility = "hidden";
brazo_D.style.visibility = "hidden";
brazo_I.style.visibility = "hidden";
pierna_D.style.visibility = "hidden";
pierna_I.style.visibility = "hidden";

ingresar_letra.disabled = true;
btn_ingresar.disabled = true;

var adivinar = [];
var oracion = [];
var palabra = "";
var frase = "";
var intentos = 5;

function desactivar(){
    ingresar_letra.disabled = true;
    btn_ingresar.disabled = true;
}

function validar(letra){
    frase = "";
    if(adivinar.includes(letra)){
        for(var x = 0; x < adivinar.length; x++){
            if(adivinar[x] == letra){
                adivinar.splice(x, 1, " ");
                oracion.splice(x, 1, letra)
            }else{
                oracion = oracion;
            }
        }
    }else{
        oracion = oracion;
        intentos -= 1;
        if(intentos == 4){
            cuerpo.style.visibility = "visible";
        }
        else if(intentos == 3){
            brazo_D.style.visibility = "visible";
        }
        else if(intentos == 2){
            brazo_I.style.visibility = "visible";
        }
        else if(intentos == 1){
            pierna_D.style.visibility = "visible";
        }
        else if(intentos == 0){
            pierna_I.style.visibility = "visible";
            alert("Perdiste todos tus intentos");
            desactivar();
        }
    }
    adivinar_palabra.value = oracion.toString().replaceAll(",", "");
}

function enviarPalabra(){
    if(adivinar.length == 0){
        ingresar_letra.disabled = false;
        btn_ingresar.disabled = false;
        adivinar = ingresar_palabra.value.toLowerCase().split("");
        palabra = ingresar_palabra.value.toLowerCase();
        cantidad = palabra.replaceAll(" ", "");
        cantidad_palabra.value = cantidad.length;
        for(var p = 0; p < adivinar.length; p++){
            if(adivinar[p] != " "){
                oracion.push("_");
            }else{
                oracion.push(" ");
            }
            adivinar_palabra.value = oracion.toString().replaceAll(",", "");
        }
        ingresar_palabra.value = "";
    }else if( adivinar_palabra.value == palabra){
        alert("Ya adivinaste la palabra, juega otra vez");
    }else if(( adivinar_palabra.value != palabra) && (intentos == 0)){
        alert("Ya perdiste todos tus intentos, juega otra vez");
    }else if(( adivinar_palabra.value != palabra) && (intentos != 0)){
        alert("Ya hay una palabra por adivinar");
    }
}

function adivinarPalabra(){
    let texto = ingresar_letra.value.toLowerCase();
    if(adivinar.length != 0){
        for(var i = 0; i < adivinar.length; i++){
            validar(texto);
            break;
        }
    }
    if(palabra == adivinar_palabra.value){
        alert("Ganaste!!! lograste adivinar la palabra");
        desactivar();
    }
}


btn_empezar.onclick = enviarPalabra;
btn_ingresar.onclick = adivinarPalabra;