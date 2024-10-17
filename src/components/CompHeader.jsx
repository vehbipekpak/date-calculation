import React from 'react'
import { NavLink } from "react-router-dom"
import { MdOutlineAvTimer } from "react-icons/md"
import { HiMiniVideoCamera } from "react-icons/hi2"
import imgLogo from '../assets/images/logo.svg'

const CompHeader = () => {
    return (
        <header>
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <NavLink to="/" className="flex items-center">
                        <img
                            src={imgLogo}
                            className="mr-3 h-10 w-10"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Cebeci <span className='text-red-600'>S.A.B</span>
                        </span>
                    </NavLink>
                    <ul className="flex font-medium text-sm gap-6">
                        <li>
                            <NavLink to="/date-calculate" className={({ isActive }) =>
                                "flex flex-col items-center gap-0 p-1 px-2 text-gray-400 rounded bg-primary-700 border border-transparent hover:border-gray-600 " + (isActive ? "text-gray-900 font-semibold bg-yellow-500 pointer-events-none" : "text-gray-400")
                            }>
                                <MdOutlineAvTimer  className='text-2xl block sm:hidden'/>
                                <span className='hidden sm:block'>Tarih Hesapla</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/camera-match" className={({ isActive }) =>
                                "flex flex-col items-center gap-0 p-1 px-2 text-gray-400 rounded bg-primary-700 border border-transparent hover:border-gray-600 " + (isActive ? "text-gray-900 font-semibold bg-lime-500 pointer-events-none" : "text-gray-400")
                            }>
                                <HiMiniVideoCamera  className='text-2xl block sm:hidden'/>
                                <span className='hidden sm:block'>Kamera Eşle</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header >

    )
}

export default CompHeader