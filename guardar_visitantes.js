  document.addEventListener("DOMContentLoaded", function () {
    // Obtener la IP del visitante (usando una API pública)
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ip = data.ip; // Obtener la IP
        const navegador = navigator.userAgent; // Obtener el navegador

        // Enviar los datos al Google Apps Script
        fetch("https://script.google.com/macros/s/AKfycbwdIYLnfIpGqGrJtwWDHSEA584Y4KtxJHytgwBHVYtXKy3AKOS9i7Ax9EkZBeQH5qpTMQ/exec", {
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
