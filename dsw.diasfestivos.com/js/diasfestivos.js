const API_URL_BASE = 'https://holidayapi.com/v1/';
const API_KEY = '10ab9f52-8fc7-4e42-b2f4-88144c710fa1';

var txt_anio;
var cbx_pais;
var cbx_mes;
var div_resultado;

window.onload = function() {
    txt_anio = document.getElementById('txt_anio');
    cbx_pais = document.getElementById('cbx_pais');
    cbx_mes = document.getElementById('cbx_mes');
    div_resultado = document.getElementById('div_resultado');

    txt_anio.value = (new Date().getFullYear() - 1);
    div_resultado.style.display = 'none';

}

function consultar() {
    div_resultado.style.display = 'none';
    var URL_CONSULTA = API_URL_BASE + 'holidays?' +
                    'languaje=es' + 
                    '&key='+ API_KEY + 
                    '&country=' + cbx_pais.value + 
                    '&year=' + txt_anio.value + 
                    '&month=' + cbx_mes.value;
    console.log(URL_CONSULTA);
    axios.get(URL_CONSULTA)
    .then((response) => {
        if (response.status >=200 && response.status < 300) {
            var data = response.data;
            console.log(data);
            mostrarDiasFestivos(data.holidays);
        } else {
            alert('No se puede conectar con el servidor');
        }
    }).catch((error) => {
        console.log(error);
        alert('No se puede conectar con el servidor');
    });
    return false;
}

function mostrarDiasFestivos(diasFestivos) {
    div_resultado.style.display = 'block';
    div_resultado.innerHTML = '';
    let titulo = document.createElement('h2');
    titulo.innerHTML = 'Días festivos de ' + 
                        cbx_pais.options[cbx_pais.selectedIndex].text +
                        ' en ' + cbx_mes.options[cbx_mes.selectedIndex].text + 
                        ' del año ' + txt_anio.value;
    div_resultado.appendChild(titulo);
    let tarjetas ="";
    diasFestivos.forEach((diaFestivo) => {
        tarjetas += generarTarjeta(diaFestivo);
    });
    if (tarjetas != "") {
        tarjetas += '<div class="tarjetas">'+tarjetas+'</div>';
        div_resultado.insertAdjacentHTML("beforeend", tarjetas);
    } else {
        let mensaje = document.createElement('h3');
        mensaje.innerHTML = 'No hay días festivos en este mes';
        mensaje.className = 'sin-resultados';
        div_resultado.appendChild(mensaje);
    }
}

function generarTarjeta(datos) {
    console.log(datos);
    return '<div class="tarjeta">' +
            '<h3>' + datos.name + '</h3>' +
            '<h4>' + datos.date + '</h4>' +
            '<br>' +
            '<span>' + datos.weekday.date.name + '</span>' +
            '<br><br>' +
            `<a href="https://www.google.com/search?q=${encodeURI(datos.name)}" target="_blank">Más información</a>` +
            '</div>';
}