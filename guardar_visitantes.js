document.addEventListener("DOMContentLoaded", () => {
  // Función para obtener la IP del visitante
  const obtenerIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error al obtener la IP:', error);
      return null;
    }
  };

  // Función para enviar los datos al Google Apps Script
  const enviarDatos = async (ip, navegador) => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwdIYLnfIpGqGrJtwWDHSEA584Y4KtxJHytgwBHVYtXKy3AKOS9i7Ax9EkZBeQH5qpTMQ/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `ip=${encodeURIComponent(ip)}&navegador=${encodeURIComponent(navegador)}`
      });

      const result = await response.text();
      console.log('Resultado del envío:', result);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  // Función principal para ejecutar cuando se carga el DOM
  const iniciarEnvio = async () => {
    const ip = await obtenerIP();
    if (ip) {
      const navegador = navigator.userAgent;
      enviarDatos(ip, navegador);
    } else {
      console.warn('No se pudo obtener la IP del usuario.');
    }
  };

  iniciarEnvio();
});
