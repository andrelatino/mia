
function loadFromLocalStorage() {
    // Intentar obtener el valor de OPENAI_API_KEY del localStorage
    apiKey = localStorage.getItem('OPENAI_API_KEY');
  
    // Verificar si el valor existe
    if (apiKey !== null) {
      // Si existe, establecerlo como el valor del campo de texto
      document.getElementById("textInput").value = apiKey;
      
    } else {
      // Opcional: Manejar el caso de que no se encuentre la clave en el localStorage
      console.log('No API Key found in Local Storage.');
    }
  }
  loadFromLocalStorage();
  document.addEventListener('DOMContentLoaded', (event) => {
    loadFromLocalStorage();
  });
    