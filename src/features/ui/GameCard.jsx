import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Asumiendo que usas Redux para almacenar el valor de búsqueda

import { useLoaderData } from "react-router-dom";
import { selectSearch } from "../layout/SearchSlice";
import { getAllVideojuegos } from "../../api/getVideoJuegos";
import { db } from "../../firebase/firebase";

export const GameCard = () => {
    const data = useLoaderData();
    const search = useSelector(selectSearch);
    const [filteredVideojuegos, setFilteredVideojuegos] = useState([]);

    useEffect(() => {
        if (data.videojuegos) {
            const filteredData = data.videojuegos.filter(videojuego =>
                videojuego.titulo.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredVideojuegos(filteredData);
        }
    }, [search, data.videojuegos]);

    return (
        <div>
            <h1 className="text-4xl text-center text-violet-600">Lista de videojuegos</h1>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredVideojuegos.map((videojuego) => (
                    <div key={videojuego.id} className="bg-white rounded-lg shadow-lg">
                        <img src={videojuego.banner} alt="" className="w-full h-32 object-cover object-center" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {videojuego.titulo}</h3>
                            <p className="text-gray-600">{videojuego.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export async function loader() {
    try {
        const videojuegos = await getAllVideojuegos(db);
        return { videojuegos }
    }
    catch (error) {
        console.error("Error al obtener los videojuegos:", error);
        return [];
    }
}
