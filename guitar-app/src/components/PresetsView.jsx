import styles from "./styles/presets.module.css"

export const PresetsView = ({ typeMode, saveCurrentConfig, presets, presetName, onPresetNameChange, onClickDefaultConfig, applyPreset, deletePreset, handlerPresetName }) => {

    return (
        <div className={styles["presets-container"]}>

            <div className={styles['presets-list']}>
                {/* SE UTILIZA UN MAP PARA ALMACENAR LAS CONFIGURACIONES ESTABLECIDAS */}
                {presets.map((preset) => (
                    <div className={styles['one-preset']} key={preset.id}>
                        <button className={styles['name-preset']} onClick={() => applyPreset(preset.id)}>
                            {preset.presetName}
                        </button>
                        <button className={styles['delete-preset']} onClick={() => deletePreset(preset.id)}>Eliminar</button>
                    </div>
                ))}
            </div>


            <form className={styles["form-container"]} onSubmit={saveCurrentConfig}>
                <input type="text" className={styles["input-name-config"]} value={presetName} onChange={onPresetNameChange}

                    onFocus={() => handlerPresetName(true)}
                    onBlur={() => handlerPresetName(false)}
                    placeholder="escriba el nombre"
                ></input>
                {/* MODO TIPEO SOLAMENTE PARA PRUEBAS */}
                {/* <div className={styles["light-container"]}>
                    <div className={`${typeMode === false ? "option-light-off" : "option-light-on"} `}></div>
                </div> */}

                <div className={styles['buttons-container']}>

                    <button className={styles['config-button']} type=" submit">Guardar Configuración</button>

                    <button className={styles['config-button']} type="button" onClick={onClickDefaultConfig}>
                        Restablecer todo
                    </button>

                </div>

            </form>

        </div>
    )
}