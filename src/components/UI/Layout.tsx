import React from 'react'
import Sidebar from './navigation/Sidebar'
import Navbar from './navigation/Navbar'


const Layout = ({ children }: any) => {
    return (
        <>
            <div className='flex flex-auto h-screen'>
                <Sidebar />
                <div className='grow'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default Layout