// Importa la librería Tone.js
import * as Tone from "tone";
import { getSupportedAudioFormat } from "./getSupportedAudioFormat";

// Objeto para rastrear el estado de las teclas en reproducción activa
const activeKeys = {};
// Objeto para almacenar los reproductores
const players = {};
// Objeto para guardar la nota activa para cada cuerda
let activeNotes = {};
// Objeto para guardar la nota tocada anteriormente
let previousNotePlayed = { rope: null, chord: null };

// Almacena el valor devuelto por la función (mp3, wav o null)
const audioFormat = getSupportedAudioFormat();

// Función para precargar sonidos en función del nombre de la carpeta
export function preloadSounds(name) {
  // Salir si el formato de audio no es soportado (return hace esa acción)
  if (!audioFormat) return;

  // if (!audioFormat){
  //   return
  // }

  // Ruta hacia la carpeta que contiene las notas de la guitarra
  // Utiliza Template String para establecer el nombre de la carpeta y el tipo de archivo soportado por el navegador
  // Ejemplo: /audio/cleanSolo/mp3/
  const audioPath = `/audio/${name}/${audioFormat}/`;

  // El siguiente arreglo contiene los nombres de los archivos de audio que se van a pre-cargar
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

  // // Alternativa para crear el arreglo usando un bucle
  // // Array.from es un metodo estatico que crea una nueva instancia de un arreglo a partir de un objeto iterable.
  // // { length: 16 } crea un objeto con una propiedad "length" de 16, lo que define el tamaño del arreglo.
  // const audioFiles = Array.from({ length: 46 }, (_, i) =>
  // // convierte el índice i en una cadena y agrega ceros a la izquierda para que tenga al menos 2 dígitos.
  //   i.toString().padStart(2, "0")
  // );
  // // Por ejemplo, el índice 1 se convierte en "01", 2 en "02", y así sucesivamente hasta 46.

  // Itera por cada elemento del arreglo audioFiles
  audioFiles.forEach((file) => {
    // Define la ruta hacia el nombre del archivo de audio
    // Ejemplo: /audio/cleanSolo/mp3/00.mp3
    const audioFile = `${audioPath}${file}.${audioFormat}`;

    // Crea un nuevo player o reproductor solo si no existe ya en el objeto players
    if (!players[audioFile]) {
      //
      // El constructor Tone.Player es un reproductor de archivos de audio con funciones de inicio, bucle y parada.
      players[audioFile] = new Tone.Player({
        // Contiene los siguientes 2 parametros (ruta de la ubicación del archivo de audio y un valor booleano para
        // indicar si se va reproducir automaticamente)
        url: audioFile,
        autostart: false,
        // Evento que se ejecuta luego de cargar el archivo
        onload: () => {
          console.log(`Se cargo el archivo que se encuentra en ${audioFile}`);
        },
        // Evento que se ejecuta si hay un error al cargar el archivo
        onerror: (error) => {
          console.error(
            `Error al cargar el archivo que se encuentra en ${audioFile}:`,
            error
          );
        },
      });

      // Por lo general el metodo toDestination del constructor Tone.Player sirve para "conectar la salida al nodo de destino del contexto".
      players[audioFile].toDestination();
    }
  });
}

