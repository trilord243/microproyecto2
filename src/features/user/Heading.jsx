
import { useEffect, useState } from 'react'
import { getUserName, getUserFoto, getUserVideojuegoFavorito } from './userSlice'
import { useSelector } from 'react-redux'
import { getVideojuegoBanner } from '../../api/getVideoJuegos'
import { db } from '../../firebase/firebase'
const profile = {
    name: 'Ricardo Cooper',
    email: 'ricardo.cooper@example.com',
    avatar:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    backgroundImage:
        'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',

}

export default function Heaading() {
    const name = useSelector(getUserName)
    const foto = useSelector(getUserFoto)
    const videojuegoFavorito = useSelector(getUserVideojuegoFavorito)
    const [banner, setBanner] = useState(null)

    useEffect(() => {
        const fetchBanner = async () => {
            const bannerFound = await getVideojuegoBanner(db, videojuegoFavorito)
            setBanner(bannerFound)
        }
        fetchBanner()
    }, [name, foto, videojuegoFavorito])

    return (
        <div className='w-full '>
            <div>
                <img className="h-32 w-full object-cover lg:h-48 rounded-3xl" src={banner || "https://videofileblogcom.files.wordpress.com/2023/04/super-mario-bros-1985-banner.jpg?w=1316&h=376&crop=1"} alt="" />
            </div>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div className="flex">
                        <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src={foto} alt="" />
                    </div>
                    <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                            <h1 className="truncate text-2xl font-bold text-gray-900">{name}</h1>
                        </div>

                    </div>
                </div>
                <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                    <h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
                </div>
            </div>
        </div>
    )
}


