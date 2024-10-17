import React from 'react'
import { NavLink } from "react-router-dom";
import img404 from '../assets/images/404-computer.svg'

const PageNotFound = () => {
    return (
        <div className='flex items-center flex-col gap-4 text-center'>
            <img className='max-w-96' src={img404} />
            <div>
                <h2 className='font-[400] text-gray-400 text-xl'>404 Not Found</h2>
                <h2 className='font-[900] text-blue-600 text-2xl'>Sayfa Bulunamadı!</h2>
            </div>
            <p className='text-white text-xl font-bold'>Yanlışlıkla olmayan bir sayfaya girmeye çalıştın yada birşeyler karıştırıyorsun.</p>
            <NavLink to="/" className="text-white mt-6 rounded-full p-2 px-4 bg-[#1d2841] hover:bg-blue-600 hover:text-white">Geri Git</NavLink>
        </div>
    )
}

export default PageNotFound