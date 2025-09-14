/* -------------------- LOGIN -------------------- */
const loginSection = document.getElementById('login-section');
const calculatorCard = document.getElementById('calculator-card');
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');

const PASSWORD = "23"; // Cambia esto por tu clave

loginBtn.addEventListener('click', () => {
  if(passwordInput.value === PASSWORD) {
    loginSection.style.display = "none";
    calculatorCard.style.display = "block";
  } else {
    loginError.style.display = "block";
  }
});

/* ---------------- CALCULADORA ---------------- */
const comisionInput = document.getElementById('comision');
const formatoSelect = document.getElementById('formato');
const calcularBtn = document.getElementById('calcular');
const limpiarBtn = document.getElementById('limpiar');
const resultadoDiv = document.getElementById('resultado');
const historialDiv = document.getElementById('historial');

let historial = [];

function calcularComision() {
  const comision = parseFloat(comisionInput.value);
  const formato = parseFloat(formatoSelect.value);

  if (!comision || comision <= 0) {
    alert('Por favor ingresa un monto de comisión válido');
    return;
  }

  const parteAsesor = comision * (formato / 100);
  const cincoPorciento = parteAsesor * 0.05;
  const porcentajeRestante = 100 - formato;
  const montoRestante = comision * (porcentajeRestante / 100);
  const suma = montoRestante + cincoPorciento;
  const tresPorciento = suma * 0.03;
  const totalCompania = suma + tresPorciento;
  const quedaAsesor = comision - totalCompania;

  const resultado = {
    id: Date.now(),
    fecha: new Date().toLocaleDateString(),
    montoTotal: comision,
    formato,
    parteAsesor,
    cincoPorciento,
    porcentajeRestante,
    montoRestante,
    suma,
    tresPorciento,
    totalCompania,
    quedaAsesor
  };

  mostrarResultado(resultado);
  historial.unshift(resultado);
  if (historial.length > 10) historial.pop();
  mostrarHistorial();
}

function mostrarResultado(r) {
  resultadoDiv.innerHTML = `
    <h3>Resultado del Cálculo</h3>
    <p>Comisión Total: $${r.montoTotal.toFixed(2)}</p>
    <p>Formato: ${r.formato}%</p>
    <p>Tu parte: $${r.parteAsesor.toFixed(2)}</p>
    <p>5% de tu parte: $${r.cincoPorciento.toFixed(2)}</p>
    <p>${100 - r.formato}% restante: $${r.montoRestante.toFixed(2)}</p>
    <p>Suma: $${r.suma.toFixed(2)}</p>
    <p>3% adicional: $${r.tresPorciento.toFixed(2)}</p>
    <p><strong>Total a pagar a la compañía: $${r.totalCompania.toFixed(2)}</strong></p>
    <p><strong>Ganancia neta del asesor: $${r.quedaAsesor.toFixed(2)}</strong></p>
  `;
}

function mostrarHistorial() {
  historialDiv.innerHTML = '<h3>Historial de Cálculos</h3>' + historial.map(r => `
    <div class="historial-item">
      <p>${r.fecha}: Comisión $${r.montoTotal.toFixed(2)}, Ganancia $${r.quedaAsesor.toFixed(2)}</p>
    </div>
  `).join('');
}

function limpiarCalculadora() {
  comisionInput.value = '';
  resultadoDiv.innerHTML = '<p class="placeholder">Ingresa los datos y haz clic en "Calcular" para ver el resultado</p>';
}

calcularBtn.addEventListener('click', calcularComision);
limpiarBtn.addEventListener('click', limpiarCalculadora);
