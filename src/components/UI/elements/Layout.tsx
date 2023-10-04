import React from 'react'
import Sidebar from 'components/UI/navigation/Sidebar'
import Navbar from 'components/UI/navigation/Navbar'
import { Toast } from 'components/UI/elements/Toast'


const Layout = ({ children }: any) => {
    return (
        <>
            <div className='flex flex-auto h-screen'>
                <Toast />
                <Sidebar />
                <div className='grow dark:bg-gray-800'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout