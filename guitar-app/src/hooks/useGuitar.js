import { useEffect, useState } from "react";
// import { getNotes } from "../services/getNotes";
import { muteAll, preloadSounds } from "../services/audioPlayer";
import { useNavigate } from "react-router";
import { assignKeysToFrets } from "../services/assignKeysToFrets";
// IMPORTA EL MODULO CSS
import styles from "../components/styles/chord.module.css";

// Hook personalizado, contiene codigo JavaScript, requiere 2 argumentos data y name
export const useGuitar = (data, name) => {
  // Orden por defecto de las cuerdas de una guitarra
  // const initialOrderRopes = [6, 5, 4, 3, 2, 1];

  // Constantes globales, representan el orden en que se estableceran las cuerdas de la guitarra (0, 1, 2 y 3 representa)
  const first = [0, 1, 2, 3, 4, 5];
  const last = [4, 5, 0, 1, 2, 3];
  const middle = [4, 0, 1, 2, 3, 5];
  const alternate = [0, 1, 4, 5, 2, 3];

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado para mostrar un mensaje en la aplicación
  const [message, setMessage] = useState("Bienvenido usuario");

  // Estado para el mastil de la guitarra (las notas ordenadas)
  const [newNeck, setNewNeck] = useState([]);

  // CONFIGURACIONES INICIALES
  const initialSettings = {
    // Establece el acorde inicial
    initialChord: 0,
    // Bloquea el acorde 0
    lockZeroChord: false,
    // Invierte el teclado
    invertKeyboard: false,
    // El tipo de teclado (first, last, middle, alternate)
    typeKeyboard: first,
    // Silenciar la nota de la cuerda anterior
    mutePreviousChord: false,
    // Modo pulso (manten pulsado el teclado o una tecla)
    pulseMode: false,
    // Volumen (1 representa 100%)
    // volume: 1,
    // Mostrar las teclas en pantalla
    showKeyboard: true,
  };

  // Estado para las configuraciones de la guitarra
  const [settings, setSettings] = useState(initialSettings);

  // Desestructura el objeto settings para obtener sus propiedades como variables
  const {
    initialChord,
    lockZeroChord,
    invertKeyboard,
    typeKeyboard,
    mutePreviousChord,
    pulseMode,
    // volume,
    showKeyboard,
  } = settings;

  // Estado para almacenar la nota actual y la nota anterior (solamente para pruebas)
  const [notePlayed, setNotePlayed] = useState({
    rope: null,
    chord: null,
  });

  // Una buena opción podria ser el uso de useMemo en lugar de llamar a la función para obtener el arreglo de las notas de la guitarra
  // const initialNeck = useMemo(() => getNotes(data), [data]);
  // const initialNeck = getNotes(data);

  // Otra forma, no utilizar la función getNotes si se trata de datos estaticos
  const initialNeck = data;

  // Llama a la función para precargar las notas de la guitarra por el nombre de la guitarra
  preloadSounds(name);

  // useNavigate es un hook que permite navegar entre paginas web
  // Es una alternativa a <NavLink></NavLink> de React Router
  const navigate = useNavigate();

  // Efecto secundario para el mensaje que se muestra en la pantalla
  // Cuando message cambia, el setTimeout se reinicia, pero no se cancela el temporizador anterior.
  // useEffect(() => {
  //     if (message !== "...") {
  //         setTimeout(() => {
  //             setMessage("...")
  //         }, 5000)
  //     }
  // }, [message])

  const initialEffects = {
    gain: {
      enabled: false,
      gain: 1,
    },
    distortion: {
      enabled: false,
      distortion: 0.4,
      // oversample: "none",
    },
    reverb: {
      enabled: false,
      decay: 1.5,
      // preDelay: 0.01
    },
    feedbackDelay: { enabled: false, delayTime: 0.25, feedback: 0.125 },
    vibrato: { enabled: false, frequency: 5, depth: 0.1 },
    eq3: {
      enabled: false,
      lowLevel: 0,
      midLevel: 0,
      highLevel: 0,
    },
  };
  // EFECTOS DE SONIDO
  const [effects, setEffects] = useState(initialEffects);

  // LOGICA CON localStorage para almacenar las configuraciones en la computadora del usuario
  const initialPresets = JSON.parse(localStorage.getItem("presets")) || [];

  // El contador se almacena en la computadora
  const initialCounter = parseInt(localStorage.getItem("counter") || 0);

  // NO UTILIZO UNA BASE DE DATOS PORQUE SE TRATA DE DATOS ESTATICOS (NUNCA VAN A CAMBIAR, A EXCEPCIÓN DE ALGUNOS DATOS QUE SE VAN A ALMACENAR EN EL NAVEGADOR DEL USUARIO)

  // CONFIGURACIONES ESTABLECIDAS
  const [presets, setPresets] = useState(initialPresets);

  const [counter, setCounter] = useState(initialCounter);

  // NOMBRE PARA LA CONFIGURACION ESTABLECIDA
  const [presetName, setPresetName] = useState("");

  // MODO DE TIPEO EN EL FORMULARIO
  const [typeMode, setTypeMode] = useState(false);

  // // CONFIGURACION SELECCIONADA
  // const [currentPreset, setCurrentPreset] = useState({
  //   settings: {},
  //   effects: {},
  //   presetName: "",
  //   id: 0,
  // });

  const saveCurrentConfig = (e) => {
    e.preventDefault();

    // VALIDACION SI EL NOMBRE ESTA EN BLANCO
    if (!presetName) {
      alert("Inserte un nombre para la nueva configuración");
      return;
    }

    setPresets([...presets, { settings, effects, presetName, id: counter }]);
    setCounter((c) => c + 1);
    setPresetName("");
  };

  // BORRA LA CONFIGURACION
  const deletePreset = (id) => {
    setPresets(presets.filter((p) => p.id !== id));
  };

  // APLICA LA CONFIGURACION ACTUAL
  const applyPreset = (id) => {
    let current = presets.find((c) => c.id === id);
    setSettings(current.settings);
    setEffects(current.effects);
    // console.log(p.settings);
    // console.log(p.effects);
    // setCurrentPreset(current);
  };

  useEffect(() => {
    localStorage.setItem("presets", JSON.stringify(presets));
  }, [presets]);

  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(counter));
  }, [counter]);

  // CAMBIA EL NOMBRE DE LA CONFIGURACION
  const onPresetNameChange = (e) => {
    // INVESTIGAR ESTO, HABILITAR EL MODO TIPEO PARA EVITAR QUE SUENE LA GUITARRA CUANDO USE EL TECLADO

    // ¿Esto desactiva la tecla espacio????
    // e.preventDefault();
    handlerPresetName(true);
    console.log("Modo de tipeo " + typeMode);
    setPresetName(e.target.value);
  };

  const handlerPresetName = (boolean) => {
    setTypeMode(boolean);
  };

  // RESETEA TODAS LAS CONFIGURACIONES A SU VALOR INICIAL
  const onClickDefaultConfig = () => {
    setEffects(initialEffects);
    setSettings(initialSettings);
  };

  // CONFIGURACION SELECCIONADA (no sirve)
  // const handlerPresetSelected = (preset) => {
  //   setCurrentPreset({ preset });
  // };

  // const { distortion, reverb, delay } = effects;

  // GANANCIA O VOLUMEN (solamente si se utiliza un <input> de tipo checkbox en lugar de un boton)
  const onChangeEnabledGain = () => {
    setEffects((e) => ({
      ...e,
      gain: {
        ...e.gain,
        enabled: !e.gain.enabled,
      },
    }));

    // SOLAMENTE SI SE UTILIZA UN INPUT DE TIPO CHECKBOX
    // setMessage(
    //   !event.target.checked
    //     ? "Se deshabilito el efecto de ganancia de volumen"
    //     : "Se habilito el efecto de ganancia de volumen"
    // );

    setMessage(
      !effects.gain.enabled
        ? "Se habilito la ganancia de volumen"
        : "Se deshabilito la ganancia de volumen"
    );
  };

  const onChangeGain = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      gain: {
        ...e.gain,
        gain: +value,
      },
    }));

    setMessage(`El volumen se establecio en un ${parseInt(value * 100)} %`);
  };

  // EFECTOS PARA LA DISTORSION DE LA GUITARRA
  const onChangeEnabledDistortion = () => {
    setEffects((e) => ({
      ...e,
      distortion: {
        ...e.distortion,
        enabled: !e.distortion.enabled,
      },
    }));

    // setMessage("Se habilito el efecto de sonido de distorsion");

    // setMessage(
    //   !event.target.checked
    //     ? "Se deshabilito el efecto de sonido de distorsion"
    //     : "Se habilito el efecto de sonido de distorsion"
    // );

    setMessage(
      !effects.distortion.enabled
        ? "Se habilito el efecto de distorción"
        : "Se deshabilito el efecto de distorción"
    );
  };

  const onChangeDistortion = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      distortion: {
        ...e.distortion,
        distortion: +value,
      },
    }));

    setMessage(`La distorsión se establecio en un ${parseInt(value * 100)} %`);
  };

  // const onChangeOversample = (value) => {
  //   setEffects((e) => ({
  //     ...e,
  //     distortion: {
  //       ...e.distortion,
  //       oversample: value,
  //     },
  //   }));
  // };

  // EFECTOS DE SONIDO PARA REVERB O ECO
  const onChangeEnabledReverb = () => {
    setEffects((e) => ({
      ...e,
      reverb: {
        ...e.reverb,
        enabled: !e.reverb.enabled,
      },
    }));

    setMessage(
      !effects.reverb.enabled
        ? "Se habilito el efecto de reverberación"
        : "Se deshabilito el efecto de reverberación"
    );
  };

  const onChangeDecay = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      reverb: {
        ...e.reverb,
        decay: +value,
      },
    }));

    setMessage(`El decaimiento se establecio en ${value} segundos`);
  };

  // const onChangePreDelay = ({ target: { value } }) => {
  //   setEffects((e) => ({
  //     ...e,
  //     reverb: {
  //       ...e.reverb,
  //       preDelay: +value,
  //     },
  //   }));
  // };

  // EFECTOS DE SONIDO PARA DELAY O RETRAZO
  const onChangeEnabledFeedbackDelay = () => {
    setEffects((e) => ({
      ...e,
      feedbackDelay: {
        ...e.feedbackDelay,
        enabled: !e.feedbackDelay.enabled,
      },
    }));

    setMessage(
      !effects.feedbackDelay.enabled
        ? "Se habilito el efecto de retraso dinamico"
        : "Se deshabilito el efecto de retraso dinamico"
    );
  };

  const onChangeDelayTime = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      feedbackDelay: {
        ...e.feedbackDelay,
        delayTime: +value,
      },
    }));

    setMessage(`El tiempo de retraso se establecio en ${value} segundo(s)`);
  };

  const onChangeFeedback = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      feedbackDelay: {
        ...e.feedbackDelay,
        feedback: +value,
      },
    }));

    setMessage(
      `Se establecio una retroalimentación de ${parseInt(value * 100)} %`
    );
  };

  // VIBRATO
  const onChangeEnabledVibrato = () => {
    setEffects((e) => ({
      ...e,
      vibrato: {
        ...e.vibrato,
        enabled: !e.vibrato.enabled,
      },
    }));

    setMessage(
      !effects.vibrato.enabled
        ? "Se habilito el efecto de vibrato"
        : "Se deshabilito el efecto de vibrato"
    );
  };

  const onChangeFrequency = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      vibrato: {
        ...e.vibrato,
        frequency: +value,
      },
    }));

    setMessage(`La frecuencia se establecio en ${value} segundo(s)`);
  };

  const onChangeDepth = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      vibrato: {
        ...e.vibrato,
        depth: +value,
      },
    }));

    setMessage(`Se establecio una profundidad de ${parseInt(value * 100)} %`);
  };

  // ECUALIZADOR
  const onChangeEnabledEq3 = () => {
    setEffects((e) => ({
      ...e,
      eq3: {
        ...e.eq3,
        enabled: !e.eq3.enabled,
      },
    }));

    setMessage(
      !effects.vibrato.enabled
        ? "Se habilito el ecualizador de 3 niveles"
        : "Se deshabilito el ecualizador de 3 niveles"
    );
  };

  const onChangeLowLevel = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      eq3: {
        ...e.eq3,
        lowLevel: +value,
      },
    }));

    setMessage(`Se establecio los bajos en ${value} db.`);
  };

  const onChangeMidLevel = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      eq3: {
        ...e.eq3,
        midLevel: +value,
      },
    }));

    setMessage(`Se establecio los medios en ${value} db.`);
  };

  const onChangeHighLevel = ({ target: { value } }) => {
    setEffects((e) => ({
      ...e,
      eq3: {
        ...e.eq3,
        highLevel: +value,
      },
    }));

    setMessage(`Se establecio los altos en ${value} db.`);
  };

  // const onChangeLockZero = () => {
  //   setSettings((s) => ({
  //     // Utiliza el operador Spread para clonar las propiedades del objeto settings
  //     ...s,
  //     // Se establece el valor inverso de la propiedad lockZeroChord
  //     lockZeroChord: !s.lockZeroChord,
  //   }));

  // Una forma de solucionarlo es limpiar el temporizador anterior antes de configurar uno nuevo:
  useEffect(() => {
    // Establece que la función se ejecutara luego de 5 segundos
    const timeoutMessage = setTimeout(() => {
      setMessage("...");
    }, 5000);

    return () => clearTimeout(timeoutMessage);
  }, [message]);

  // Se repite el mismo procedimiento...
  // Efecto secundario para cargar la data de la guitarra luego de 1 segundo
  useEffect(() => {
    const timeoutData = setTimeout(() => {
      loadData();
    }, 1000);

    return () => clearTimeout(timeoutData);
  }, []);

  // Efecto secundario para almacenar el mastil actualizado
  useEffect(() => {
    const updatedNeck = assignKeysToFrets(
      initialNeck,
      // ...initialOrderRopes,
      ...typeKeyboard,
      initialChord,
      lockZeroChord,
      invertKeyboard
    );
    setNewNeck(updatedNeck);
  }, [initialNeck, typeKeyboard, initialChord, lockZeroChord, invertKeyboard]);

  // Efecto secundario para manejar los eventos del teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      // event.code es una propiedad en JavaScript que identifica qué tecla se ha presionado devolviendo
      // un valor específico que es independiente de la configuración regional o del idioma del teclado.

      if (event.repeat) return; // Evita que la acción se repita si la tecla está sostenida

      // if (event.code === "Space" && typeMode === true) {
      //   return;
      // }

      // // SI O SI DEBE SER EN typeMode en True
      // // && typeMode === false
      // if (event.code === "Space" && typeMode === false) {
      //   // Previene el comportamiento de scroll en la tecla Espacio (NO FUNCIONA)
      //   // event.preventDefault();
      //   // Llama a muteAll si se presiona Espacio
      //   muteAll();
      //   return; // Salir temprano para que no ejecute la lógica de reproducción
      // }

      // ¿MEJORA?
      if (event.code === "Space") {
        if (typeMode === true) {
          return;
        } else {
          // Previene el comportamiento de scroll en la tecla Espacio (NO FUNCIONA)
          event.preventDefault();
          // Llama a muteAll si se presiona Espacio
          muteAll();
          return; // Salir temprano para que no ejecute la lógica de reproducción
        }
      }

      // Se aplica la misma logica para las demás teclas como la tecla CTRL izquierda
      if (event.code === "ControlLeft") {
        event.preventDefault();
        onChangeLockZero();
        return;
      }

      // Tab
      if (event.code === "Tab") {
        event.preventDefault();
        onMutePreviousChord();
        return;
      }

      // ALT izquierdo
      if (event.code === "AltLeft") {
        event.preventDefault();
        onChangeInvertKeyboard();
        return;
      }

      // Bloquear numeros (Bloq Num)
      if (event.code === "NumLock") {
        event.preventDefault();
        onChangepulseMode();
        return;
      }

      // Tecla ESC
      if (event.code === "Escape") {
        event.preventDefault();
        onChangeShowKeyboard();
        return;
      }

      // ... Para asignar las flechas derechas e izquierda, tengo pensado implementar otros controles en la guitarra :)
    };

    // Escucha el evento de presionar tecla
    window.addEventListener("keydown", handleKeyDown);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

    // ¿Porque dependera de message?
  }, [message]);

  useEffect(() => {
    // const handleKeyDown = (event) => {
    //   // QuerySelector
    //   const note = document.querySelector(`.note[data-key="${event.key}"]`);
    //   if (note) note.classList.add("active");
    // };

    // const handleKeyUp = (event) => {
    //   const note = document.querySelector(`.note[data-key="${event.key}"]`);
    //   if (note) note.classList.remove("active");
    // };

    const handleKeyDown = (event) => {
      // QuerySelector con el selector de módulo CSS
      const note = document.querySelector(
        `.${styles.note}[data-key="${event.key}"]`
      );
      if (note) note.classList.add(styles.active);
    };
    const handleKeyUp = (event) => {
      const note = document.querySelector(
        `.${styles.note}[data-key="${event.key}"]`
      );
      if (note) note.classList.remove(styles.active);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Limpia los eventos al desmontar el componente
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Función para cargar la data de la guitarra
  const loadData = () => {
    // Si initialNeck esta definido, cambia el estado de loading a false
    if (initialNeck) {
      setLoading(false);
      console.log("Carga de la data inicial completada.");
    }
  };

  // Función para mostrar en consola la nota actual y la nota anterior que fue reproducida (solamente para pruebas)
  const handleNotePlayed = (currentNote) => {
    setNotePlayed(currentNote);

    // Mensajes en la consola
    console.log(
      `La nota actual desde GuitarPage es ${currentNote.rope} : ${currentNote.chord}`
    );
    console.log(
      `La nota anterior desde GuitarPage es ${notePlayed.rope} : ${notePlayed.chord}`
    );
  };

  // Función para cambiar el acorde inicial
  // event.target.value
  const onChangeRangeNotes = ({ target: { value } }) => {
    setSettings((s) => ({
      ...s,
      initialChord: +value,
    }));

    // Muestra un mensaje con la ubicación del acorde inicial
    setMessage(`Se establecio el acorde inicial en ${value}.`);
  };

  // Función para establecer si se va a bloquear el acorde 0
  const onChangeLockZero = () => {
    setSettings((s) => ({
      // Utiliza el operador Spread para clonar las propiedades del objeto settings
      ...s,
      // Se establece el valor inverso de la propiedad lockZeroChord
      lockZeroChord: !s.lockZeroChord,
    }));

    // Es recomendable hacer el uso del operador ternario en lugar de un if y else
    // if (lockZeroChord === false) {
    //     setMessage(`Se ha bloqueado el acorde 0, puedes establecer el acorde inicial, pero no se movera el acorde 0`)
    // } else {
    //     setMessage(`Se ha desbloqueado el acorde 0, puedes establecer el acorde inicial de forma libre`)
    // }

    setMessage(
      !lockZeroChord
        ? `Se ha bloqueado el acorde 0. Puedes establecer el acorde inicial, pero no se movera el acorde 0.`
        : `Se ha desbloqueado el acorde 0. Puedes establecer el acorde inicial de forma libre.`
    );

    // Se establece el nuevo acorde inicial para evitar un error al ocultar acordes en la guitarra
    // Se recomienda usar un operador ternario
    // if (lockZeroChord === true && initialChord === 13) {
    //     setSettings(s => ({
    //         ...s,
    //         initialChord: 12
    //     }))
    // }

    setSettings((s) => ({
      ...s,
      initialChord: lockZeroChord && initialChord === 13 ? 12 : s.initialChord,
    }));

    // if (lockZeroChord === true && initialChord === 0) {
    //     setSettings(s => ({
    //         ...s,
    //         initialChord: 1
    //     }))
    // }

    setSettings((s) => ({
      ...s,
      initialChord: lockZeroChord && initialChord === 0 ? 1 : s.initialChord,
    }));
  };

  // Función para establecer si se va a invertir el teclado o no
  const onChangeInvertKeyboard = () => {
    setSettings((s) => ({
      ...s,
      invertKeyboard: !s.invertKeyboard,
    }));

    // if (invertKeyboard === false) {
    //     setMessage(`Las teclas fueron invertidas`)
    // } else {
    //     setMessage(`Las teclas no fueron invertidas`)
    // }

    setMessage(
      !invertKeyboard
        ? `Las teclas asignadas en la guitarra fueron invertidas.`
        : `Las teclas asignadas en la guitarra no fueron invertidas.`
    );
  };

  // Función para cambiar el modo de asignación de teclas por cada cuerda de la guitarra
  const onChangeModeKeyboard = (value) => {
    setSettings((s) => ({
      ...s,
      // JSON.parse es un metodo para transformar un String en un objeto
      // Recuerda que en JavaScript un arreglo es un objeto, porque un arreglo es una colección
      // de pares de indice y elemento, mientras que un objeto contiene pares de propiedades (nombre y valor)
      typeKeyboard: JSON.parse("[" + value + "]"),
    }));
    setMessage(
      `Se cambiaron las filas del teclado. Asegurate de desactivar la tecla Bloq Mayús.`
    );
  };

  // Función para establecer si se va a silenciar el acorde anterior reproducido o no
  // Por lo general se utiliza para silenciar la nota anterior que fue tocada en una cuerda diferente
  const onMutePreviousChord = () => {
    setSettings((s) => ({
      ...s,
      mutePreviousChord: !s.mutePreviousChord,
    }));

    // if (mutePreviousChord === false) {
    //     setMessage(`Se activo el modo de silenciar nota anterior`)
    // } else {
    //     setMessage(`Se desactivo el modo de silenciar nota anterior`)
    // }

    setMessage(
      !mutePreviousChord
        ? `Se activo el modo de silenciar nota anterior. Puedes tocar 2 notas que no pertenezcan a la misma cuerda para notar la diferencia.`
        : `Se desactivo el modo de silenciar nota anterior.`
    );
  };

  // Función para establecer si se va a activar el modo pulso o no
  const onChangepulseMode = () => {
    setSettings((s) => ({
      ...s,
      pulseMode: !s.pulseMode,
    }));

    // if (pulseMode === false) {
    //     setMessage(`Se activo el modo pulso (manten pulsada una tecla o un clic para reproducir la nota)`)
    // } else {
    //     setMessage(`Se desactivo el modo pulso (pulsa una tecla o un clic para reproducir la nota)`)
    // }

    setMessage(
      !pulseMode
        ? `Se activo el modo pulso. Manten pulsada una tecla o un clic para reproducir la nota.`
        : `Se desactivo el modo pulso. Pulsa una tecla o un clic para reproducir la nota.`
    );
  };

  // Función para cambiar el volumen
  // const onChangeVolume = ({ target: { value } }) => {
  //   setSettings((s) => ({
  //     ...s,
  //     // El operador unario (+) sirve para convertir un String a number
  //     volume: +value,
  //   }));
  //   // la función global parseInt realiza el mismo procedimiento
  //   // opcionalmente puede llevar un segundo argumento que representa la base numerica (por defecto base 10 o decimal)
  //   setMessage(
  //     `El volumen se ha establecido en un ${parseInt(value * 100, 10)}%.`
  //   );
  // };

  // Función para mostrar u ocultar las teclas en pantalla
  const onChangeShowKeyboard = () => {
    setSettings((s) => ({
      ...s,
      showKeyboard: !showKeyboard,
    }));

    setMessage(
      !showKeyboard
        ? `Puedes ver las teclas asignadas en pantalla.`
        : `No puedes ver las teclas asignadas en pantalla.`
    );
  };

  // Función para redireccionar a la pagina de inicio
  const redirectStartPage = () => {
    // Silencia todas las notas reproducidas
    muteAll();
    // Redirige al endpoint "/", la pagina de inicio
    navigate("/");
  };

  // El hook devuelve un objeto con propiedades y metodos que se van a utilizar en otros componentes
  return {
    data,
    first,
    last,
    middle,
    alternate,
    loading,
    newNeck,
    initialChord,
    lockZeroChord,
    invertKeyboard,
    typeKeyboard,
    mutePreviousChord,
    pulseMode,
    //volume,
    showKeyboard,
    handleNotePlayed,
    onChangeRangeNotes,
    onChangeModeKeyboard,
    // onChangeVolume,
    redirectStartPage,
    onChangeLockZero,
    onChangeInvertKeyboard,
    onMutePreviousChord,
    onChangepulseMode,
    onChangeShowKeyboard,
    message,
    effects,
    // setEffects,
    onChangeEnabledGain,
    onChangeGain,
    onChangeEnabledDistortion,
    onChangeDistortion,
    // onChangeOversample,
    onChangeEnabledReverb,
    onChangeDecay,
    // onChangePreDelay,
    onChangeEnabledFeedbackDelay,
    onChangeDelayTime,
    onChangeFeedback,
    onChangeEnabledVibrato,
    onChangeFrequency,
    onChangeDepth,
    onChangeEnabledEq3,
    onChangeLowLevel,
    onChangeMidLevel,
    onChangeHighLevel,

    // CONFIGURACIONES
    presets,
    saveCurrentConfig,
    applyPreset,
    presetName,
    onPresetNameChange,
    deletePreset,
    setTypeMode,
    typeMode,
    // currentPreset,
    // handlerPresetSelected,
    onClickDefaultConfig,
    handlerPresetName,
  };
};
