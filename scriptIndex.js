const buscador = document.getElementById('buscador');
const tarjetas = document.querySelectorAll('.tarjeta');

buscador.addEventListener('input', (evento) => {
  const termino = evento.target.value.trim().toLowerCase();
  tarjetas.forEach((tarjeta) => {
    const contenido = tarjeta.dataset.busqueda || tarjeta.textContent.toLowerCase();
    tarjeta.hidden = !contenido.includes(termino);
  });
});

const avisos = [
  { archivo: 'img/inventario1.jpg', texto: 'Aviso de inventario 1' },
  { archivo: 'img/inventario2.jpg', texto: 'Aviso de inventario 2' },
  { archivo: 'img/inventario3.jpg', texto: 'Aviso de inventario 3' },
  { archivo: 'img/inventario4.jpg', texto: 'Aviso de inventario 4' }
];
const imagenAviso = document.getElementById('imagenAviso');
const indicadores = document.getElementById('indicadoresAvisos');
let avisoActual = 0;

function mostrarAviso(indice) {
  avisoActual = (indice + avisos.length) % avisos.length;
  imagenAviso.style.opacity = '0';
  window.setTimeout(() => {
    imagenAviso.src = avisos[avisoActual].archivo;
    imagenAviso.alt = avisos[avisoActual].texto;
    imagenAviso.style.opacity = '1';
  }, 150);
  indicadores.querySelectorAll('button').forEach((boton, posicion) => {
    boton.classList.toggle('activo', posicion === avisoActual);
    boton.setAttribute('aria-current', posicion === avisoActual ? 'true' : 'false');
  });
}

avisos.forEach((aviso, indice) => {
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'indicador-carrusel';
  boton.setAttribute('aria-label', `Mostrar ${aviso.texto}`);
  boton.addEventListener('click', () => mostrarAviso(indice));
  indicadores.appendChild(boton);
});

document.getElementById('avisoAnterior').addEventListener('click', () => mostrarAviso(avisoActual - 1));
document.getElementById('avisoSiguiente').addEventListener('click', () => mostrarAviso(avisoActual + 1));
mostrarAviso(0);
window.setInterval(() => mostrarAviso(avisoActual + 1), 5000);