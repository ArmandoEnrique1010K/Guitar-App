
import PropTypes from "prop-types";
import styles from "./styles/title.module.css";

export const TitleView = ({ title, functionCloseButton }) => {
    return (
        <div className={styles['title-container']}>
            <button className={styles['button-title']}><img src="/icons/info-square.svg"></img></button>
            <div className={styles['title-container-separator']}></div>
            <h1 className={styles['title-welcome']}>{title}</h1>
            <div className={styles['title-container-separator']}></div>
            <button className={styles['button-title']} onClick={functionCloseButton}><img src="/icons/close-square.svg"></img></button>
        </div>
    )
}

TitleView.propTypes = {
    title: PropTypes.string,
    functionCloseButton: PropTypes.func
}