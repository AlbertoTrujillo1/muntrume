  document.addEventListener("DOMContentLoaded", function () {
    // Obtener la IP del visitante (usando una API pública)
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip; // Obtener la IP
        const navegador = navigator.userAgent; // Obtener el navegador

        // Enviar los datos al Google Apps Script
        fetch("TU_URL_DEL_SCRIPT", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `ip=${ip}&navegador=${encodeURIComponent(navegador)}`
        })
        .then(response => response.text())
        .then(result => console.log(result)) // Para ver el resultado en la consola
        .catch(error => console.error('Error:', error)); // Manejo de errores
      });
  });
