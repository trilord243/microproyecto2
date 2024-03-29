import { Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import Tab from "../ui/Tab";
import { useEffect, useState } from "react";

import { auth, db, storage } from "../../firebase/firebase";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import store from "../../store";
import { updateUser } from "../user/userSlice";
import { getAllVideojuegos, getVideojuegoBanner } from "../../api/getVideoJuegos";
import Loader from "../ui/Loader";



export default function RegisterPage() {
    const navigate1 = useNavigate();
    const [error, setError] = useState(null);
    const [videojuegos, setVideojuegos] = useState([]);
    const [coverPhoto, setCoverPhoto] = useState(null);

    const navigate = useNavigation();


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

    const isSubmiting = navigate.state === "submitting";
    const formErrors = useActionData();

    const registerWithGoogle = async () => {
        console.log("first")
        try {
            const db = getFirestore();
            const auth = getAuth();
            const provider = new GoogleAuthProvider();


            const result = await signInWithPopup(auth, provider);


            const user = result.user;


            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);


            if (!userSnap.exists()) {
                const newUser = {
                    id: user.uid,
                    nombre: user.displayName || '',
                    apellido: '',
                    email: user.email,
                    userName: user.displayName || '',
                    videojuego_favorito: '',
                    foto: user.photoURL,
                    cover: '',
                    miembroClub: []
                };

                store.dispatch(updateUser(newUser));
                console.log("Usuario registrado con éxito")
                await setDoc(userRef, newUser);
                navigate1('/')
            }

            if (userSnap.exists()) {
                const userData = userSnap.data();
                console.log("Usuario ya registrado", userData);


                const profileRef = doc(db, "users", userData.id);
                const profileSnap = await getDoc(profileRef);

                if (profileSnap.exists()) {

                    const profileData = profileSnap.data();
                    console.log(profileData);
                    store.dispatch(updateUser(profileData));
                    navigate1('/profile')
                } else {
                    console.log("No se encontró el documento del perfil del usuario.");
                }
            }



        } catch (error) {

            setError(error.message);

            return { success: false, error: error.message };
        }
    }
    /*  const videojuegos = useLoaderData(); */

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

    return (
        <>
            {isSubmiting && <Loader message="Verificando credenciales " />}

            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-md ">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://firebasestorage.googleapis.com/v0/b/microproyecto2-b3bf3.appspot.com/o/vecteezy_heart-rating-review-icon_22057047.png?alt=media&token=b7b9c7b9-eb97-40d6-a764-9c21ce1c25b3"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Registrate!
                    </h2>

                </div>


                <Tab />

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] ">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg  sm:px-12">
                        {formErrors && (
                            <p className="text-red-500 text-xl text-center mt-4 mb-4">
                                {formErrors.message}
                            </p>
                        )}

                        {error && <p className="text-red-500 text-xl text-center mt-4 mb-4">
                            {error}
                        </p>}

                        <Form className="space-y-6" action="#" method="POST" enctype="multipart/form-data" autoComplete="off" >


                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"

                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="apellido" className="block text-sm font-medium leading-6 text-gray-900">
                                    Apellido
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="apellido"
                                        name="apellido"
                                        type="text"

                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"

                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>






                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirmar contraseña
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div className="relative">
                                <label htmlFor="favorite" className="block text-sm font-medium leading-6 text-gray-900">
                                    Videojuego favorito
                                </label>
                                <select
                                    id="favorite"
                                    name="favorite"
                                    className="mt-2 block w-full rounded-md border border-gray-300 py-1.5 pl-3 pr-10 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    defaultValue="1"
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
                                            required

                                        />
                                    </label>
                                </div>
                            </div>







                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                                >
                                    Registrese
                                </button>
                            </div>
                        </Form>

                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">O   Registrese con </span>
                                </div>
                            </div>

                            <div className="mt-6 flex content-center justify-center gap-4">
                                <button onClick={registerWithGoogle}

                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-400 focus-visible:ring-transparent"
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                        <path
                                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                            fill="#EA4335"
                                        />
                                        <path
                                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                            fill="#34A853"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">Google</span>
                                </button>


                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}


export async function action({ request }) {
    try {
        let banner = ""
        console.log(request)
        let fotoUser = null
        const errors = {}
        const formData = await request.formData();

        const name = formData.get('name');
        const apellido = formData.get('apellido');
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const favorite = formData.get('favorite');
        const photo = formData.get('profile-photo');

        const confirm_password = formData.get('confirm-password');
        console.log(name, apellido, email, username, password, favorite, photo, confirm_password)


        if (password !== confirm_password) {
            errors.message = 'Las contraseñas no coinciden'



            return errors

        }

        if (!name || !apellido || !email || !username || !password || !favorite) {
            errors.message = 'Todos los campos son requeridos'

            return errors
        }

        if (password.length < 6) {
            errors.message = 'La contraseña debe tener al menos 6 caracteres'

            return errors
        }

        if (favorite) {
            banner = await getVideojuegoBanner(db, favorite);
        }





        const useCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(useCredential)

        const uid = useCredential.user.uid;



        if (photo) {
            const storageRef = ref(storage, `users/${uid}/profile.jpg`);
            const uploadTask = await uploadBytes(storageRef, photo);
            if (uploadTask) {
                fotoUser = await getDownloadURL(storageRef);
            }
        }

        const user = {
            nombre: name,
            apellido: apellido,
            email: email,
            userName: username,
            videojuego_favorito: favorite,
            foto: fotoUser || "https://firebasestorage.googleapis.com/v0/b/sistema-info-d52b6.appspot.com/o/admin%2FAdmin-Profile-Vector-PNG.png?alt=media&token=cad644c6-bf60-49ac-8ca8-3bd80d056673",
            cover: banner,
            miembroClub: []

        }

        await setDoc(doc(db, "users", uid), user);
        store.dispatch(updateUser(user));

        return redirect('/')

    } catch (error) {
        console.log(error)
        return { message: error.message }



    }


}

export async function loader() {

    try {
        const data = await getAllVideojuegos(db);

        return data;

    } catch (error) {
        console.error("Error al obtener los videojuegos:", error);
        return [];

    }




}