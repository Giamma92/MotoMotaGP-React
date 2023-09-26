import React from 'react'
import Sidebar from './navigation/Sidebar'
import Navbar from './navigation/Navbar'
import { Toast } from 'components/Toast'


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