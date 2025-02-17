import PropTypes from "prop-types"
import { RopeView } from "./RopeView"
import styles from "./styles/neck.module.css";

export const NeckView = ({ data, neck, name, handleNotePlayed, mutePreviousChord, pulseMode,
    // volume, 
    message, showKeyboard, effects, typeMode }) => {

    // Toma la cuerda con el indice 0 para
    // console.log(neck[0].frets.map(f => f.chord));
    const chordsList = neck[0].frets.map(f => f.chord);

    // Extraer los acordes de los frets para crear una lista única de chords
    // const chordsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];


    return (
        <>


            <div className={styles['container']}>
                {/* Lista única de todos los acordes, renderizada solo una vez debajo */}
                <div className={styles['chords-list-guitar']}>
                    {chordsList.map((chord) => (
                        <div className={styles['number-chord-guitar']} key={chord}>{chord}</div>
                    ))}
                </div>

                {
                    neck.map(({ rope, frets }, index) => (
                        <RopeView
                            // El componente hijo RopeView no puede tener el mismo id que su componente nieto ChordView, es por ello que se multiplica por 100 su valor
                            key={index}
                            rope={rope}
                            frets={frets}
                            name={name}
                            handleNotePlayed={handleNotePlayed}
                            data={data}
                            mutePreviousChord={mutePreviousChord}
                            pulseMode={pulseMode}
                            // volume={volume}
                            showKeyboard={showKeyboard}
                            effects={effects}
                            typeMode={typeMode} />
                    ))

                }

                <div className={styles['chords-list-guitar']}>
                    {chordsList.map((chord) => (
                        <div className={styles['number-chord-guitar']} key={chord}>{chord}</div>
                    ))}
                </div>

                {/* Multiplos de 3 */}
                {/* <div className={styles['chords-list-guitar']}>
                    {
                        chordsList
                            .filter(chord => chord % 3 === 0)
                            .map(chord => (
                                <div className={styles['number-chord-guitar']} key={chord}>
                                    {chord}
                                </div>
                            ))
                    }
                </div> */}

                {/* Lista de números con estilo especial para múltiplos de 3 */}
                {/* <div className={styles['circles-list-guitar']}>
                    {
                        chordsList.map((chord) => (
                            <div className={styles['circle-container']} key={chord}>
                                <div className={(chord % 3 === 0 ? styles['circle-3'] : "")


                                }>
                                    a
                                </div>
                                {
                                    chord === 12 ? <div className={styles['circle-12']}>
                                        a
                                    </div> : ""
                                }

                            </div>
                        ))
                    }
                </div> */}

                <div className={styles['message-container']}>
                    <div className={styles['message-text']}>{message}</div>
                </div>

            </div >
        </>
    )
}

NeckView.propTypes = {
    data: PropTypes.array,
    neck: PropTypes.array,
    name: PropTypes.string,
    handleNotePlayed: PropTypes.func,
    mutePreviousChord: PropTypes.bool,
    pulseMode: PropTypes.bool,
    // volume: PropTypes.number,
    message: PropTypes.string,
    showKeyboard: PropTypes.bool,
    effects: PropTypes.object,
    typeMode: PropTypes.bool
}