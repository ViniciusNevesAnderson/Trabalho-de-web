const userRole = sessionStorage.getItem("role");

const tarifaInput = document.getElementById("tarifa");

function configurarTarifa() {
    let tarifaSalva = localStorage.getItem("tarifaGlobal");
    tarifaSalva = tarifaSalva ? parseFloat(tarifaSalva) : 10;

    tarifaInput.value = tarifaSalva;

    if (userRole === "adm") {
        tarifaInput.disabled = false;
        tarifaInput.addEventListener("input", function () {
            const novaTarifa = parseFloat(tarifaInput.value);

            if (isNaN(novaTarifa) || novaTarifa <= 0) {
                alert("Digite um valor válido para a tarifa.");
                return;
            }

            localStorage.setItem("tarifaGlobal", novaTarifa);
        });
    } else if (userRole === "funcionario") {
        tarifaInput.disabled = true;
        alert("Você está logado como funcionário. A tarifa não pode ser alterada.");
    } else {
        tarifaInput.disabled = true;
        alert("Você não está autenticado! Redirecionando para a página de login.");
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", configurarTarifa);

function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        myFunction(this);
    }
    xhttp.open("GET", "descontos.xml");
    xhttp.send();
}

function myFunction(xml) {
    const xmlDoc = xml.responseXML;
    const x = xmlDoc.getElementsByTagName("CD");
    let table = "<tr><th>Loja</th><th>Desconto</th></tr>";
    for (let i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            x[i].getElementsByTagName("LOJA")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("DESCONTO")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById("tabela1").innerHTML = table;
}

document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    const tarifa = parseFloat(tarifaInput.value);
    const data = document.getElementById("data").value; 
    const carro = document.getElementById("carro").value;
    const placa = document.getElementById("placa").value;
    const horario_de_chegada = parseFloat(document.getElementById("horario_de_chegada").value);
    const horario_de_saida = parseFloat(document.getElementById("horario_de_saida").value);
    const lojas = (document.getElementById("lojas").value)

    if (isNaN(horario_de_chegada) || isNaN(horario_de_saida)) {
        alert("Os Horários de chegada e saída devem ser números válidos!");
        return;
    }

    if (horario_de_chegada >= horario_de_saida) {
        alert("Digite o horário de chegada correto!!");
        return;
    }
    if (horario_de_chegada < 4){
        alert("Digite o horário de chegada correto!!");
        return;
    }
    if (horario_de_saida > 23){
        alert("Digite o horário de saída correto!!");
        return;
    }

    let resultado = horario_de_saida - horario_de_chegada;
    let valor_a_pagar = tarifa;

    if (resultado >= 2) {
        valor_a_pagar += (tarifa / 2) * (resultado - 1);
    }

    if (lojas == "Loja A - 30%") {
        valor_a_pagar = valor_a_pagar - (valor_a_pagar * 0.30);
    } 
    
    else if (lojas == "Loja B - 50%") {
        valor_a_pagar = valor_a_pagar - (valor_a_pagar * 0.50);
    } 
    
    else if (lojas == "Loja C - 20%") {
        valor_a_pagar = valor_a_pagar - (valor_a_pagar * 0.20);
    } 
    
    else if (lojas == "Loja D - 40%") {
        valor_a_pagar = valor_a_pagar - (valor_a_pagar * 0.40);
    }


    const table = document.getElementById("tabela2").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const celula_data = newRow.insertCell(0);
    const celula_carro = newRow.insertCell(1);
    const celula_placa = newRow.insertCell(2);
    const celula_horario_de_chegada = newRow.insertCell(3);
    const celula_horario_de_saida = newRow.insertCell(4);
    const celula_lojas = newRow.insertCell(5);
    const celula_valor_a_pagar = newRow.insertCell(6);

    celula_data.textContent = data;
    celula_carro.textContent = carro;
    celula_placa.textContent = placa;
    celula_horario_de_chegada.textContent = horario_de_chegada.toFixed(2);
    celula_horario_de_saida.textContent = horario_de_saida.toFixed(2);
    celula_lojas.textContent = lojas;
    celula_valor_a_pagar.textContent = valor_a_pagar.toFixed(2);
});

  
