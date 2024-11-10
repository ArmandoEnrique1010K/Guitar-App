import { useEffect } from "react";
import { muteCurrentNote, playSound } from "../services/audioPlayer";
import PropTypes from "prop-types";

export const ChordView = ({ data, chord, rope, keyfromkeyboard, name, handleNotePlayed, mutePreviousChord, pulseMode, volume, showKeyboard }) => {


    const note = { rope, chord };


    const handlePlaySound = (clickMode) => {

        handleNotePlayed(note);
        playSound(name, data, rope, chord, mutePreviousChord, volume, keyfromkeyboard, clickMode);

    };

    const handleStopSound = () => {
        muteCurrentNote()
        // setIsPlayed(false); // Marca la nota como detenida

    }


    useEffect(() => {
        const handleKeyDownPlaySound = (event) => {
            if (event.key === keyfromkeyboard) {
                handlePlaySound(false)
            }

        };

        const handleKeyUpStopSound = (event) => {
            // Si se suelta la tecla asignada y pulseMode es falso, se silencia la nota actual
            if (event.key === keyfromkeyboard && pulseMode === true) {
                //setIsPlayed(false)
                handleStopSound();
            }
        };

        window.addEventListener("keydown", handleKeyDownPlaySound);
        window.addEventListener("keyup", handleKeyUpStopSound);


        return () => {
            window.removeEventListener("keydown", handleKeyDownPlaySound);
            window.removeEventListener("keyup", handleKeyUpStopSound);

        };

    }, [keyfromkeyboard, pulseMode, handleNotePlayed]);


    return (<>
        {
            /*
                    <button type="button" onClick={pulseMode || handlePlaySound} onMouseDown={!pulseMode || handleStopSound}> /
                `/Tecla: ${keyfromkeyboard}`} / {rope} - {chord} /
        </button >
    
            */
        }


        {/* onKeyUp={pulseMode === false || handleStopSound} */}
        {/* className dinamico, permite insertar una propiedad como un String */}
        <div className={`chord-container rope-${rope} chord-${chord}`}>
            <div
                className="chord-button"
                type="button"
                onMouseDown={() => {
                    // Evento de click del raton
                    if (pulseMode /* && !isPlayed*/) handlePlaySound(true);
                }}
                //onKeyDown={handleIsPlayedTrue}
                //onKeyUp={handleIsPlayedFalse}
                onMouseUp={() => {
                    if (pulseMode) handleStopSound();
                }}
                onClick={() => {
                    // Clic para modo sin pulsación
                    if (!pulseMode) handlePlaySound(true);
                }}
            >
                <div className="note-rope">
                    <div className="key-rope">
                        {/* Muestra las teclas si showKeyboard es igual a true */}
                        {showKeyboard === true ?
                            keyfromkeyboard === undefined ? "" : keyfromkeyboard
                            : ""}
                    </div>
                </div>
            </div>
        </div>

    </>)
}

ChordView.propTypes = {
    data: PropTypes.array,
    chord: PropTypes.number,
    rope: PropTypes.number,
    keyfromkeyboard: PropTypes.string,
    name: PropTypes.string,
    handleNotePlayed: PropTypes.func,
    mutePreviousChord: PropTypes.bool,
    pulseMode: PropTypes.bool,
    volume: PropTypes.number,
    showKeyboard: PropTypes.bool,
}