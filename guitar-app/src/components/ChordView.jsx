import PropTypes from "prop-types";
import { useChord } from "../hooks/useChord";

export const ChordView = ({ data, chord, rope, keyfromkeyboard, name, handleNotePlayed, mutePreviousChord, pulseMode, volume, showKeyboard }) => {


    const { handlePlaySound, handleStopSound } = useChord(rope, chord, handleNotePlayed, data, mutePreviousChord, volume, name, keyfromkeyboard, pulseMode);

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
                    <div className="key-rope note" data-key={keyfromkeyboard}>
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