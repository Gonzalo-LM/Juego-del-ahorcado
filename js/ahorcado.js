var ingresar_palabra = document.querySelector("#palabra");
var ingresar_letra = document.querySelector("#letra");
var adivinar_palabra = document.querySelector("#adivinar");

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

var adivinar = [];
var oracion = [];
var palabra = "";
var frase = "";
var intentos = 5;

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
            //alert("Perdiste todos tus intentos");
            btn_limpiar.onclick = location.reload();
        }
    }
    
}

function enviarPalabra(){
    if(adivinar.length == 0){
        adivinar = ingresar_palabra.value.toString().split("");
        palabra = ingresar_palabra.value.toString();
        for(var p = 0; p < adivinar.length; p++){
            oracion.push(" ");
        }
        ingresar_palabra.value = "";
    }else{
        alert("ya hay una palabra por adivinar");
    }
    
}

function adivinarPalabra(){
    let texto = ingresar_letra.value.toString();
    if(adivinar.length != 0){
        for(var i = 0; i < adivinar.length; i++){
            validar(texto);
            break;
        }
        adivinar_palabra.value = oracion.toString().replaceAll(",", "");
        /*if(palabra == adivinar_palabra.value){
            alert("Ganaste!!! lograste adivinar la palabra");
            btn_limpiar.onclick = location.reload();
        }*/
    }
}


btn_empezar.onclick = enviarPalabra;
btn_ingresar.onclick = adivinarPalabra;