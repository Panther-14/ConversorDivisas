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
            var data = JSON.parse(this.response);
            console.log(data);
            var var_rates = data.rates;
            var tasa = parseFloat(var_rates['MXN']);
                if(!isNaN(importe) && importe > 0.0 && !isNaN(tasa) && tasa > 0.0){
                    txtasa.value = tasa;
                    if(pesos_a_dolares){
                        res.value = (importe / tasa);
                    }
                    else {
                        res.value = (importe * tasa);
                    }
                }
        } else {
            alert("No se puede conectar al servidor...");
        }
    }

    request.send();

    return false;
}