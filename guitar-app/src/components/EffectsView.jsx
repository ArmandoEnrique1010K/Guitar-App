import styles from "./styles/effects.module.css";

export const EffectsView = ({ data, name, effects = {},
    onChangeEnabledGain,
    onChangeGain,
    onChangeEnabledDistortion,
    onChangeDistortion,
    onChangeEnabledReverb,
    onChangeDecay,
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
}) => {


    return (
        <>
            <div className={styles["effects-container"]}>

                <div className={styles["effects-column"]}>
                    <div className={styles["effect-box"]}>
                        <div className={styles["button-and-light"]}>
                            <button className={styles["button-option"]} onClick={onChangeEnabledGain}>
                                <img src="/icons/volume-up-circle-fill.svg" alt="" />
                            </button>

                            {/* <div>
                Habilitar ganancia
                <input type="checkbox" onChange={onChangeEnabledGain}></input>
            </div> */}

                            <div className={styles["light-container"]}>
                                <div className={`
                                ${effects.gain.enabled === false ? "option-light-off" : "option-light-on"}
                                `}></div>
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Ganancia
                                </div>
                                <div className={styles["text-label"]}>
                                    {parseInt(effects.gain.gain * 100)} %
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={0}
                                    max={2}
                                    step={0.1}
                                    value={effects.gain.gain}
                                    onChange={onChangeGain}
                                    disabled={!effects.gain.enabled ? true : false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles["effect-box"]}>
                        <div className={styles["button-and-light"]}>
                            <button className={styles["button-option"]} onClick={onChangeEnabledDistortion}>
                                <img src="/icons/thunder.svg" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`
                                ${effects.distortion.enabled === false ? "option-light-off" : "option-light-on"}
                                `}></div>
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Distorción
                                </div>
                                {/* <div>
                Habilitar distorción
                <input type="checkbox" onChange={() => onChangeEnabledDistortion(event)}></input>
            </div> */}

                                <div className={styles["text-label"]}>
                                    {parseInt(effects.distortion.distortion * 100)} %
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    value={effects.distortion.distortion} onChange={onChangeDistortion}
                                    disabled={!effects.distortion.enabled ? true : false}

                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles["effect-box"]}>
                        <div className={styles["button-and-light"]}>
                            <button className={styles["button-option"]} onClick={onChangeEnabledReverb}>
                                <img src="/icons/echo-ripples-svgrepo-com.svg" alt="" />
                            </button>

                            {/* <div>
                Habilitar ganancia
                <input type="checkbox" onChange={onChangeEnabledGain}></input>
            </div> */}

                            <div className={styles["light-container"]}>
                                <div className={`
                                ${effects.reverb.enabled === false ? "option-light-off" : "option-light-on"}
                                `}></div>
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Decaimiento
                                </div>
                                <div className={styles["text-label"]}>
                                    {(effects.reverb.decay)} seg.
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={0.1}
                                    max={5.1}
                                    step={0.1}
                                    value={effects.reverb.decay} onChange={onChangeDecay}
                                    disabled={!effects.reverb.enabled ? true : false}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles["effects-column"]}>
                    <div className={styles["effect-box"]}>
                        <div className={styles["button-and-light"]}>
                            <button className={styles["button-option"]} onClick={onChangeEnabledFeedbackDelay}>
                                <img src="/icons/signal-stream_9288444.svg" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`
                                ${effects.feedbackDelay.enabled === false ? "option-light-off" : "option-light-on"}
                                `}></div>
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Retraso
                                </div>
                                <div className={styles["text-label"]}>
                                    {(effects.feedbackDelay.delayTime)} seg.
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={0.01}
                                    max={1}
                                    step={0.01}
                                    value={effects.feedbackDelay.delayTime} onChange={onChangeDelayTime}
                                    disabled={!effects.feedbackDelay.enabled ? true : false}
                                />
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Retroalimentación
                                </div>
                                <div className={styles["text-label"]}>
                                    {parseInt(effects.feedbackDelay.feedback * 100)} %.
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={0.01}
                                    max={0.90}
                                    step={0.01}
                                    value={effects.feedbackDelay.feedback} onChange={onChangeFeedback}
                                    disabled={!effects.feedbackDelay.enabled ? true : false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles["effect-box"]}>
                        <div className={styles["button-and-light"]}>
                            <button className={styles["button-option"]} onClick={onChangeEnabledVibrato}>
                                <img src="/icons/water_7434935.svg" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`
                                ${effects.vibrato.enabled === false ? "option-light-off" : "option-light-on"}
                                `}></div>
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Frecuencia
                                </div>
                                <div className={styles["text-label"]}>
                                    {(effects.vibrato.frequency)} seg.
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={0.1}
                                    max={10}
                                    step={0.1}
                                    value={effects.vibrato.frequency} onChange={onChangeFrequency}
                                    disabled={!effects.vibrato.enabled ? true : false}
                                />
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Profundidad
                                </div>
                                <div className={styles["text-label"]}>
                                    {parseInt(effects.vibrato.depth * 100)} %.
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01} value={effects.vibrato.depth} onChange={onChangeDepth}
                                    disabled={!effects.vibrato.enabled ? true : false}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles["effects-column"]}>
                    <div className={styles["effect-box"]}>
                        <div className={styles["button-and-light"]}>
                            <button className={styles["button-option"]} onClick={onChangeEnabledEq3}>
                                <img src="/icons/equalizer.svg" alt="" />
                            </button>
                            <div className={styles["light-container"]}>
                                <div className={`
                                ${effects.eq3.enabled === false ? "option-light-off" : "option-light-on"}
                                `}></div>
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Bajos
                                </div>
                                <div className={styles["text-label"]}>
                                    {(effects.eq3.lowLevel)} db.
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={-10}
                                    max={10}
                                    step={1} value={effects.eq3.lowLevel} onChange={onChangeLowLevel}
                                    disabled={!effects.eq3.enabled ? true : false}
                                />
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Medios
                                </div>
                                <div className={styles["text-label"]}>
                                    {(effects.eq3.midLevel)} db.
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={-10}
                                    max={10}
                                    step={1} value={effects.eq3.midLevel} onChange={onChangeMidLevel}
                                    disabled={!effects.eq3.enabled ? true : false}
                                />
                            </div>
                        </div>
                        <div className={styles["input-range-container"]}>
                            <div className={styles["input-text-container"]}>
                                <div className={styles["text-label"]}>
                                    Altos
                                </div>
                                <div className={styles["text-label"]}>
                                    {(effects.eq3.highLevel)} db.
                                </div>
                            </div>
                            <div >
                                <input
                                    className={styles["input-range"]}
                                    type="range"
                                    min={-10}
                                    max={10}
                                    step={1} value={effects.eq3.highLevel} onChange={onChangeHighLevel}
                                    disabled={!effects.eq3.enabled ? true : false}
                                />
                            </div>
                        </div>

                    </div>


                </div>

            </div>





            {/* <div>
                                    oversample (eliminar esto, no sirve)
                                    <select onChange={() => onChangeOversample(event.target.value)}>
                                        <option value={"none"}>none</option>
                                        <option value={"2x"}>2x</option>
                                        <option value={"4x"}>4x</option>
                                    </select>

                                </div> */}

            {/* INVESTIGAR SOBRE LOS LIMITES DE LOS EFECTOS DE SONIDO */}

        </>
    )
}