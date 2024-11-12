import { NeckView } from "../components/NeckView"
import PropTypes from "prop-types"
import { muteAll, } from "../services/audioPlayer"
import { useGuitar } from "../hooks/useGuitar"

// Función principal del componente, recibe 2 propiedades (props): data y name
export const GuitarPage = ({ data, name, nameGuitar }) => {

    // Llama al hook personalizado, solamente se utiliza las propiedades y metodos requeridos en la vista del usuario
    const {
        first,
        last,
        middle,
        alternate,
        loading,
        newNeck,
        initialChord,
        lockZeroChord,
        invertKeyboard,
        // typeKeyboard,
        mutePreviousChord,
        pulseMode,
        volume,
        showKeyboard,
        handleNotePlayed,
        onChangeRangeNotes,
        onChangeModeKeyboard,
        onChangeVolume,
        redirectStartPage,
        onChangeLockZero,
        onChangeInvertKeyboard,
        onMutePreviousChord,
        onChangepulseMode,
        onChangeShowKeyboard,
        message,

    } = useGuitar(data, name)


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