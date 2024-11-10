import PropTypes from "prop-types"
import { ChordView } from "./ChordView"

export const RopeView = ({ data, rope, frets, name, handleNotePlayed, mutePreviousChord, pulseMode, volume, showKeyboard }) => {


    return (
        <>
            <div className="rope-container">
                {
                    // Utilizar dos puntos para cambiar el nombre de la propiedad key a keyfromkeyboard para que no haga conflicto con key (id)
                    frets.map(({ chord, key: keyfromkeyboard }) => (
                        // No se puede colocar fragmentos (<></>) dentro de un map, porque causaria el error de que 
                        <ChordView
                            key={`${rope}-${chord}`}
                            data={data}
                            chord={chord}
                            rope={rope}
                            keyfromkeyboard={keyfromkeyboard}
                            name={name}
                            handleNotePlayed={handleNotePlayed}
                            mutePreviousChord={mutePreviousChord}
                            pulseMode={pulseMode}
                            volume={volume}
                            showKeyboard={showKeyboard}
                        />
                    ))
                }
            </div>
        </>

    )
}

RopeView.propTypes = {
    data: PropTypes.array,
    frets: PropTypes.array,
    rope: PropTypes.number,
    name: PropTypes.string,
    handleNotePlayed: PropTypes.func,
    mutePreviousChord: PropTypes.bool,
    pulseMode: PropTypes.bool,
    volume: PropTypes.number,
    showKeyboard: PropTypes.bool
}