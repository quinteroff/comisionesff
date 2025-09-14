/* -------------------- LOGIN -------------------- */
const loginSection = document.getElementById('login-section');
const appContainer = document.getElementById('app-container');
const passwordInput = document.getElementById('password-input');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');

const PASSWORD = "23"; // Cambia esto por tu contraseña

function login() {
  if (passwordInput.value === PASSWORD) {
    loginSection.style.display = "none";
    appContainer.style.display = "block";
  } else {
    loginError.style.display = "block";
    passwordInput.style.borderColor = "#e53e3e";
    setTimeout(() => {
      loginError.style.display = "none";
      passwordInput.style.borderColor = "#e2e8f0";
    }, 3000);
  }
}

loginBtn.addEventListener('click', login);
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') login();
});

/* -------------------- CALCULADORA -------------------- */
const comisionInput = document.getElementById('comision');
const formatoSelect = document.getElementById('formato');
const calcularBtn = document.getElementById('calcular');
const limpiarBtn = document.getElementById('limpiar');
const exportBtn = document.getElementById('export-btn');
const limpiarHistorialBtn = document.getElementById('limpiar-historial');

const placeholder = document.getElementById('placeholder');
const resultadoContent = document.getElementById('resultado-content');
const historialSection = document.getElementById('historial-section');
const historialGrid = document.getElementById('historial-grid');

let historial = [];
let ultimoResultado = null;

function calcularComision() {
  const comision = parseFloat(comisionInput.value);
  const formato = parseFloat(formatoSelect.value);

  if (!comision || comision <= 0) {
    mostrarError('Por favor ingresa un monto de comisión válido');
    return;
  }

  // Cálculos
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
    fecha: new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
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

  ultimoResultado = resultado;
  mostrarResultado(resultado);
  agregarAlHistorial(resultado);
}

function mostrarResultado(r) {
  // Ocultar placeholder y mostrar resultado
  placeholder.style.display = 'none';
  resultadoContent.classList.add('active');

  // Datos de entrada
  document.getElementById('datos-entrada').innerHTML = `
    <div class="value">Comisión: $${r.montoTotal.toFixed(2)}</div>
    <div style="margin-top: 5px; font-size: 14px; color: #718096;">Formato: ${r.formato}%</div>
    <div style="margin-top: 5px; font-size: 14px; color: #718096;">Fecha: ${r.fecha}</div>
  `;

  // Desglose del cálculo
  document.getElementById('desglose-calculo').innerHTML = `
    <div style="font-size: 14px; line-height: 1.6;">
      <div>1. Tu parte (${r.formato}%): <strong>$${r.parteAsesor.toFixed(2)}</strong></div>
      <div>2. 5% de tu parte: <strong>$${r.cincoPorciento.toFixed(2)}</strong></div>
      <div>3. ${r.porcentajeRestante}% restante: <strong>$${r.montoRestante.toFixed(2)}</strong></div>
      <div>4. Suma: <strong>$${r.suma.toFixed(2)}</strong></div>
      <div>5. 3% adicional: <strong>$${r.tresPorciento.toFixed(2)}</strong></div>
    </div>
  `;

  // Totales
  document.getElementById('total-pagar').textContent = `$${r.totalCompania.toFixed(2)}`;
  document.getElementById('total-ganancia').textContent = `$${r.quedaAsesor.toFixed(2)}`;
}

function agregarAlHistorial(resultado) {
  historial.unshift(resultado);
  if (historial.length > 10) historial.pop();
  mostrarHistorial();
}

function mostrarHistorial() {
  if (historial.length === 0) {
    historialSection.style.display = 'none';
    return;
  }

  historialSection.style.display = 'block';
  historialGrid.innerHTML = historial.map((r, index) => `
    <div class="historial-item">
      <div class="historial-fecha">
        <span>${r.fecha}</span>
        <button class="export-btn" onclick="exportarResultado(${index})" style="padding: 4px 8px; font-size: 12px;">📄</button>
      </div>
      <div class="historial-datos">
        <div>
          <div class="label">Comisión</div>
          <div class="value">$${r.montoTotal.toFixed(2)}</div>
        </div>
        <div>
          <div class="label">Formato</div>
          <div class="value">${r.formato}%</div>
        </div>
      </div>
      <div class="historial-totales">
        <div class="historial-total historial-pagar">
          Pagar: $${r.totalCompania.toFixed(2)}
        </div>
        <div class="historial-total historial-ganancia">
          Ganancia: ${r.quedaAsesor.toFixed(2)}
        </div>
      </div>
    </div>
  `).join('');
}

function limpiarCalculadora() {
  comisionInput.value = '';
  placeholder.style.display = 'flex';
  resultadoContent.classList.remove('active');
  ultimoResultado = null;
}

function limpiarHistorial() {
  if (confirm('¿Estás seguro de que quieres limpiar todo el historial?')) {
    historial = [];
    mostrarHistorial();
  }
}

function exportarResultado(index = null) {
  const datos = index !== null ? historial[index] : ultimoResultado;
  if (!datos) return;

  const texto = `
REPORTE DE COMISIÓN INMOBILIARIA
===============================
Fecha: ${datos.fecha}
Monto Total: ${datos.montoTotal.toFixed(2)}
Formato Asesor: ${datos.formato}%

DESGLOSE DEL CÁLCULO:
1. Parte del asesor (${datos.formato}%): ${datos.parteAsesor.toFixed(2)}
2. 5% de la parte del asesor: ${datos.cincoPorciento.toFixed(2)}
3. ${datos.porcentajeRestante}% restante: ${datos.montoRestante.toFixed(2)}
4. Suma: ${datos.suma.toFixed(2)}
5. 3% adicional: ${datos.tresPorciento.toFixed(2)}

TOTAL A PAGAR A LA COMPAÑÍA: ${datos.totalCompania.toFixed(2)}
GANANCIA NETA DEL ASESOR: ${datos.quedaAsesor.toFixed(2)}
  `;

  const blob = new Blob([texto], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `comision-${datos.fecha.replace(/[^\w\s]/gi, '-')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function mostrarError(mensaje) {
  alert(mensaje);
}

// Event Listeners
calcularBtn.addEventListener('click', calcularComision);
limpiarBtn.addEventListener('click', limpiarCalculadora);
exportBtn.addEventListener('click', () => exportarResultado());
limpiarHistorialBtn.addEventListener('click', limpiarHistorial);

// Permitir Enter en el campo de comisión
comisionInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calcularComision();
});