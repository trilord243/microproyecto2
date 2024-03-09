import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useLoaderData } from "react-router-dom";
import Card from "../ui/Card";
export const UserHomePage = () => {
    const agrupaciones = useLoaderData();

    return (
        <>
            <div>


                <h2 className='text-center text-3xl text-blue-500'>Bienvenido a la pagina de agrupaciones!</h2>
                <p className="text-center mt-7 text-gray-500">Visite la agrupacion que desee</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x justify-items-center">



                {agrupaciones.map((agrupacion) => (
                    <Card key={agrupacion.id} id={agrupacion.id} foto_agrupacion={agrupacion.foto} descripcion={agrupacion.descripcion} nombre_agrupacion={agrupacion.nombre} />
                ))}
            </div>

        </>
    )
}


export async function loader() {

    try {
        console.log("first")
        const querySnapshot = await getDocs(collection(db, "clubes"));
        const agrupacionesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return agrupacionesList;
    } catch (error) {
        console.error("Error al obtener las agrupaciones :", error);
        return new Error("Error al obtener las agrupaciones ");
    }

}