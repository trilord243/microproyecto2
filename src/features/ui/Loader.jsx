import React from 'react'
import svg from '../../assets/Loader.svg'

import { useState} from 'react'

export const Loader = () => {

    const [loading, setLoading] = useState(false);



  return (
    <div className='absolute h-auto top-0 left-0 right-0 bottom-0 bg-black opacity-95 flex align-middle justify-center'>
        <div className='translate-y-1/3 '>
            <h1 className='text-white text-5xl text-center animate-pulse mb-5'>Cargando...</h1>
            <img src={svg} alt='loading' className='h-48'/>


        </div>

    </div>
  )
}

export default Loader