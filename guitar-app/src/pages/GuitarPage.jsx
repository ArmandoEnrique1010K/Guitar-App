import { NeckView } from "../components/NeckView"
import PropTypes from "prop-types"
import { useGuitar } from "../hooks/useGuitar"
import { ControlsView } from "../components/ControlsView"
import { EffectsView } from "../components/EffectsView"

import styles from "./guitarPage.module.css";
import { useState } from "react"
import { TitleView } from "../components/TitleView"
import { PresetsView } from "../components/PresetsView"

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
        // volume,
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
        onChangeEnabledGain,
        onChangeGain,
        // setEffects,
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
        // currentPreset,
        // handlerPresetSelected,
        typeMode,
        onClickDefaultConfig,
        handlerPresetName
    } = useGuitar(data, name)

    // Pasa props al context


    // Llama al hook personalizado, solamente se utiliza las propiedades y metodos requeridos en la vista del usuario
    // const {
    //     first,
    //     last,
    //     middle,
    //     alternate,
    //     loading,
    //     newNeck,
    //     initialChord,
    //     lockZeroChord,
    //     invertKeyboard,
    //     // typeKeyboard,
    //     mutePreviousChord,
    //     pulseMode,
    //     volume,
    //     showKeyboard,
    //     handleNotePlayed,
    //     onChangeRangeNotes,
    //     onChangeModeKeyboard,
    //     onChangeVolume,
    //     redirectStartPage,
    //     onChangeLockZero,
    //     onChangeInvertKeyboard,
    //     onMutePreviousChord,
    //     onChangepulseMode,
    //     onChangeShowKeyboard,
    //     message,

    // } = useGuitar(data, name)

    const [showEffects, setShowEffects] = useState(false);

    const onChangeShowEffects = () => {
        setShowEffects(!showEffects)
    }


    const [showPresets, setShowPresets] = useState(false);

    const onChangeShowPresets = () => {
        setShowPresets(!showPresets)
    }

    return (
        <>
            <div className={styles.container}>

                {loading === true
                    ? <div className={styles['loading-spinner-container']}><img src="/spinners/Spinner-200px.svg"></img></div>
                    : <>
                        <div className={styles['main-container']}>
                            {/* Contenedor para el titulo */}
                            <TitleView title={nameGuitar} functionCloseButton={redirectStartPage} />

                            <div className={styles['principal-separator']}></div>

                            {/* Contenedor principal */}
                            <div className={styles['neck-container']}>
                                <NeckView neck={newNeck} name={name} data={data} handleNotePlayed={handleNotePlayed} mutePreviousChord={mutePreviousChord} pulseMode={pulseMode}
                                    // volume={volume}
                                    message={message} showKeyboard={showKeyboard} effects={effects} typeMode={typeMode} />

                                {/* <input> de tipo rango para establecer el acorde inicial */}

                                {/* <label htmlFor="rangeNotes">Empezar desde el acorde {initialChord}</label>*/}
                                {/* <div className="range-notes-container">
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
                                </div> */}

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

                                {/* AQUI SE TIENE QUE DEFINIR UN CONTENEDOR PARA LOS CONTROLES Y EFECTOS DE SONIDO */}
                                <ControlsView data={data} name={name} lockZeroChord={lockZeroChord} initialChord={initialChord} onChangeRangeNotes={onChangeRangeNotes} first={first}
                                    last={last}
                                    middle={middle}
                                    alternate={alternate}
                                    invertKeyboard={invertKeyboard}
                                    onChangeModeKeyboard={onChangeModeKeyboard}
                                    onChangeLockZero={onChangeLockZero}
                                    onChangeInvertKeyboard={onChangeInvertKeyboard}
                                    onMutePreviousChord={onMutePreviousChord}
                                    onChangepulseMode={onChangepulseMode}
                                    onChangeShowKeyboard={onChangeShowKeyboard}
                                    showKeyboard={showKeyboard}
                                    mutePreviousChord={mutePreviousChord}
                                    pulseMode={pulseMode}
                                    onChangeShowEffects={onChangeShowEffects}
                                    showEffects={showEffects}
                                    onChangeShowPresets={onChangeShowPresets}
                                    showPresets={showPresets}

                                />
                                <div className={styles['principal-separator']}></div>

                                {/* Contenedor para las opciones */}

                                <div className={styles['effects-and-presets-container']}>
                                    <>
                                        {
                                            // Operador ternario
                                            // showEffects ? "Muestra efectos" : "No muestra efectos"

                                            // Operador ternario simplificado
                                            !showEffects || <EffectsView data={data} name={name} effects={effects} onChangeEnabledGain={onChangeEnabledGain} onChangeGain={onChangeGain}
                                                onChangeEnabledDistortion={onChangeEnabledDistortion}
                                                onChangeDistortion={onChangeDistortion}
                                                onChangeEnabledReverb={onChangeEnabledReverb}
                                                onChangeDecay={onChangeDecay}
                                                onChangeEnabledFeedbackDelay={onChangeEnabledFeedbackDelay}
                                                onChangeDelayTime={onChangeDelayTime}
                                                onChangeFeedback={onChangeFeedback}
                                                onChangeEnabledVibrato={onChangeEnabledVibrato}
                                                onChangeFrequency={onChangeFrequency}
                                                onChangeDepth={onChangeDepth}
                                                onChangeEnabledEq3={onChangeEnabledEq3}
                                                onChangeLowLevel={onChangeLowLevel}
                                                onChangeMidLevel={onChangeMidLevel}
                                                onChangeHighLevel={onChangeHighLevel}
                                            />

                                        }


                                    </>
                                    <>
                                        {
                                            !showPresets ||
                                            <PresetsView typeMode={typeMode} saveCurrentConfig={saveCurrentConfig} presetName={presetName} onPresetNameChange={onPresetNameChange} onClickDefaultConfig={onClickDefaultConfig} presets={presets} applyPreset={applyPreset} deletePreset={deletePreset} handlerPresetName={handlerPresetName}
                                            />

                                        }

                                    </>

                                </div>
                                {/* <div className={styles['principal-separator']}></div> */}

                            </div>

                        </div>


                    </>}
            </div >

        </>
    )
}

// Define propTypes para especificar el tipo de dato que se pasa entre componentes
GuitarPage.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string,
    nameGuitar: PropTypes.string,
}