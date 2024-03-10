
import Card from "../ui/Card";
import { useEffect, useState } from "react";
import { selectSearch } from "../layout/SearchSlice";
import { useSelector } from "react-redux";
import { fetchAgrupaciones } from "../../api/getAgrupaciones";
import { CardSkeleton } from "../ui/CardSkeleton";

export const UserHomePage = () => {
    const search = useSelector(selectSearch);
    const [agrupaciones, setAgrupaciones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAgrupaciones = async () => {
            setIsLoading(true); // Comienza a cargar
            try {
                const agrupacionesList = await fetchAgrupaciones();
                setAgrupaciones(agrupacionesList);
            } catch (error) {
                console.error("Error al obtener las agrupaciones desde el componente: ", error);
            } finally {
                setIsLoading(false); // Termina la carga
            }
        };

        loadAgrupaciones();
    }, []);




    const agrupacionesFiltradas = agrupaciones.filter(agrupacion =>
        agrupacion.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div>
                <h2 className='text-center text-3xl text-blue-500'>Bienvenido a la página de agrupaciones!</h2>
                <p className="text-center mt-7 mb-5 text-gray-500">Visite la agrupación que desee</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-y-7 lg:gap-x justify-items-center">

                {isLoading ? (

                    [...Array(6)].map((_, index) => <CardSkeleton key={index} />)
                ) : (
                    agrupacionesFiltradas.map((agrupacion) => (
                        <Card
                            key={agrupacion.id}
                            id={agrupacion.id}
                            foto_agrupacion={agrupacion.foto}
                            descripcion={agrupacion.descripcion}
                            nombre_agrupacion={agrupacion.nombre}
                        />
                    ))
                )}


            </div >
        </>
    );
};


export async function loader() {

    /*  try {
 
         const querySnapshot = await getDocs(collection(db, "clubes"));
         const agrupacionesList = querySnapshot.docs.map((doc) => ({
             id: doc.id,
             ...doc.data(),
         }));
         return agrupacionesList;
     } catch (error) {
         console.error("Error al obtener las agrupaciones :", error);
         return new Error("Error al obtener las agrupaciones ");
     } */
    return null

}