// Función para reproducir un sonido, requiere 8 argumentos
export function playSound(
  // Nombre de la carpeta
  name,
  // Arreglo con los datos de las cuerdas y acordes
  data = [],
  // Número de cuerda
  rope,
  // Número de acorde
  chord,
  // Modo de silencio en diferentes cuerdas
  muteOnDifferentRope,
  // Nivel de volumen
  // volume,
  // Tecla presionada en el teclado
  keyfromkeyboard,
  // Indicador de si la reproducción es mediante un clic
  clickMode,
  // Efectos de sonido
  effects
) {
  // Si la tecla ya está activa y no se está usando clickMode, evita reproducir la nota nuevamente
  if (keyfromkeyboard && !clickMode && activeKeys[keyfromkeyboard]) {
    return;
  }

  // Marca la tecla como activa solo si es válida y no se está usando clickMode
  if (keyfromkeyboard && !clickMode) {
    activeKeys[keyfromkeyboard] = true;
  }

  // Si no hay ningun formato soportado, detiene la ejecución de la función
  if (!audioFormat) return;

  // Define la ruta de los archivos de audio según el nombre de la carpeta
  const audioPath = `/audio/${name}/${audioFormat}/`;

  // Encuentra la nota en el arreglo que se recibe desde el parametro data usando el número de cuerda (rope)
  const ropeData = data.find((note) => note.rope === rope);

  if (ropeData) {
    // Busca el acorde especificado dentro de los datos de la cuerda
    const fretData = ropeData.frets.find((fret) => fret.chord === chord);

    // Imprime el valor de la propiedad rope del objeto ropeData (solamente para pruebas)
    // Posibles valores: 1, 2, 3, 4, 5 o 6
    // console.log(ropeData.rope);

    if (fretData) {
      // Genera el nombre completo del archivo de audio
      // La propiedad file contiene el nombre del archivo de audio
      const audioFile = `${audioPath}${fretData.file}.${audioFormat}`;

      // Imprime un objeto que contiene la ruta hacia el archivo como propiedad, esa propiedad
      // Contiene una serie de propiedades y metodos definidos.
      // console.log(players);

      // Busca la propiedad que corresponde a la ruta del archivo
      const player = players[audioFile];

      // Imprimir para una prueba, muestra un objeto que contiene las propiedades y metodos del archivo de audio actual
      // console.log(typeof player);
      // console.log(player);

      // Si el archivo de audio no está en players, muestra un error y detiene la ejecución de la función
      if (!player) {
        console.error(
          "No se encontro un reproductor para el archivo que se encuentra en ",
          audioFile
        );
        return;
      }

      // Verifica si la nota anterior es la misma que la actual y la detiene si es así
      // Esto evita que se reproduzca la misma nota repetidamente cuando ya está sonando
      if (
        // Verifica que haya una nota activa en la cuerda
        activeNotes[rope] &&
        // Verifica que el acorde es el mismo
        activeNotes[rope].chord === chord &&
        // Verifica que existe una fuente de audio activa
        activeNotes[rope].source
      ) {
        // Detiene la fuente de audio actual
        activeNotes[rope].source.stop();
        console.log(`Nota anterior (${rope}, ${chord}) detenida.`);
      }

      // Detiene la nota anterior si se toca nuevamente la misma cuerda, incluso si el acorde es distinto
      // Esto asegura que solo una nota suene por cuerda a la vez
      if (
        activeNotes[rope] &&
        // Verifica que la cuerda es la misma
        ropeData.rope === rope &&
        activeNotes[rope].source
      ) {
        // Detiene la fuente de audio actual en esa cuerda
        activeNotes[rope].source.stop();
        console.log(
          `Nota anterior (${rope}, ${chord}) detenida porque ha tocado la misma cuerda.`
        );
      }

      // Si `muteOnDifferentRope` es true, detiene la nota anterior al cambiar de cuerda
      // Esto permite que una nueva nota silencie cualquier otra nota que esté sonando en una cuerda diferente
      if (
        // Verifica que haya una nota tocada previamente
        previousNotePlayed &&
        // Verifica que la nota anterior tiene una cuerda válida
        previousNotePlayed.rope !== null &&
        // Asegura que la cuerda anterior es distinta a la actual
        previousNotePlayed.rope !== rope &&
        // Verifica que hay una nota activa en la cuerda anterior
        activeNotes[previousNotePlayed.rope] &&
        // Verifica que la fuente de audio de la nota anterior sigue activa
        activeNotes[previousNotePlayed.rope].source &&
        // Verifica si el modo de silencio entre cuerdas está activado
        muteOnDifferentRope === true
      ) {
        activeNotes[previousNotePlayed.rope].source.stop(); // Detiene la nota anterior
        console.log(
          `Nota anterior (${previousNotePlayed.rope}, ${previousNotePlayed.chord}) detenida porque muteOnDifferentRope está en true.`
        );

        // Elimina la referencia a la nota activa en la cuerda anterior para evitar que se vuelva a detener innecesariamente
        // Con el termino delete se elimina la propiedad de la nota en la cuerda anterior. Sintaxis: delete objeto[propiedad]
        delete activeNotes[previousNotePlayed.rope];
      }

      // Establece el volumen con el valor recibido como argumento
      // const gainNode = new Tone.Gain(volume);

      const gainNode =
        effects.gain && effects.gain.enabled
          ? new Tone.Gain(effects.gain.gain)
          : null;

      // Efectos de sonido, implementar esto en una futura actualización :)

      // // Crear un nodo de distorsión
      // let distortionNode = null;
      // // if (effects.distortion.enabled === false) {
      // //   console.log("NO SE ACTIVO EL EFECTO DE DISTORSION");
      // // }
      // let reverbNode = null;

      // if (effects.distortion.enabled === true) {
      //   console.log("SE ACTIVO EL EFECTO DE DISTORSION");
      //   distortionNode = new Tone.Distortion(
      //     effects.distortion.distortion,
      //     effects.distortion.oversample
      //   );
      // }

      // if (effects.reverb.enabled === true) {
      //   console.log("SE ACTIVO EL EFECTO DE ECO");
      //   reverbNode = new Tone.Reverb(
      //     effects.reverb.delay,
      //     effects.reverb.preDelay
      //   );
      // }

      const distortionNode =
        effects.distortion && effects.distortion.enabled
          ? new Tone.Distortion(
              effects.distortion.distortion,
              effects.distortion.oversample
            )
          : null;

      const reverbNode =
        effects.reverb && effects.reverb.enabled
          ? new Tone.Reverb(
              effects.reverb.decay
              //  effects.reverb.preDelay
            )
          : null;

      // Delay solamente realiza un retraso, en lugar de eso se utiliza FeedbackDelay
      // Existe tambien Tone.PingPongDelay, pero alterna los canales derecha e izquierda del audifono del usuario
      const feedbackDelayNode =
        effects.feedbackDelay && effects.feedbackDelay.enabled
          ? // FALTA MODIFICAR ESTO
            new Tone.FeedbackDelay(
              effects.feedbackDelay.delayTime,
              effects.feedbackDelay.feedback
            )
          : null;

      // const vibratoNode = new Tone.Vibrato(10, 0.5);
      const vibratoNode =
        effects.vibrato && effects.vibrato.enabled
          ? new Tone.Vibrato(effects.vibrato.frequency, effects.vibrato.depth)
          : null;

      // EQUALIZADOR
      const eq3Node =
        effects.eq3 && effects.eq3.enabled
          ? new Tone.EQ3(
              effects.eq3.lowLevel,
              effects.eq3.midLevel,
              effects.eq3.highLevel
            )
          : null;

      // Crear un nodo de reverb
      // const reverbNode = new Tone.Reverb({
      //   decay: 3,
      //   preDelay: 0.1,
      // });
      // reverbNode.wet.value = 0;

      // OTROS NODOS DE PRUEBA

      // NOTA GRUESA
      //const chorusNode = new Tone.Chorus(1.5, 1, 0.7);
      // ???
      //const chorusNode = new Tone.AutoFilter(1, 200, 2.6);
      // SI FUNCIONA ESTO,
      // ¿¿const chorusNode = new Tone.AutoWah(100, 6, 0);

      // ESTATICA DE BITS (NO IMPLEMENTAR PORQUE NO TIENE USOS)
      // const chorusNode = new Tone.BitCrusher(12);

      // TONO DE LA SEÑAL (¿PODRIA SER UTIL?)
      // const chorusNode = new Tone.PitchShift(-4);

      // FASE DE MOVIMIENTO (AGUA) -> SI FUNCIONA
      // const chorusNode = new Tone.Phaser(1, 6, 10);

      // EQUALIZADOR DE 3 NIVELES
      //const chorusNode = new Tone.EQ3(-10, 3 - 10);

      // Crear un nuevo bufferSource usando el buffer de `player`
      const bufferSource = new Tone.ToneBufferSource(player.buffer);

      // No encadenar el método toDestination porque reproduce 2 veces el mismo sonido
      // .toDestination();

      console.log(
        `La nota anterior ${previousNotePlayed.rope}, ${previousNotePlayed.chord} desde audioPlayer`
      );

      // Forma para conectar solamente el nodo de volumen.
      // bufferSource.connect(gainNode);

      let chainNodes = [];

      // Agregar nodos de efectos si están definidos
      // if (distortionNode) chainNodes.push(distortionNode);

      if (gainNode) {
        chainNodes = [...chainNodes, gainNode];
      }

      if (distortionNode) {
        chainNodes = [...chainNodes, distortionNode];
      }
      // console.log([...chainNodes, distortionNode]);

      if (reverbNode) {
        chainNodes = [...chainNodes, reverbNode];
      }

      if (feedbackDelayNode) {
        chainNodes = [...chainNodes, feedbackDelayNode];
      }

      if (vibratoNode) {
        chainNodes = [...chainNodes, vibratoNode];
      }

      if (eq3Node) {
        chainNodes = [...chainNodes, eq3Node];
      }

      // if (reverbNode) chainNodes.push(reverbNode);
      // if (feedbackDelayNode) chainNodes.push(feedbackDelayNode);
      // if (vibratoNode) chainNodes.push(vibratoNode);

      // if (chorusNode) chainNodes.push(chorusNode);
      // Conectar todos los nodos y el destino final
      chainNodes.push(Tone.getDestination());
      bufferSource.chain(...chainNodes);
      console.log(chainNodes);

      // // Forma para encadenar efectos de sonido con el metodo chain
      // if (distortionNode === null && reverbNode === null) {
      //   bufferSource.chain(
      //     gainNode,
      //     // reverbNode,
      //     Tone.getDestination()
      //   );
      // }

      // if (distortionNode === null) {
      //   bufferSource.chain(gainNode, reverbNode, Tone.getDestination());
      // }

      // if (reverbNode === null) {
      //   bufferSource.chain(gainNode, distortionNode, Tone.getDestination());
      // }

      // if (reverbNode !== null && distortionNode !== null) {
      //   bufferSource.chain(
      //     gainNode,
      //     distortionNode,
      //     reverbNode,
      //     Tone.getDestination()
      //   );
      // }

      // Nota: En versiones anteriores de Tone.Js se utilizaba la clase Destination en lugar del método getDestination.

      // Reproduce el buffer
      bufferSource.start();

      // Alamacena la nota anterior
      previousNotePlayed = { rope, chord };

      // Almacena la nueva cuerda activa
      activeNotes[rope] = { chord, source: bufferSource };

      console.log(`Reproduciendo la nota ${rope}, ${chord} desde audioPlayer`);

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

      // Resetea el estado de la tecla después del clic
      if (clickMode === true) {
        console.log(clickMode);
        console.log("Modo de clic activado para la reproducción de la nota.");
        activeKeys[keyfromkeyboard] = false;
      }
    } else {
      console.log("Acorde no encontrado para esta cuerda.");
    }
  } else {
    console.log("Cuerda no encontrada.");
  }
}

