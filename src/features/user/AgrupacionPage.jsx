import { getClub } from "../../api/getAgrupaciones";
import { db } from "../../firebase/firebase";
import { useLoaderData } from "react-router-dom";


export default function AgrupacionPage() {
    const data = useLoaderData();
    console.log(data.videojuegosDetalles[0])
    return (
        <div className="overflow-hidden bg-white py-32">
            <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                    <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.nombre}</h2>
                        <p className="mt-6 text-xl leading-8 text-gray-600">
                            {data.descripcion}
                        </p>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            Unete a nuestra agrupacion y disfruta de los beneficios que te ofrecemos!!
                        </p>
                        <p>Tenemos juegos como: {data.videojuegosDetalles[0].titulo},{data.videojuegosDetalles[1].titulo},{data.videojuegosDetalles[2].titulo}   </p>
                        <div className="mt-10 flex">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Join our team <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                        <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                            <img
                                src={data.videojuegosDetalles[0].banner}
                                alt=""
                                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                            />
                        </div>
                        <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">

                            <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                <img
                                    src={data.videojuegosDetalles[1].banner}
                                    alt=""
                                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                />
                            </div>
                            <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                <img
                                    src={data.videojuegosDetalles[2].banner}
                                    alt=""
                                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export async function loader({ params }) {

    try {

        const data = await getClub(db, params.id);

        return data;
    } catch (error) {
        console.error("Error al obtener la agrupacion:", error);
        return new Error("Error al obtener la agrupacion");
    }

}