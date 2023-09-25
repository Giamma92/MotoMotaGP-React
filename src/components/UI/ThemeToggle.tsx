import React, { useContext } from 'react'
import {ThemeContext} from './ThemeContext'
import Icon from './Icon'

const Toggle = () => {
    const {theme, applyTheme} = useContext(ThemeContext)

    return (
        <div className='transition ease-in-out duration-500 rounded-full p-2'>
            {theme === 'dark' ? (
                <Icon icon="fa-solid fa-sun"
                    onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
                    className='text-gray-500 text-2xl dark:text-gray-400 cursor-pointer'
                />
            ) : (
                <Icon icon="fa-solid fa-moon"
                    onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
                    className='text-gray-500 text-2xl dark:text-gray-400 cursor-pointer'
                />
            )}
        </div>
    )
}

export default Toggle