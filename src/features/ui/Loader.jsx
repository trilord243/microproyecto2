
import svg from '../../assets/Loader.svg'



export const Loader = ({ mensaje = "Verificando datos" }) => {
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center'>
      <div>
        <h1 className='text-white text-5xl text-center animate-pulse mb-5'>{mensaje}</h1>
        <img src={svg} alt='loading' className='mx-auto h-48' />
      </div>
    </div>
  )
}

export default Loader