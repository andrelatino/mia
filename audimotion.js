// load module from Skypack CDN
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

// audio source
const audioEl = document.getElementById('speechAudio');

// instantiate analyzer
const audioMotion = new AudioMotionAnalyzer(
  document.getElementById('container'),
  {
    source: audioEl,
    height: 500,
    // you can set other options below - check the docs!
    mode: 10,
    channelLayout: 'single',
    frequencyScale: 'bark',
    gradient: 'rainbow',
    linearAmplitude: true,
    linearBoost: 1.8,
    lineWidth:4,
    maxFreq: 20000,
    minFreq: 20,
    mirror: 0,
    overlay: false,
    radial: false,
    reflexAlpha: 1,
    reflexBright: 1,
    reflexFit: true,
    reflexRatio: .5,
    showPeaks: true,
    showScaleX: false,
    weightingFilter: 'D'
    // ledBars: true,
  }
);

// display module version
// document.getElementById('version').innerText = `v${AudioMotionAnalyzer.version}`;

// play stream
// document.getElementById('live').addEventListener( 'click', () => {
//   audioEl.src = 'https://icecast2.ufpel.edu.br/live';
//   audioEl.play();
// });

// // file upload
// document.getElementById('upload').addEventListener( 'change', e => {
// 	const fileBlob = e.target.files[0];

// 	if ( fileBlob ) {
// 		audioEl.src = URL.createObjectURL( fileBlob );
// 		audioEl.play();
// 	}
// });

// Obtener el modal y el contenido del modal
var modal = document.getElementById("modal");
var modalContent = document.querySelector(".modal-content");

// Obtener el botón que abre el modal
var btn = document.getElementById("openModal");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Abrir el modal y añadir la clase para la animación
btn.onclick = function() {
  modal.style.display = "block";
}

// Cerrar el modal y remover la clase para la animación
span.onclick = function() {
  modal.style.display = "none"; 
}

function saveToLocalStorage() {
    var textInputValue = document.getElementById("textInput").value;
    localStorage.setItem('OPENAI_API_KEY', textInputValue);
    alert('API Key saved successfully!');
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("sendButton").addEventListener('click', saveToLocalStorage);
  });
  
  

