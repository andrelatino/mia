
function agregarATranscripciones(transcript, esUsuario) {
    let transcripciones = JSON.parse(localStorage.getItem('transcripciones')) || [];
    let mensaje = esUsuario ? `<p class="usuario">${transcript}</p>` : `<p class="asistente">${transcript}</p>`;
    transcripciones.push(mensaje);
    localStorage.setItem('transcripciones', JSON.stringify(transcripciones));
    
    actualizarConversaciones();
    
}

function actualizarConversaciones() {
    let transcripciones = JSON.parse(localStorage.getItem('transcripciones')) || [];
    let conversacionesHTML = transcripciones.join('');
    document.getElementById('conversaciones').innerHTML = conversacionesHTML;
}

let recognition;
let listening = false;

function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        agregarATranscripciones(transcript, true); // Usuario
        iniciarConversacionGPT(transcript);
    };

    recognition.onend = () => {
        if (listening) {
            recognition.start();
        }
    };

    recognition.start();
    listening = true;
}

function stopRecognition() {
    listening = false;
    if (recognition) {
        recognition.abort(); // Immediately stop recognition
    }
}

// startRecognition();
document.getElementById('startButton').addEventListener('click', startRecognition);
document.getElementById('stopButton').addEventListener('click', stopRecognition);
actualizarConversaciones(); 

// Código de interacción con GPT-4

const url = 'https://api.openai.com/v1/chat/completions';

function iniciarConversacionGPT(mensajeUsuario) {
    var apiKeyForChat = document.getElementById("textInput").value;
    stopRecognition();
    const query = {
        model: "gpt-3.5-turbo-0125",
        messages: [
            { role: "system", content: "Eres un asistente de chat en español, haz preguntas abiertas al final de tu respuesta para seguir la conversación" },
            { role: "user", content: mensajeUsuario }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKeyForChat}`
        },
        body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then(data => {
        // stopRecognition();
        const respuestaGPT = data.choices[0].message.content;
        agregarATranscripciones(respuestaGPT);
        console.log('respuestaGPT'+respuestaGPT)
        
        downloadSpeech('tts-1','alloy', respuestaGPT);
    })
    .catch(error => console.error('Error:', error));
}


