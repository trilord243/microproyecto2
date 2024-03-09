/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const Card = () => {
    // console.log(id);
    // const navigate = useNavigate();
    return (
        <div className="card w-80   bg-white shadow-2xl">
            <figure className="h-48 p-4 ">
                <img
                    className="w-full h-full rounded-2xl object-cover shadow-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/microproyecto2-b3bf3.appspot.com/o/17%2FApex-Banner.jpg?alt=media&token=1958cbec-7947-49ed-8f83-dc86cdf5d766"
                    alt="xd"
                />
            </figure>

            <div className="card-body p-3">
                <h2 className="text-black text-2xl text-center font-semibold">
                    asdasdasd
                </h2>

                <p className="text-sm line-clamp-3 text-black mb-3 mt-2">asdasd</p>
                <div className="flex justify-center ">
                    <button
                        /*  onClick={() => navigate(`/agrupacion/${id}`)} */
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