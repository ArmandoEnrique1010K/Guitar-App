import { muteAll, } from "../services/audioPlayer"
import styles from "./styles/controls.module.css"

export const ControlsView = ({ initialChord,
    lockZeroChord, onChangeRangeNotes, first,
    last,
    middle,
    alternate,
    invertKeyboard,
    onChangeModeKeyboard,
    onChangeLockZero,
    onChangeInvertKeyboard,
    onMutePreviousChord,
    onChangepulseMode,
    onChangeShowKeyboard,
    showKeyboard,
    mutePreviousChord,
    pulseMode,
    onChangeShowEffects,
    showEffects,
    onChangeShowPresets,
    showPresets
}) => {
    // Llama al hook personalizado, solamente se utiliza las propiedades y metodos requeridos en la vista del usuario
    // const {
    //     first,
    //     last,
    //     middle,
    //     alternate,
    //     // loading,
    //     // newNeck,
    //     //////////initialChord,
    //     //////////lockZeroChord,
    //     invertKeyboard,
    //     // typeKeyboard,
    //     mutePreviousChord,
    //     pulseMode,
    //     // volume,
    //     showKeyboard,
    //     // handleNotePlayed,
    //     ////////////onChangeRangeNotes,
    //     onChangeModeKeyboard,
    //     // onChangeVolume,
    //     // redirectStartPage,
    //     onChangeLockZero,
    //     onChangeInvertKeyboard,
    //     onMutePreviousChord,
    //     onChangepulseMode,
    //     onChangeShowKeyboard,
    //     // message,
    //     // effects,
    //     // onChangeEnabledGain,
    //     // onChangeGain,
    //     // // setEffects,
    //     // onChangeEnabledDistortion,
    //     // onChangeDistortion,
    //     // // onChangeOversample,
    //     // onChangeEnabledReverb,
    //     // onChangeDecay,
    //     // // onChangePreDelay,
    //     // onChangeEnabledDelay,
    //     // onChangeDelayTime,
    //     // onChangeFeedback,
    //     // onChangeEnabledVibrato,
    //     // onChangeFrequency,
    //     // onChangeDepth,
    //     // onChangeEnabledEq3,
    //     // onChangeLowLevel,
    //     // onChangeMidLevel,
    //     // onChangeHighLevel,
    // } = useGuitar(data, name)

    return (
        <>
            {/* POR ALGUNA RAZON ESTO NO FUNCIONA */}
            {/* LA SOLUCION ERA PASAR COMO PROPS A ESTE COMPONENTE EN LUGAR DE UTILIZAR EL HOOK PERSONALIZADO  */}
            <div className={styles["range-notes-container"]}>
                <input
                    className={styles["range-notes"]}
                    type="range"
                    name="rangeNotes"
                    id="rangeNotes"
                    min={lockZeroChord === false ? 0 : 1}
                    max={lockZeroChord === false ? 12 : 13}
                    step={1}
                    value={initialChord} onChange={onChangeRangeNotes}
                />
            </div>

            <div className={styles["options-container"]}>
                <div className={styles["option-group"]}>

                    <div className={styles["button-option-container"]} >
                        <div className={styles["button-light-container"]}>
                            <button className={styles["button-option"]} onClick={onChangeLockZero}>
                                <img src="/icons/zero-circle-fill.svg" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`${lockZeroChord === false ? "option-light-off" : "option-light-on"} `}></div>
                            </div>
                        </div>
                        {showKeyboard === true ? (<div className={styles["option-keyboard"]}>CTRL left</div>) : ""}
                    </div>

                    <div className={styles["button-option-container"]}>
                        <div className={styles["button-light-container"]}>
                            <button className={styles["button-option"]} onClick={onChangeInvertKeyboard}>
                                <img src="/icons/invert.svg" width="25px" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`${invertKeyboard === false ? "option-light-off" : "option-light-on"} `}></div>
                            </div>
                        </div>
                        {showKeyboard === true ? (<div className={styles["option-keyboard"]}>ALT left</div>) : ""}

                    </div>

                    <div className={styles["button-option-container"]}>
                        <div className={styles["button-light-container"]}>

                            <button className={styles["button-option"]} onClick={onMutePreviousChord}>
                                <img src="/icons/music-black-note-shape.svg" width="25px" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`${mutePreviousChord === false ? "option-light-off" : "option-light-on"} `}></div>
                            </div>

                        </div>
                        {showKeyboard === true ? (<div className={styles["option-keyboard"]}>TAB</div>) : ""}

                    </div>

                    <div className={styles["button-option-container"]}>
                        <div className={styles["button-light-container"]}>

                            <button className={styles["button-option"]} onClick={onChangepulseMode}>
                                <img src="/icons/pulse.svg" width="25px" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`${pulseMode === false ? "option-light-off" : "option-light-on"} `}></div>
                            </div>
                        </div>
                        {showKeyboard === true ? (<div className={styles["option-keyboard"]}>Bloq Num</div>) : ""}

                    </div>

                    <div className={styles["button-option-container"]}>
                        <div className={styles["button-light-container"]}>

                            <button className={styles["button-option"]} onClick={onChangeShowKeyboard}>
                                <img src="/icons/eye.svg" width="25px" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`${showKeyboard === false ? "option-light-off" : "option-light-on"} `}></div>
                            </div>
                        </div>
                        {showKeyboard === true ? (<div className={styles["option-keyboard"]}>ESC</div>) : ""}

                    </div>

                    <div className={`${styles['button-option-container']} ${styles['select-mode']}`}>
                        <select onChange={() => onChangeModeKeyboard(event.target.value)} name="modeKeys" id="selectModeKeys">
                            <option value={first}>First</option>
                            <option value={last}>Last</option>
                            <option value={middle}>Middle</option>
                            <option value={alternate}>Alternate</option>
                        </select>
                    </div>

                </div>
                {/* <div className="option-group">
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
                                    </div> */}

                <div className={styles["option-group"]}>
                    <div className={styles["button-option-container"]}>
                        <button className={styles["button-muteAll-option"]} onClick={muteAll}><img src="/icons/mute.svg" alt="" width="25px" /></button>
                        {showKeyboard === true ? (<div className={styles["option-keyboard"]}>Space</div>) : ""}
                    </div>
                    <div className={styles["button-option-container"]}>
                        <div className={styles["button-light-container-end"]}>
                            <button className={styles["button-option-end"]} onClick={onChangeShowEffects}>
                                <img src="/icons/amplificator.svg" alt="" />
                            </button>
                            <div className={styles["light-container-end"]}>
                                <div className={`${showEffects === false ? "option-light-off" : "option-light-on"} `}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["button-option-container"]}>
                        <div className={styles["button-light-container-end"]}>
                            <button className={styles["button-option-end"]} onClick={onChangeShowPresets}>
                                <img src="/icons/config.svg" alt="" />
                            </button>
                            <div className={styles["light-container-end"]}>
                                <div className={`${showPresets === false ? "option-light-off" : "option-light-on"} `}></div>
                            </div>
                        </div>
                    </div>


                </div>


            </div>

        </>
    )
}