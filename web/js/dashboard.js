document.addEventListener("DOMContentLoaded", () => {

let datos = JSON.parse(localStorage.getItem("finanzas")) || [];

const form = document.getElementById("form");
const tabla = document.querySelector("tbody");

function guardarDatos(){
    localStorage.setItem("finanzas", JSON.stringify(datos));
}

function render(){
    tabla.innerHTML = "";

    let ingresos = 0;
    let gastos = 0;
    let deudas = 0;

    datos.forEach((d, index) => {
        let fila = `
        <tr>
            <td>${new Date().toLocaleDateString()}</td>
            <td>${d.tipo}</td>
            <td>${d.descripcion}</td>
            <td>$${d.monto}</td>
            <td>
                <button onclick="eliminar(${index})">❌</button>
            </td>
        </tr>
        `;
        tabla.innerHTML += fila;

        if(d.tipo === "ingreso") {
            ingresos += d.monto;
        } else if(d.tipo === "gasto") {
            gastos += d.monto;
        } else if(d.tipo === "deuda") {
            deudas += d.monto;
        }
    });

    document.querySelector(".ingreso p").innerText = "$" + ingresos;
    document.querySelector(".gastos p").innerText = "$" + gastos;
    document.querySelector(".deudas p").innerText = "$" + deudas;
    document.querySelector(".ahorro p").innerText = "$" + (ingresos - gastos - deudas);

    actualizarGrafica(ingresos, gastos, deudas);
}

/* 🔥 ELIMINAR */
window.eliminar = function(index){
    if(confirm("¿Eliminar este movimiento?")){
        datos.splice(index, 1);
        guardarDatos();
        render();
    }
};

/* ➕ AGREGAR */
form.addEventListener("submit", e => {
    e.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const descripcion = document.getElementById("descripcion").value;
    const monto = parseFloat(document.getElementById("monto").value);

    datos.push({ tipo, descripcion, monto });

    guardarDatos();
    render();
    form.reset();
});

/* 📊 GRAFICA */
let chart;

function actualizarGrafica(ingresos, gastos, deudas){
    const ctx = document.getElementById("grafica");

    if(chart) chart.destroy();
    const ahorro = ingresos - gastos - deudas;
    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Ingresos", "Gastos", "Deudas","Ahorro"],
            datasets: [{
                data: [ingresos, gastos, deudas, ahorro],
                backgroundColor: [
                    "#28a745", // verde
                    "#dc3545", // rojo
                    "#ffc107", // amarillo
                    "#007bff" // azul ahorro
                ]
            }]
        }
    });
}window.addEventListener("scroll", function(){
    const nav = document.querySelector("nav");

    if(window.scrollY > 50){
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

render();

});