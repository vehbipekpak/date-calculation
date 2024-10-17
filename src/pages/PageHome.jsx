import React from 'react'
import { NavLink } from "react-router-dom"
import { MdOutlineAvTimer } from "react-icons/md"
import { HiMiniVideoCamera } from "react-icons/hi2"

const PageHome = () => {
    return (
        <>
            <div className='flex justify-evenly gap-6'>
                <NavLink
                    to='date-calculate'
                    className='group w-1/2 grow rounded-md flex gap-1 flex-col items-center p-3 border border-gray-600 bg-gray-700 hover:border-yellow-500 hover:bg-yellow-600 transition-all'
                >
                    <MdOutlineAvTimer className='text-5xl text-yellow-500 group-hover:text-gray-900 transition-all' />
                    <span className='text-sm font-bolds text-gray-200 group-hover:text-gray-900 group-hover:font-semibold transition-all'>Tarih Farkı Hesapla</span>
                </NavLink>
                <NavLink
                    to='camera-match'
                    className='group w-1/2 grow rounded-md flex gap-1 flex-col items-center p-3 border border-gray-600 bg-gray-700 hover:border-lime-500 hover:bg-lime-600 transition-all'
                >
                    <HiMiniVideoCamera className='text-5xl text-lime-600 group-hover:text-gray-900 transition-all' />
                    <span className='text-sm font-bolds text-gray-200 group-hover:text-gray-900 group-hover:font-semibold transition-all'>Kamera Eşle</span>
                </NavLink>
            </div>
        </>
    )
}

export default PageHome