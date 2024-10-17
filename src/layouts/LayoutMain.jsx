import React from 'react'
import { Outlet } from 'react-router-dom'
import CompHeader from '../components/CompHeader.jsx'

const MainLayout = () => {
    return (
        <>
            <CompHeader />
            <div className='mx-auto max-w-screen-xl'>
                <div className='bg-[#1f2937] m-2 mt-3 p-4 rounded-md'>
                    <Outlet />
                </div>
                {/* <h2 className='text-center text-xs text-gray-700 font-semibold p-4'>Vehbi PEKPAK<br/><a href='tel:+905061399663' className='text-[10px] text-gray-800'>+90(506) 139-9663</a></h2>  */}
            </div>
        </>
    )
}

export default MainLayout