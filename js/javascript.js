const API_BASE_URL = "https://openexchangerates.org/api/";
const API_APP_ID = "e77f99c02f404d34a3631b67223d85e5";
const API_MXN_CURRENCY = "MXN";
var pesos_a_dolares = true;

window.onload = function(){
    actualizarImagenesMonedas();
}

function intercambiarTipoConversion(){
    pesos_a_dolares = !pesos_a_dolares;
    actualizarImagenesMonedas();
}

function actualizarImagenesMonedas(){
    var title1 = document.getElementById("title1");
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");

    if(pesos_a_dolares){
        title1.innerText = "Conversor de Divisas Peso Mexicano a Dólar";
        img1.src = "img/mexico.png";
        img2.src = "img/usa.png";
    } else {
        title1.innerText = "Conversor de Divisas Dólar a Peso Mexicano";
        img1.src = "img/usa.png";
        img2.src = "img/mexico.png";
    }
}
function convertir(){
    let importe = parseFloat(document.getElementById("txt_importe").value);
    let res = document.getElementById("txt_resultado");
    let txtasa = document.getElementById("txt_tasa");

    let request = new XMLHttpRequest();
    request.open('GET', API_BASE_URL+"latest.json?app_id="+API_APP_ID+"&symbols="+API_MXN_CURRENCY, true);

    request.onerror = function() {
        alert("No se puede conectar al servidor...");
    }

    request.onload = function() {
        if(request.status >= 200 && request.status < 300) {
            //Convierte la respuesta del WS a un objeto JSON
            var data = JSON.parse(this.response);
            //Imprime en consola el objeto JSON resultante
            console.log(data);
            //Asigna a la variable var_rates solo el arreglo de divisas contenido en la respuesta del WS
            var var_rates = data.rates;
            //Se extrae la tasa de conversión a Pesos Mexicanos de los resultados de WS
            var tasa = parseFloat(var_rates['MXN']);
                //Se valida que el importe y la tasa no sea Nulo y sea mayor a cero
                if(!isNaN(importe) && importe > 0.0 && !isNaN(tasa) && tasa > 0.0){
                    txtasa.value = tasa;
                    //Si es de Pesos a Dolares
                    if(pesos_a_dolares){
                        res.value = (importe / tasa);
                    }
                    //Si es de Dolares a Pesos
                    else {
                        res.value = (importe * tasa);
                    }
                }
        } else {
            alert("No se puede conectar al servidor...");
        }
    }

    request.send();

    return false; //Evita que se ejecute el redirect del FORM
}