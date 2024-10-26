document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Obtener la IP del visitante
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    // Obtener detalles del navegador, sistema operativo, plataforma y idioma
    const navegador = navigator.userAgent;
    const idioma = navigator.language || "Idioma no disponible";

    // Extraer sistema operativo y plataforma
    const sistemaOperativo = obtenerSistemaOperativo(navegador);
    const plataforma = obtenerPlataforma(navegador);

    // Enviar los datos al Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbwdIYLnfIpGqGrJtwWDHSEA584Y4KtxJHytgwBHVYtXKy3AKOS9i7Ax9EkZBeQH5qpTMQ/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `ip=${encodeURIComponent(ip)}&navegador=${encodeURIComponent(navegador)}&sistemaOperativo=${encodeURIComponent(sistemaOperativo)}&plataforma=${encodeURIComponent(plataforma)}&idioma=${encodeURIComponent(idioma)}`
    });

    const result = await response.text();
    console.log('Resultado del envío:', result);
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
});

// Función para detectar el sistema operativo a partir del userAgent
function obtenerSistemaOperativo(userAgent) {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac OS")) return "Mac OS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  return "Sistema Operativo no identificado";
}

// Función para detectar la plataforma (tipo de dispositivo) a partir del userAgent
function obtenerPlataforma(userAgent) {
  if (/Mobile|Android|iPhone|iPad/i.test(userAgent)) return "Móvil";
  if (/Tablet|iPad/i.test(userAgent)) return "Tableta";
  return "Escritorio";
}
