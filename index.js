document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Obtener la IP del visitante
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Obtener el userAgent del navegador
    const navegador = navigator.userAgent;

    // Enviar los datos al Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbwdIYLnfIpGqGrJtwWDHSEA584Y4KtxJHytgwBHVYtXKy3AKOS9i7Ax9EkZBeQH5qpTMQ/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `ip=${encodeURIComponent(ip)}&navegador=${encodeURIComponent(navegador)}`
    });

    // Obtener la respuesta del servidor
    const result = await response.text();
    console.log('Resultado del envío:', result);
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
});
