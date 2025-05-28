const preguntas = [
  { clave: "empleados_menores", texto: "¿Se han empleado menores en el proceso de producción?", tipo: "si_no", imagen: "imagenes/empleados_menores.jpeg" },
  { clave: "sueldo_razonable", texto: "¿Se paga un sueldo razonable a los empleados?", tipo: "si_no", imagen: "imagenes/sueldo_razonable.jpeg" },
  { clave: "jornada_no_abusiva", texto: "¿La jornada laboral no es abusiva?", tipo: "si_no", imagen: "imagenes/jornada_no_abusiva.jpeg" },
  { clave: "transporte", texto: "Impacto del transporte (1=muy alto, 5=muy bajo)", tipo: "valor", imagen: "imagenes/transporte.jpeg" },
  { clave: "empaquetado", texto: "Sostenibilidad del empaquetado (1=nada, 5=muy sostenible)", tipo: "valor", imagen: "imagenes/empaquetado.jpeg" },
  { clave: "distancia", texto: "Cercanía de producción (1=muy lejos, 5=muy cerca)", tipo: "valor", imagen: "imagenes/distancia.jpeg" },
  { clave: "uso_quimicos", texto: "¿Se usan químicos agresivos en el proceso?", tipo: "si_no", imagen: "imagenes/quimicos.jpeg" },
  { clave: "material_natural", texto: "¿El material es natural?", tipo: "si_no", imagen: "imagenes/tejidos-naturales.jpeg" },
  { clave: "material_sintetico", texto: "¿El material es sintético?", tipo: "si_no", imagen: "imagenes/tejidos-sinteticos.jpeg" },
  { clave: "reciclable", texto: "¿El material es reciclable?", tipo: "si_no", imagen: "imagenes/reciclable.jpg" },
  { clave: "biodegradable", texto: "¿El material es biodegradable?", tipo: "si_no", imagen: "imagenes/biodegradable.jpg" },
  { clave: "material_reciclado", texto: "¿El material proviene de materiales reciclados?", tipo: "si_no", imagen: "imagenes/material-reciclado.jpeg" },
  { clave: "resistencia_uso", texto: "Resistencia al uso (1=baja, 5=alta)", tipo: "valor", imagen: "imagenes/resistencia_uso.png" },
  { clave: "resistencia_lavado", texto: "Resistencia al lavado (1=baja, 5=alta)", tipo: "valor", imagen: "imagenes/resistencia-lavado.jpeg" },
  { clave: "vida_util", texto: "Vida útil estimada (1=corta, 5=larga)", tipo: "valor", imagen: "imagenes/vida_util.jpg" },
];

const pesos_binarios = {
  'empleados_menores': -10, 'sueldo_razonable': 10, 'jornada_no_abusiva': 10,
  'marca_ecologica': 10, 'material_reciclado': 10, 'biodegradable': 10,
  'reciclable': 10, 'material_natural': 10, 'material_sintetico': -5,
  'uso_quimicos': -10,
};

const pesos_escalados = {
  'transporte': 5, 'empaquetado': 5, 'distancia': 5,
  'duracion': 10, 'resistencia_uso': 10, 'resistencia_lavado': 10,
  'vida_util': 10, 'repelencia_agua': 5, 'cuidado': 5,
};

let indice = 0;
let respuestas = {};

const imagen = document.getElementById('imagen');
const pregunta = document.getElementById('pregunta');
const respuesta = document.getElementById('respuesta');
const boton = document.getElementById('siguiente');

function actualizarPregunta() {
  if (indice >= preguntas.length) {
    mostrarResultado();
    return;
  }

  const p = preguntas[indice];
  pregunta.textContent = p.texto;
  imagen.src = p.imagen;

  respuesta.innerHTML = '<option value="">Selecciona una opción</option>';
  if (p.tipo === "si_no") {
    respuesta.innerHTML += '<option value="true">Sí</option><option value="false">No</option>';
  } else {
    for (let i = 1; i <= 5; i++) {
      respuesta.innerHTML += `<option value="${i}">${i}</option>`;
    }
  }
}

function mostrarResultado() {
  let puntuacion = 0;
  let total = 0;

  for (const clave in pesos_binarios) {
    const peso = pesos_binarios[clave];
    const valor = respuestas[clave] === true;
    total += Math.abs(peso);
    if (valor) puntuacion += peso;
  }

  for (const clave in pesos_escalados) {
    const peso = pesos_escalados[clave];
    const valor = parseInt(respuestas[clave] || 0);
    total += peso * 5;
    puntuacion += valor * peso;
  }

  const resultado = Math.max(0, Math.min(100, Math.round((puntuacion / total) * 100)));
  pregunta.textContent = `Puntuación de sostenibilidad: ${resultado}/100`;
  imagen.remove();
  respuesta.remove();
  boton.remove();
}

boton.addEventListener("click", () => {
  if (!respuesta.value) return;
  const clave = preguntas[indice].clave;
  respuestas[clave] = preguntas[indice].tipo === "si_no"
    ? respuesta.value === "true"
    : parseInt(respuesta.value);
  indice++;
  actualizarPregunta();
});

actualizarPregunta();
