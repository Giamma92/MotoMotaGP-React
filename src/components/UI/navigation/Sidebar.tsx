import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ReactComponent as LogoSvg } from 'assets/img/site-logo.svg';

import Icon from 'components/UI/elements/Icon'
import HamburgerButton from '../menu/HamburgerButton'

import 'scss/UI/Sidebar.scss'
import { useAuth } from 'components/Auth/AuthContext';

const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const [mobileMenu, setMobileMenu] = useState(false)
    const location = useLocation()
    const auth = useAuth();

    const Menus = [
        { title: 'Dashboard', path: '/', src: <Icon icon="fa-solid fa-gauge" /> },
        { title: 'Schieramenti', path: '/deployments', src: <Icon icon="fa-solid fa-chess-board" /> },
        { title: 'Scommesse sprint', path: '/betssprt', src: <Icon icon="fa-solid fa-comment-dollar" /> },
        { title: 'Scommesse gara', path: '/betsrace', src: <Icon icon="fa-solid fa-question" />, gap: 'true' },
    ]

    return (
        <>
        <div
            className={`${
            open ? 'expand' : 'coll'
            } hidden sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
        >
            <Icon icon="fa-solid fa-chevron-left"
                className={`${
                    !open && 'rotate-180'
                } toggle__menu absolute text-3xl bg-white fill-slate-800 rounded-full cursor-pointer top-9 -right-6 dark:fill-gray-400 dark:bg-gray-800`}
                onClick={() => setOpen(!open)}
            />
            <Link to='/'>
                <div className={`flex ${open && 'gap-x-4'} items-center`}>
                    <LogoSvg className='brand__logo'/>
                    {open && (
                        <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
                            MotoMota GP
                        </span>
                    )}
                </div>
            </Link>

            <ul className='pt-6'>
            {Menus.map((menu, index) => (
                <Link to={menu.path} key={index}>
                    <li
                        className={`${open && 'reveal'} flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                                ${menu.gap ? 'mt-9' : 'mt-2'} ${
                        location.pathname === menu.path &&
                        'bg-gray-200 dark:bg-gray-700'
                        }`}
                    >
                        <span className='text-2xl'>{menu.src}</span>
                        <span
                        className={`${
                            !open && 'hidden'
                        } origin-left duration-300 hover:block`}
                        >
                        {menu.title}
                        </span>
                    </li>
                </Link>
            ))}
            </ul>
            <div className='mt-30 pointer' onClick={_ => auth.logout()}>Logout</div>
        </div>
        {/* Mobile Menu */}
        <div className="pt-3">
            <HamburgerButton
            setMobileMenu={setMobileMenu}
            mobileMenu={mobileMenu}
            />
        </div>
        <div className="sm:hidden">
            <div
            className={`${
                mobileMenu ? 'flex' : 'hidden'
            } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white  bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
            >
            {Menus.map((menu, index) => (
                <Link
                to={menu.path}
                key={index}
                onClick={() => setMobileMenu(false)}
                >
                <span
                    className={` ${
                    location.pathname === menu.path &&
                    'bg-gray-200 dark:bg-gray-700'
                    } p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                    {menu.title}
                </span>
            </Link>
            ))}

            <div className='mt-30 pointer' onClick={_ => auth.logout()}>Logout</div>
        </div>
    </div>
    </>
    )
}

export default Sidebar