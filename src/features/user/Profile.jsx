

import { Form } from 'react-router-dom'
import Heaading from './Heading'
import { useEffect, useState } from 'react';
import { getAllVideojuegos } from '../../api/getVideoJuegos';
import { db } from '../../firebase/firebase';
import { getNombre, getUserApellido, getUserFoto, getUserName, getUserVideojuegoFavorito } from './userSlice';
import { useSelector } from 'react-redux';
export default function Profile() {
    const [videojuegos, setVideojuegos] = useState([]);
    const userName = useSelector(getUserName)
    const nombre = useSelector(getNombre)
    const apellido = useSelector(getUserApellido)
    const foto = useSelector(getUserFoto)
    const videoJuegoFavorito = useSelector(getUserVideojuegoFavorito)

    const [coverPhoto, setCoverPhoto] = useState(foto);

    useEffect(() => {


        const fetchVideojuegos = async () => {
            try {
                const videojuegos = await getAllVideojuegos(db);
                setVideojuegos(videojuegos);
            } catch (error) {
                console.error("Error al obtener los videojuegos:", error);
            }
        };

        fetchVideojuegos();
    }, []);


    const handleFileChangeProfile = (event) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            console.log(file)
            const reader = new FileReader();

            reader.onloadend = () => {
                setCoverPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>

            <Heaading />

            <Form method="POST" className='flex flex-col lg:ml-14 px-6 items-center mt-6'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Perfil </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Verifica tu perfil
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                                    UserName
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                        <input
                                            type="text"
                                            name="userName"
                                            id="userName"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            defaultValue={userName}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="sm:col-span-4">
                                <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                        <input
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            defaultValue={nombre}
                                        />
                                    </div>
                                </div>
                            </div>



                            <div className="sm:col-span-4">
                                <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                                    Apellido
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                        <input
                                            type="text"
                                            name="apellido"
                                            id="apellido"
                                            autoComplete="username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            defaultValue={apellido}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4 ">
                                <label htmlFor="favorite" className="block text-sm font-medium leading-6 text-gray-900">
                                    Videojuego favorito
                                </label>
                                <select
                                    id="favorite"
                                    name="favorite"
                                    className="mt-2 block w-full rounded-md border border-gray-300 py-1.5 pl-3 pr-10 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue={videoJuegoFavorito || "1"}
                                >
                                    {videojuegos.map((videojuego) => (

                                        <option key={videojuego.id} value={videojuego.id}>{videojuego.titulo}</option>))
                                    }

                                </select>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Foto de perfil
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">


                                    <img
                                        src={coverPhoto || "https://firebasestorage.googleapis.com/v0/b/sistema-info-d52b6.appspot.com/o/admin%2FAdmin-Profile-Vector-PNG.png?alt=media&token=cad644c6-bf60-49ac-8ca8-3bd80d056673"}
                                        className="h-16 w-16 rounded-full"
                                        alt="Profile foto"

                                    />
                                    <label
                                        htmlFor="profile-photo"
                                        className="relative cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Cambiar
                                        <input
                                            id="profile-photo"
                                            name="profile-photo"
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={(event) => handleFileChangeProfile(event)}

                                        />
                                    </label>
                                </div>
                            </div>


                        </div>
                    </div>




                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </Form>
        </div>
    )
}


export async function action({ request }) {
    try {
        const formData = await request.formData();
        const userName = formData.get('userName');
        const nombre = formData.get('nombre');
        const apellido = formData.get('apellido');
        const videojuegoFavorito = formData.get('favorite');
        const foto = formData.get('profile-photo');
        console.log(foto, userName, nombre, apellido, videojuegoFavorito)
        return null
    } catch (error) {
        console.log(error)
    }

}