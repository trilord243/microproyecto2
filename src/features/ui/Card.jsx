/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const Card = ({
    foto_agrupacion,
    descripcion,
    id,

    nombre_agrupacion,
}) => {

    const navigate = useNavigate();
    return (
        <div className="card w-80   bg-white shadow-2xl">
            <figure className="h-48 p-4 ">
                <img
                    className="w-full h-full rounded-2xl object-cover shadow-lg"
                    src={foto_agrupacion}
                    alt={nombre_agrupacion}
                />
            </figure>

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