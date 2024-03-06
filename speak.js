// 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
async function downloadSpeech(model,voice,input) {
    const apiKey = localStorage.getItem('OPENAI_API_KEY');
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            voice: voice,
            input: input
        })
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    // Obtener el Blob de la respuesta
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audioElement = document.getElementById('speechAudio');

    // Set the audio source and start playing immediately
    audioElement.src = audioUrl;
    
    audioElement.play(); // Start playback immediately
}

// Function to perform an action when audio playback ends
function onAudioEnded() {
    // Your code here to handle what you want to do when audio ends
    console.log('Audio playback has ended.'); // Example: Logging a message
    startRecognition();
}

// Get the audio element
const audioElement = document.getElementById('speechAudio');

// Add an event listener to the audio element for the 'ended' event
audioElement.addEventListener('ended', onAudioEnded);
