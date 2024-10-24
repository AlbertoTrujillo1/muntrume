<?php
// Establecer el nombre del archivo donde se guardarán los datos
$archivo = "visitantes.txt";

// Obtener la dirección IP del visitante
$ip = $_SERVER['REMOTE_ADDR'];

// Obtener el navegador del visitante
$navegador = $_SERVER['HTTP_USER_AGENT'];

// Crear la entrada con la fecha, IP y navegador
$entrada = date("Y-m-d H:i:s") . " - IP: " . $ip . " - Navegador: " . $navegador . "\n";

// Guardar la entrada en el archivo
file_put_contents($archivo, $entrada, FILE_APPEND | LOCK_EX);

echo "Información guardada con éxito.";
?>
