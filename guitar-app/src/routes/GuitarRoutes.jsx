import { Route, Routes } from "react-router"
import { ListGuitarsPage } from "../pages/ListGuitarsPage"
import { GuitarPage } from "../pages/GuitarPage"
import { cleanSoloNotes } from "../data/cleanSoloNotes"

// Este componente contiene todas las rutas de la aplicación web
export const GuitarRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <ListGuitarsPage />
                }></Route>

                {/* Se tiene en cuenta que se pasa la data (el arreglo) que va a estar asociada a la guitarra y el nombre de la guitarra (debe coincidir con el nombre de la carpeta que contiene los archivos mp3 y wav) */}
                <Route path="/cleanSolo" element={
                    <GuitarPage data={cleanSoloNotes} name="cleanSolo" nameGuitar="Clean Solo" />
                }></Route>

            </Routes>
        </>
    )
}