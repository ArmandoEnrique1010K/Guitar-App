// Función para verificar la compatibilidad de audio, de tal manera que permite
// obtener el tipo de archivo de audio que soporta el navegador: mp3 o wav
export const getSupportedAudioFormat = () => {
  // El metodo document.createElement
  // Crea un elemento HTML por el nombre de la etiqueta HTML
  const audioElement = document.createElement("audio");

  // El metodo canPlayType
  // Sirve para verificar si el navegador reproduce el formato definido.
  // Los elementos HTML <video> y <audio> heredan la interfaz HTMLMediaElement, a su vez hereda el método canPlayType.
  // El metodo retorna 3 valores:
  // - "probably" --> probablemente se puede reproducir
  // - "maybe" --> se verifica cuando se intenta reproducir el formato
  // - "" --> no se puede reproducir
  if (audioElement.canPlayType("audio/mpeg") === "probably") {
    // Imprime en la consola un mensaje (solamente para pruebas)
    // console.log("Tu navegador soporta el formato MP3")
    return "mp3";
  } else if (audioElement.canPlayType("audio/wav") === "probably") {
    // console.log("Tu navegador soporta archivos wav");
    return "wav";
  } else {
    // Ningún formato soportado
    // console.error("No se soportan formatos de audio MP3 o WAV.");
    return null;
  }
};
