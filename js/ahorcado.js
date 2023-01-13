var ingresar_palabra = document.querySelector("#palabra");
var ingresar_letra = document.querySelector("#letra");
var adivinar_palabra = document.querySelector("#adivinar");
var cantidad_palabra = document.querySelector("#cantidad");
var ingresar_oracion = document.querySelector("#oracion");

var btn_empezar = document.querySelector("#btnempezar");
var btn_ingresar_letra = document.querySelector("#btnIngresarLetra");
var btn_ingresar_oracion = document.querySelector("#btnIngresarOracion");
var btn_cambiar_letra = document.querySelector("#btncambiarLetra");
var btn_cambiar_oracion = document.querySelector("#btncambiarOracion");
var btn_limpiar = document.querySelector("#limpiar");

var div_letra = document.querySelector("#campo_letra");
var div_oracion = document.querySelector("#campo_oracion");

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


div_oracion.style.display = "none";
div_letra.style.display = "block";

ingresar_letra.disabled = true;
btn_ingresar_letra.disabled = true;
btn_cambiar_letra.disabled = true;

ingresar_palabra.focus();

var adivinar = [];
var oracion = [];
var palabra = "";
var frase = "";
var intentos = 5;

function activar_desactivar(){
    if(palabra != adivinar_palabra.value){
        ingresar_letra.disabled = false;
        btn_ingresar_letra.disabled = false;
        btn_cambiar_letra.disabled = false;
    }else{
        ingresar_letra.disabled = true;
        btn_ingresar_letra.disabled = true;
        btn_cambiar_letra.disabled = true;
        ingresar_oracion.disabled = true;
        btn_ingresar_oracion.disabled = true;
        btn_cambiar_oracion.disabled = true;
    }
}

function cambiarCampoLetra(){
    div_oracion.style.display = "block";
    div_letra.style.display = "none";
    ingresar_oracion.value = "";
    ingresar_oracion.focus();
}

function cambiarCampoOracion(){
    div_oracion.style.display = "none";
    div_letra.style.display = "block";
    ingresar_letra.value = "";
    ingresar_letra.focus();
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
        ingresar_letra.value = "";
        ingresar_letra.focus();
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
            activar_desactivar();
        }
        ingresar_letra.value = "";
        ingresar_letra.focus();
    }
    adivinar_palabra.value = oracion.toString().replaceAll(",", "");
}

function enviarPalabra(){
    if(ingresar_palabra.value != ""){
        if(adivinar.length == 0){
            var tilde = ingresar_palabra.value.replaceAll("á", "a").replaceAll("é", "e")
            .replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u");
            adivinar = tilde.toLowerCase().split("");
            palabra = tilde.toLowerCase();
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
            activar_desactivar();
            ingresar_palabra.value = "";
            ingresar_letra.focus();
        }else if( adivinar_palabra.value == palabra){
            alert("Ya adivinaste la palabra, juega otra vez");
            ingresar_palabra.value = "";
        }else if(( adivinar_palabra.value != palabra) && (intentos == 0)){
            alert("Ya perdiste todos tus intentos, juega otra vez");
            ingresar_palabra.value = "";
        }else if(( adivinar_palabra.value != palabra) && (intentos != 0)){
            alert("Ya hay una palabra por adivinar");
            ingresar_palabra.value = "";
            ingresar_letra.focus();
        }
    }else{
        alert("No has ingresado nada");
        ingresar_palabra.focus();
    }
    
}

function adivinarPalabra(){
    let texto = ingresar_letra.value.toLowerCase().replaceAll("á", "a").replaceAll("é", "e")
    .replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u");
    if(texto != ""){
        if(adivinar.length != 0){
            for(var i = 0; i < adivinar.length; i++){
                validar(texto);
                break;
            }
        }
    }else{
        alert("no has ingresado la letra");
        ingresar_letra.focus();
    }
    if(palabra == adivinar_palabra.value){
        alert("Ganaste!!! lograste adivinar la palabra");
        activar_desactivar();
    }
}

function adivinarPalabraCompleta(){
    let textocompleto = ingresar_oracion.value.toLowerCase().replaceAll("á", "a").replaceAll("é", "e")
    .replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u");
    if(textocompleto != ""){
        if(palabra == textocompleto){
            adivinar_palabra.value = textocompleto;
            alert("Ganaste!!! lograste adivinar la palabra");
            activar_desactivar();
        }else{
            validar(textocompleto);
        }
    }else{
        alert("no has ingresado la oracion");
        ingresar_oracion.focus();
    }
}


btn_empezar.onclick = enviarPalabra;
btn_ingresar_letra.onclick = adivinarPalabra;
btn_ingresar_oracion.onclick = adivinarPalabraCompleta;
btn_cambiar_letra.onclick = cambiarCampoLetra;
btn_cambiar_oracion.onclick = cambiarCampoOracion;