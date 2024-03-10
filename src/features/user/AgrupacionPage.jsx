import { getClub } from "../../api/getAgrupaciones";
import { db } from "../../firebase/firebase";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { updateMembresia } from "./userSlice";



export default function AgrupacionPage() {


    const dispatch = useDispatch();

    const data = useLoaderData();

    const idUser = useSelector((state) => state.user.id);
    const miembros = useSelector((state) => state.user.membresia);
    const { id } = useParams();
    const [isMember, setIsMember] = useState(false);


    useEffect(() => {
        const checkMembership = () => {
            setIsMember(miembros.includes(id));
        };

        checkMembership();
    }, [id, miembros]);


    const handleLeaveClub = async () => {
        if (isMember) {
            const userRef = doc(db, "users", idUser);
            try {
                await updateDoc(userRef, {
                    miembroClub: arrayRemove(id)
                });
                const array = miembros.filter((miembro) => miembro !== id);
                dispatch(updateMembresia(array));

                setIsMember(false);
            } catch (error) {
                console.error("Error al dejar el club:", error);
            }
        }
    };
    const handleJoinClub = async () => {

        if (!isMember) {

            const userRef = doc(db, "users", idUser);
            try {
                await updateDoc(userRef, {
                    miembroClub: arrayUnion(id)

                });
                const array = [...miembros, id];
                dispatch(updateMembresia(array));


                setIsMember(true);
            } catch (error) {
                console.error("Error al unirse al club:", error);
            }
        }
    };





    return (
        <div className="overflow-hidden bg-white py-16 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">{data.nombre}</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            {data.descripcion}
                        </p>
                        <p className="mt-4 text-base">Tenemos juegos como: {data.videojuegosDetalles.map((juego, index) => <span key={index} className="inline-block after:content-[','] last:after:content-none">{juego.titulo}</span>)}</p>
                        <div className="mt-6">
                            {!isMember ? <button
                                onClick={handleJoinClub}

                                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Únete a nuestro equipo →
                            </button> : <p className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >Ya eres miembro</p>}
                        </div>
                        {isMember && (
                            <button
                                onClick={handleLeaveClub}
                                className="inline-flex items-center justify-center rounded-md bg-red-600 px-5 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-7"
                            >
                                Dejar el club
                            </button>
                        )}
                    </div>
                    <div className="mt-8 flex gap-4 overflow-hidden lg:mt-0 lg:ml-10">
                        {data.videojuegosDetalles.slice(0, 3).map((juego, index) => (
                            <img key={index} src={juego.banner} alt="" className="rounded-lg shadow-lg h-48 w-48 object-cover" />
                        ))}
                    </div>
                </div>

                <h2 className="text-center text-2xl font-bold mt-12 lg:mt-24">Juegos disponibles!</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.videojuegosDetalles.map((videojuego, index) => (
                        <div key={index} className="flex flex-col items-center rounded-lg p-4 shadow-lg">
                            <img src={videojuego.banner} alt={videojuego.titulo} className="mb-4 h-40 w-40 rounded object-cover" />
                            <h3 className="text-lg font-semibold">{videojuego.titulo}</h3>
                            <p className="mt-2 text-sm text-gray-600">{videojuego.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export async function loader({ params }) {
    try {
        const data = await getClub(db, params.id);
        return data;
    } catch (error) {
        console.error("Error al obtener la agrupación:", error);
        return new Error("Error al obtener la agrupación");
    }
}
