// Importa la librería Tone.js
import * as Tone from "tone";
import { getSupportedAudioFormat } from "./getSupportedAudioFormat";

// Objeto para rastrear el estado de las teclas en reproducción activa
const activeKeys = {};

const players = {}; // Objeto para almacenar los reproductores
let activeNotes = {}; // Guardará la nota activa para cada cuerda
let previousNotePlayed = { rope: null, chord: null }; // Guardará la nota tocada anteriormente

// Función para precargar sonidos en función del nombre de la carpeta
export function preloadSounds(name) {
  const audioFormat = getSupportedAudioFormat();
  // Salir si el formato de audio no es soportado
  if (!audioFormat) return;

  const audioPath = `/audio/${name}/${audioFormat}/`;

  // Arreglo de nombres de archivos de audio que se van a pre-cargar
  const audioFiles = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
  ];

  // Alternativa para crear el array usando un bucle
  // const audioFiles = Array.from({ length: 47 }, (_, i) =>
  //   i.toString().padStart(2, "0")
  // );

  // audioFiles.forEach((file) => {
  //   const audioFile = `${audioPath}${file}.mp3`;
  //   const player = new Tone.Player(audioFile).toDestination();
  //   players[audioFile] = player;
  // });

  audioFiles.forEach((file) => {
    const audioFile = `${audioPath}${file}.${audioFormat}`;

    // Crea un nuevo player solo si no existe ya en el objeto players
    if (!players[audioFile]) {
      players[audioFile] = new Tone.Player({
        url: audioFile,
        autostart: false,
        // Evento de carga
        onload: () => {
          console.log(`${audioFile} loaded`);
        },
        onerror: (error) => {
          console.error(`Error loading ${audioFile}:`, error);
        },
      }).toDestination();
    }
  });
}

