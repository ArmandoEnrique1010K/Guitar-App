// Función para verificar la compatibilidad de audio, de tal manera que permite
// obtener el tipo de archivo de audio que soporta el navegador: mp3 o wav
export const getSupportedAudioFormat = () => {
  const audioElement = document.createElement("audio");
  if (audioElement.canPlayType("audio/mpeg")) {
    return "mp3";
  } else if (audioElement.canPlayType("audio/wav")) {
    return "wav";
  } else {
    console.warn("No se soportan formatos de audio MP3 o WAV.");
    // Ningún formato soportado
    return null;
  }
};