// Función para silenciar todas las notas activas en todas las cuerdas
export function muteAll() {
  // Itera sobre cada cuerda en el objeto activeNotes
  for (const rope in activeNotes) {
    // Verifica que la propiedad pertenece a activeNotes y no a su prototipo
    // Sintaxis correcta hasOwnProperty.call
    if (!activeNotes.hasOwnProperty.call(rope)) {
      const note = activeNotes[rope];

      // Si la nota en esta cuerda tiene una fuente de audio activa, la detiene
      if (note.source) {
        // Detener la reproducción de audio
        note.source.stop();
        console.log(`Nota en cuerda ${rope} silenciada.`);
      }

      // Elimina la referencia de la nota en activeNotes para liberar recursos
      delete activeNotes[rope];
    }
  }

  // Restablece el registro de la última nota reproducida para indicar que no hay ninguna nota activa
  previousNotePlayed = { rope: null, chord: null };
  console.log("Todas las notas han sido silenciadas.");
}

// Función para silenciar solo la nota actualmente activa en la cuerda previa
export function muteCurrentNote() {
  const { rope, chord } = previousNotePlayed;

  // Verifica si hay una nota activa previa que pueda ser silenciada
  if (rope !== null && chord !== null) {
    const note = activeNotes[rope];

    // Si existe una fuente de audio activa en la cuerda previa, la detiene
    if (note && note.source) {
      // Detener la reproducción de audio de la nota actual
      note.source.stop();
      console.log(
        `Nota en cuerda ${rope}, acorde ${chord} ha sido silenciada.`
      );

      // Elimina la referencia de la nota actual en activeNotes para liberar recursos
      delete activeNotes[rope];
    } else {
      console.log("No hay ninguna nota activa para silenciar.");
    }

    // Restablece previousNotePlayed para indicar que no hay ninguna nota activa actualmente
    previousNotePlayed = { rope: null, chord: null };
  } else {
    console.log("No hay ninguna nota activa para silenciar.");
  }
}