// Función para reproducir un sonido
export function playSound(
  name,
  // Datos de las cuerdas y acordes
  data = [],
  // Número de cuerda
  rope,
  // Número de acorde
  chord,
  // Modo de silencio en diferentes cuerdas
  muteOnDifferentRope,
  // Nivel de volumen
  volume,
  // Tecla presionada en el teclado
  keyfromkeyboard,
  // Indicador de si la reproducción es mediante clic
  clickMode
) {
  // Si la tecla ya está activa, evita reproducir la nota nuevamente
  if (keyfromkeyboard && !clickMode && activeKeys[keyfromkeyboard]) {
    return;
  }

  // Marca la tecla como activa solo si es válida
  if (keyfromkeyboard && !clickMode) {
    activeKeys[keyfromkeyboard] = true;
  }

  const audioPath = `/audio/${name}/mp3/`;

  // Encuentra la nota en cleanSoloNotes usando el rope
  const ropeData = data.find((note) => note.rope === rope);
  const audioFormat = getSupportedAudioFormat();
  if (!audioFormat) return; // Salir si no hay formato soportado

  if (ropeData) {
    const fretData = ropeData.frets.find((fret) => fret.chord === chord);
    // console.log(ropeData.rope);

    if (fretData) {
      const audioFile = `${audioPath}${fretData.file}.${audioFormat}`;
      const player = players[audioFile];

      if (!player) {
        console.warn("Player not found for", audioFile);
        return;
      }

      // Detener la nota anterior si es la misma que la actual
      if (
        activeNotes[rope] &&
        activeNotes[rope].chord === chord &&
        activeNotes[rope].source
      ) {
        activeNotes[rope].source.stop();
        console.log(`Nota anterior (${rope}, ${chord}) detenida.`);
      }

      // La nota anterior y la nota actual
      // Al tocar una nota cuya cuerda coincida con la cuerda de la nota anterior, se debe silenciar la nota anterior.
      // Detener la nota anterior si es la misma que la actual
      if (
        activeNotes[rope] &&
        // activeNotes[rope].rope === rope &&
        ropeData.rope === rope &&
        activeNotes[rope].source
      ) {
        activeNotes[rope].source.stop();
        console.log(
          `Nota anterior (${rope}, ${chord}) detenida porque ha tocado la misma cuerda.`
        );
      }

      // Opcionalmente (si o no) Al tocar una nota cuya cuerda sea diferente a la cuerda de la nota anterior, se debe silenciar la nota anterior.
      if (
        previousNotePlayed &&
        previousNotePlayed.rope !== null &&
        previousNotePlayed.rope !== rope && // Verifica que la cuerda anterior es diferente a la actual
        activeNotes[previousNotePlayed.rope] && // Revisa si hay una nota activa en la cuerda anterior
        activeNotes[previousNotePlayed.rope].source &&
        muteOnDifferentRope === true
      ) {
        // Detener la nota anterior
        activeNotes[previousNotePlayed.rope].source.stop();
        console.log(
          `Nota anterior (${previousNotePlayed.rope}, ${previousNotePlayed.chord}) detenida porque muteOnDifferentRope está en true.`
        );

        // Elimina la referencia de la nota activa anterior
        delete activeNotes[previousNotePlayed.rope];
      }

      // Configurar el amplificador con el valor recibido
      const gainNode = new Tone.Gain(volume).toDestination();
      // Crear un nuevo bufferSource usando el buffer de `player`
      const bufferSource = new Tone.ToneBufferSource(player.buffer);

      // No utilizar esto porque reproduce 2 veces el mismo sonido
      // .toDestination();

      console.log(
        `La nota anterior ${previousNotePlayed.rope}, ${previousNotePlayed.chord} desde audioPlayer`
      );

      bufferSource.connect(gainNode);
      bufferSource.start();
      previousNotePlayed = { rope, chord };

      // Almacenar la nueva nota activa
      activeNotes[rope] = { chord, source: bufferSource };

      console.log(
        `Reproduciendo la nota ${rope}, ${chord} desde audioPlayer y amplificador ${volume}`
      );

      // Agrega un listener global solo si se usa una tecla
      if (keyfromkeyboard && clickMode === false) {
        const handleKeyUp = (event) => {
          if (event.key === keyfromkeyboard) {
            activeKeys[keyfromkeyboard] = false;
            document.removeEventListener("keyup", handleKeyUp);
            console.log(clickMode);
          }
        };

        document.addEventListener("keyup", handleKeyUp);
      }

      if (clickMode === true) {
        console.log(clickMode);
        console.log("Modo de clic activado para la reproducción de la nota.");
        activeKeys[keyfromkeyboard] = false; // Resetea el estado de la tecla después del clic
      }
    } else {
      console.log("Acorde no encontrado para esta cuerda.");
    }
  } else {
    console.log("Cuerda no encontrada.");
  }
}

// Función generada con CHATGPT y modificada por mi cuenta para silenciar todas las notas
export function muteAll() {
  for (const rope in activeNotes) {
    // https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to
    if (!activeNotes.hasOwnProperty.call(rope)) {
      // console.log("FUNCION: " + activeNotes.hasOwnProperty.call(rope));
      const note = activeNotes[rope];
      if (note.source) {
        note.source.stop(); // Detener la fuente de audio
        console.log(`Nota en cuerda ${rope} silenciada.`);
      }
      delete activeNotes[rope]; // Eliminarla del objeto activeNotes
    }
  }

  // Restablecer previousNotePlayed si es necesario
  previousNotePlayed = { rope: null, chord: null };
  console.log("Todas las notas han sido silenciadas.");
}

export function muteCurrentNote() {
  const { rope, chord } = previousNotePlayed;

  // Verificar que haya una nota previa activa para silenciar
  if (rope !== null && chord !== null) {
    const note = activeNotes[rope];

    if (note && note.source) {
      note.source.stop(); // Detener la fuente de audio de la nota actual
      console.log(
        `Nota en cuerda ${rope}, acorde ${chord} ha sido silenciada.`
      );

      // Eliminar la nota actual de activeNotes para reflejar que ya no está activa
      delete activeNotes[rope];
    } else {
      console.log("No hay ninguna nota activa para silenciar.");
    }

    // Restablecer previousNotePlayed para reflejar que ya no hay una nota actual activa
    previousNotePlayed = { rope: null, chord: null };
  } else {
    console.log("No hay ninguna nota activa para silenciar.");
  }
}
