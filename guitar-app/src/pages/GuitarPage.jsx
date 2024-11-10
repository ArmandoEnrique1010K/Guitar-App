import { useNavigate } from "react-router-dom"
import { NeckView } from "../components/NeckView"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getNotes } from "../services/getNotes"
import { assignKeysToFrets } from "../services/assignKeysToFrets"
import { muteAll, preloadSounds } from "../services/audioPlayer"

// Orden por defecto de las cuerdas de una guitarra
const initialOrderRopes = [6, 5, 4, 3, 2, 1]

// Función principal del componente, recibe 2 propiedades (props): data y name
export const GuitarPage = ({ data, name, nameGuitar }) => {

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

    // Estado para las configuraciones de la guitarra
    const [settings, setSettings] = useState({
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
        volume: 1,
        // Mostrar las teclas en pantalla
        showKeyboard: true,
    })

    // Desestructura el objeto settings para obtener sus propiedades como variables
    const { initialChord, lockZeroChord, invertKeyboard, typeKeyboard, mutePreviousChord, pulseMode, volume, showKeyboard } = settings;

    // Estado para almacenar la nota actual y la nota anterior (solamente para pruebas)
    const [notePlayed, setNotePlayed] = useState({
        rope: null,
        chord: null,
    });

    // Una buena opción podria ser el uso de useMemo en lugar de llamar a la función para obtener el arreglo de las notas de la guitarra
    // const initialNeck = useMemo(() => getNotes(data), [data]);
    const initialNeck = getNotes(data)

    // Llama a la función para precargar las notas de la guitarra por el nombre de la guitarra
    preloadSounds(name);

    // useNavigate es un hook que permite navegar entre paginas web
    // Es una alternativa a <NavLink></NavLink> de React Router
    const navigate = useNavigate()

    // Efecto secundario para el mensaje que se muestra en la pantalla
    // Cuando message cambia, el setTimeout se reinicia, pero no se cancela el temporizador anterior. 
    // useEffect(() => {
    //     if (message !== "...") {
    //         setTimeout(() => {
    //             setMessage("...")
    //         }, 5000)
    //     }
    // }, [message])

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
    }, [])

    // Efecto secundario para almacenar el mastil actualizado
    useEffect(() => {
        const updatedNeck = assignKeysToFrets(
            initialNeck,
            ...initialOrderRopes,
            ...typeKeyboard,
            initialChord,
            lockZeroChord,
            invertKeyboard
        )
        setNewNeck(updatedNeck);
    }, [initialNeck, typeKeyboard, initialChord, lockZeroChord, invertKeyboard])


    // Efecto secundario para manejar los eventos del teclado
    useEffect(() => {
        const handleKeyDown = (event) => {
            // event.code es una propiedad en JavaScript que identifica qué tecla se ha presionado devolviendo 
            // un valor específico que es independiente de la configuración regional o del idioma del teclado.

            if (event.repeat) return; // Evita que la acción se repita si la tecla está sostenida


            if (event.code === "Space") {
                // Previene el comportamiento de scroll en la tecla Espacio
                event.preventDefault();
                // Llama a muteAll si se presiona Espacio
                muteAll();
                return; // Salir temprano para que no ejecute la lógica de reproducción
            }

            // Se aplica la misma logica para las demás teclas
            if (event.code === "ControlLeft") {
                event.preventDefault();
                onChangeLockZero()
                return;
            }

            if (event.code === "Tab") {
                event.preventDefault();
                onMutePreviousChord()
                return;

            }

            if (event.code === "AltLeft") {
                event.preventDefault();
                onChangeInvertKeyboard()
                return;

            }

            if (event.code === "NumLock") {
                event.preventDefault();
                onChangepulseMode()
                return;
            }

            // Tecla Esc
            if (event.code === "Escape") {
                event.preventDefault();
                onChangeShowKeyboard()
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

    // Función para cargar la data de la guitarra
    const loadData = () => {
        // Si initialNeck esta definido, cambia el estado de loading a false
        if (initialNeck) {
            setLoading(false)
            console.log("Carga de la data inicial completada.");
        }
    }

    // Función para mostrar en consola la nota actual y la nota anterior que fue reproducida (solamente para pruebas)
    const handleNotePlayed = (currentNote) => {
        setNotePlayed(currentNote);

        // Mensajes en la consola
        console.log(`La nota actual desde GuitarPage es ${currentNote.rope} : ${currentNote.chord}`)
        console.log(`La nota anterior desde GuitarPage es ${notePlayed.rope} : ${notePlayed.chord}`)
    }

    // Función para cambiar el acorde inicial
    // event.target.value
    const onChangeRangeNotes = ({ target: { value } }) => {
        setSettings(s => ({
            ...s,
            initialChord: +value
        }));

        // Muestra un mensaje con la ubicación del acorde inicial
        setMessage(`Se establecio el acorde inicial en ${value}.`)
    }


    // Función para establecer si se va a bloquear el acorde 0
    const onChangeLockZero = () => {
        setSettings(s => ({
            // Utiliza el operador Spread para clonar las propiedades del objeto settings
            ...s,
            // Se establece el valor inverso de la propiedad lockZeroChord
            lockZeroChord: !s.lockZeroChord,
        }))

        // Es recomendable hacer el uso del operador ternario en lugar de un if y else
        // if (lockZeroChord === false) {
        //     setMessage(`Se ha bloqueado el acorde 0, puedes establecer el acorde inicial, pero no se movera el acorde 0`)
        // } else {
        //     setMessage(`Se ha desbloqueado el acorde 0, puedes establecer el acorde inicial de forma libre`)
        // }

        setMessage(!lockZeroChord
            ?
            `Se ha bloqueado el acorde 0. Puedes establecer el acorde inicial, pero no se movera el acorde 0.`
            :
            `Se ha desbloqueado el acorde 0. Puedes establecer el acorde inicial de forma libre.`)

        // Se establece el nuevo acorde inicial para evitar un error al ocultar acordes en la guitarra
        // Se recomienda usar un operador ternario
        // if (lockZeroChord === true && initialChord === 13) {
        //     setSettings(s => ({
        //         ...s,
        //         initialChord: 12
        //     }))
        // }

        setSettings(s => ({
            ...s,
            initialChord: lockZeroChord && initialChord === 13 ? 12 : s.initialChord
        }));

        // if (lockZeroChord === true && initialChord === 0) {
        //     setSettings(s => ({
        //         ...s,
        //         initialChord: 1
        //     }))
        // }

        setSettings(s => ({
            ...s,
            initialChord: lockZeroChord && initialChord === 0 ? 1 : s.initialChord
        }));

    }

    // Función para establecer si se va a invertir el teclado o no
    const onChangeInvertKeyboard = () => {
        setSettings(s => ({
            ...s,
            invertKeyboard: !s.invertKeyboard
        }))

        // if (invertKeyboard === false) {
        //     setMessage(`Las teclas fueron invertidas`)
        // } else {
        //     setMessage(`Las teclas no fueron invertidas`)
        // }

        setMessage(!invertKeyboard
            ?
            `Las teclas asignadas en la guitarra fueron invertidas.`
            :
            `Las teclas asignadas en la guitarra no fueron invertidas.`)

    }

    // Función para cambiar el modo de asignación de teclas por cada cuerda de la guitarra
    const onChangeModeKeyboard = (value) => {
        setSettings(s => ({
            ...s,
            // JSON.parse es un metodo para transformar un String en un objeto
            // Recuerda que en JavaScript un arreglo es un objeto, porque un arreglo es una colección
            // de pares de indice y elemento, mientras que un objeto contiene pares de propiedades (nombre y valor)
            typeKeyboard: JSON.parse("[" + value + "]"),
        }))
        setMessage(`Se cambiaron las filas del teclado. Asegurate de desactivar la tecla Bloq Mayús.`)

    }


    // Función para establecer si se va a silenciar el acorde anterior reproducido o no
    // Por lo general se utiliza para silenciar la nota anterior que fue tocada en una cuerda diferente
    const onMutePreviousChord = () => {
        setSettings(s => ({
            ...s,
            mutePreviousChord: !s.mutePreviousChord,
        }))

        // if (mutePreviousChord === false) {
        //     setMessage(`Se activo el modo de silenciar nota anterior`)
        // } else {
        //     setMessage(`Se desactivo el modo de silenciar nota anterior`)
        // }

        setMessage(!mutePreviousChord
            ?
            `Se activo el modo de silenciar nota anterior. Puedes tocar 2 notas que no pertenezcan a la misma cuerda para notar la diferencia.`
            :
            `Se desactivo el modo de silenciar nota anterior.`)

    }


    // Función para establecer si se va a activar el modo pulso o no
    const onChangepulseMode = () => {
        setSettings(s => ({
            ...s,
            pulseMode: !s.pulseMode,
        }))

        // if (pulseMode === false) {
        //     setMessage(`Se activo el modo pulso (manten pulsada una tecla o un clic para reproducir la nota)`)
        // } else {
        //     setMessage(`Se desactivo el modo pulso (pulsa una tecla o un clic para reproducir la nota)`)
        // }

        setMessage(!pulseMode
            ?
            `Se activo el modo pulso. Manten pulsada una tecla o un clic para reproducir la nota.`
            :
            `Se desactivo el modo pulso. Pulsa una tecla o un clic para reproducir la nota.`)

    }

    // Función para cambiar el volumen
    const onChangeVolume = ({ target: { value } }) => {
        setSettings(s => ({
            ...s,
            // El operador unario (+) sirve para convertir un String a number
            volume: +value,
        }))
        // la función global parseInt realiza el mismo procedimiento
        // opcionalmente puede llevar un segundo argumento que representa la base numerica (por defecto base 10 o decimal)
        setMessage(`El volumen se ha establecido en un ${parseInt((value) * 100, 10)}%.`)
    }

    // Función para mostrar u ocultar las teclas en pantalla
    const onChangeShowKeyboard = () => {
        setSettings(s => ({
            ...s, showKeyboard: !showKeyboard,
        }))

        setMessage(!showKeyboard
            ?
            `Puedes ver las teclas asignadas en pantalla.`
            :
            `No puedes ver las teclas asignadas en pantalla.`)
    }

    // Función para redireccionar a la pagina de inicio
    const redirectStartPage = () => {
        // Silencia todas las notas reproducidas
        muteAll()
        // Redirige al endpoint "/", la pagina de inicio
        navigate("/")
    }

    return (
        <>
            <div className="container">

                {loading === true
                    ? <div className="loading-spinner-container"><img src="/spinners/Spinner-200px.svg"></img></div>
                    : <>
                        <div className="guitar-container">
                            {/* Contenedor para el titulo */}
                            <div className="title-container">
                                <button className="button-title"><img width="25px" src="/icons/info-square.svg"></img></button>
                                <div className="title-container-separator"></div>
                                <div className="title-text">{nameGuitar}</div>
                                <div className="title-container-separator"></div>
                                <button className="button-title" onClick={redirectStartPage}><img width="25px" src="/icons/close-square.svg"></img></button>
                            </div>

                            <div className="principal-separator"></div>

                            {/* Contenedor principal */}
                            <div className="principal-container">
                                <NeckView neck={newNeck} name={name} data={data} handleNotePlayed={handleNotePlayed} mutePreviousChord={mutePreviousChord} pulseMode={pulseMode} volume={volume} message={message} showKeyboard={showKeyboard} />

                                {/* <input> de tipo rango para establecer el acorde inicial */}

                                {/* <label htmlFor="rangeNotes">Empezar desde el acorde {initialChord}</label>*/}
                                <div className="range-notes-container">
                                    <input
                                        className="range-notes"
                                        type="range"
                                        name="rangeNotes"
                                        id="rangeNotes"
                                        min={lockZeroChord === false ? 0 : 1}
                                        max={lockZeroChord === false ? 12 : 13}
                                        step={1}
                                        value={initialChord} onChange={onChangeRangeNotes}
                                    />
                                </div>

                                {/* Crea un arreglo (no utilizar esto) */}
                                {/* // Si lockZeroChord es false, empieza en 0, si es true, empieza en 1 */}
                                {/* <div className="array-range-notes-container">
                                    {Array.from({ length: 13 }, (_, i) =>
                                        (lockZeroChord === false ? i : i + 1).toString()
                                    ).map((value, index) => (
                                        <div key={index} className="element-range-note" value={value}></div>
                                    ))
                                    }
                                </div> */}

                                {/* Contenedor para las opciones */}
                                <div className="options-container">
                                    <div className="option-group">

                                        <div className="button-option-container">
                                            <div className="button-light-container">
                                                <button className="button-option" onClick={onChangeLockZero}>
                                                    <img src="/icons/zero-circle-fill.svg" width="25px" alt="" />
                                                </button>
                                                <div className="light-container">
                                                    <div className={lockZeroChord === false ? "option-light-off" : "option-light-on"}></div>
                                                </div>
                                            </div>
                                            {showKeyboard === true ? (<div className="option-keyboard">CTRL left</div>) : ""}
                                        </div>

                                        <div className="button-option-container">
                                            <div className="button-light-container">
                                                <button className="button-option" onClick={onChangeInvertKeyboard}>
                                                    <img src="/icons/invert.svg" width="25px" alt="" />
                                                </button>
                                                <div className="light-container">
                                                    <div className={invertKeyboard === false ? "option-light-off" : "option-light-on"}></div>
                                                </div>
                                            </div>
                                            {showKeyboard === true ? (<div className="option-keyboard">ALT left</div>) : ""}

                                        </div>

                                        <div className="button-option-container">
                                            <div className="button-light-container">

                                                <button className="button-option" onClick={onMutePreviousChord}>
                                                    <img src="/icons/music-black-note-shape.svg" width="25px" alt="" />
                                                </button>
                                                <div className="light-container">
                                                    <div className={mutePreviousChord === false ? "option-light-off" : "option-light-on"}></div>
                                                </div>

                                            </div>
                                            {showKeyboard === true ? (<div className="option-keyboard">TAB</div>) : ""}

                                        </div>

                                        <div className="button-option-container">
                                            <div className="button-light-container">

                                                <button className="button-option" onClick={onChangepulseMode}>
                                                    <img src="/icons/pulse.svg" width="25px" alt="" />
                                                </button>
                                                <div className="light-container">
                                                    <div className={pulseMode === false ? "option-light-off" : "option-light-on"}></div>
                                                </div>
                                            </div>
                                            {showKeyboard === true ? (<div className="option-keyboard">Bloq Num</div>) : ""}

                                        </div>

                                        <div className="button-option-container">
                                            <div className="button-light-container">

                                                <button className="button-option" onClick={onChangeShowKeyboard}>
                                                    <img src="/icons/eye.svg" width="25px" alt="" />
                                                </button>
                                                <div className="light-container">
                                                    <div className={showKeyboard === false ? "option-light-off" : "option-light-on"}></div>
                                                </div>
                                            </div>
                                            {showKeyboard === true ? (<div className="option-keyboard">ESC</div>) : ""}

                                        </div>

                                        <div className="button-option-container select-mode">
                                            <select onChange={() => onChangeModeKeyboard(event.target.value)} name="modeKeys" id="selectModeKeys">
                                                <option value={first}>First</option>
                                                <option value={last}>Last</option>
                                                <option value={middle}>Middle</option>
                                                <option value={alternate}>Alternate</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="option-group">
                                        <div className="button-option-container volume-range">
                                            <input
                                                className="range-notes"
                                                type="range"
                                                name="Volume"
                                                id="rgAmplificador"
                                                min={0}
                                                max={2}
                                                step={0.1}
                                                value={volume} onChange={onChangeVolume} />
                                        </div>
                                    </div>

                                    <div className="option-group">
                                        <div className="button-option-container">
                                            <button className="button-muteAll-option" onClick={muteAll}><img src="/icons/mute.svg" alt="" width="25px" /></button>
                                            {showKeyboard === true ? (<div className="option-keyboard">Space</div>) : ""}

                                        </div>

                                    </div>

                                </div>
                                <div className="principal-separator"></div>


                            </div>

                        </div>


                    </>}
            </div>

        </>
    )
}

// Define propTypes para especificar el tipo de dato que se pasa entre componentes
GuitarPage.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string,
    nameGuitar: PropTypes.string,
}