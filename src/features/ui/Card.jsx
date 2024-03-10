/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Card = ({
    foto_agrupacion,
    descripcion,
    id,

    nombre_agrupacion,
}) => {
    const miembros = useSelector((state) => state.user.membresia);

    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        const checkMembership = () => {
            setIsMember(miembros.includes(id));
        };

        checkMembership();
    }, [id, miembros]);



    const navigate = useNavigate();
    return (
        <div className="card w-80 bg-white shadow-2xl">
            <figure className="h-48 p-4 ">
                <img
                    className="w-full h-full rounded-2xl object-cover shadow-lg"
                    src={foto_agrupacion}
                    alt={nombre_agrupacion}
                />
            </figure>
            {isMember && <div className="flex w-full  items-center content-center justify-center">


                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    <svg className="h-1.5 w-1.5 fill-blue-500" viewBox="0 0 6 6" aria-hidden="true">
                        <circle cx={3} cy={3} r={3} />
                    </svg>
                    Miembro
                </span>
            </div>}

            <div className="card-body p-3">
                <h2 className="text-black text-2xl text-center font-semibold">
                    {nombre_agrupacion}
                </h2>

                <p className="text-sm line-clamp-3 text-black mb-3 mt-2">{descripcion}</p>
                <div className="flex justify-center ">
                    <button
                        onClick={() => navigate(`/agrupacion/${id}`)}
                        type="button"
                        className="rounded-md bg-orange-600 px-2 py-1 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                        Mas informacion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;