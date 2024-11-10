import { NavLink } from "react-router-dom"

// Pagina de inicio muestra cada guitarra disponible
export const ListGuitarsPage = () => {
    return (
        <>
            <div className="container">
                <div className="guitar-container">
                    <div className="title-container">
                        <h1 className="title-welcome">Bienvenido</h1>
                    </div>
                    <div className="principal-separator"></div>
                    <div className="principal-container">
                        <div className="menu-text">
                            Selecciona una opcion
                        </div>
                        <NavLink to={"cleanSolo"} className="guitar-option">Clean Solo</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}