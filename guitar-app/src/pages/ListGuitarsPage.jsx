import { NavLink } from "react-router-dom"
import styles from "./listGuitarsPage.module.css";
import { useState } from "react";
import { TitleView } from "../components/TitleView";

// Pagina de inicio muestra cada guitarra disponible
export const ListGuitarsPage = () => {

    // Estado para el botón de cerrar del titulo
    const [killPage, setKillPage] = useState(false);

    const handlerKillPage = () => setKillPage(true);

    return (
        <>
            {
                killPage === false ?
                    <div className={styles.container}>
                        <div className={styles['main-container']}>
                            <TitleView title="Guitar App" functionCloseButton={handlerKillPage} />
                            <div className={styles['principal-separator']}></div>

                            <div className={styles['principal-container']}>
                                <div className={styles['options-container']}>
                                    <div className={styles['message-container']}>
                                        <div className={styles['message-text']}>Selecciona una opción
                                        </div>
                                    </div>
                                    <div className={styles['options-menu']}>
                                        <NavLink to={"cleanSolo"} className={styles['guitar-option']}>
                                            <img className={styles['guitar-image']} src="/images/electric-guitar.png"></img>
                                            <div className={styles['guitar-text']}>Clean Solo</div>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className={styles['principal-separator']}></div>
                            </div>
                        </div>
                    </div>

                    :
                    <div className={styles['error-container']}>
                        <div className={styles['error-message']}>
                            Ha ocurrido un error, vuelva a recargar la pagina
                        </div>
                    </div>
            }
        </>
    )
}