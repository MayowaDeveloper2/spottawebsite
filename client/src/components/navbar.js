import React from 'react';
import { useNavigate } from 'react-router-dom';

import spotta from '../assets/spottalogo.svg';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/reviews');
    };

    return (
        <>
        <nav className='fixed z-20 h-12 w-full bg-white flex justify-between'>
            <div className='flex flex-row '>
                <img className='ml-24' src={spotta} alt=""/>
            </div>
            <div className='flex items-center justify-end'>
                <span className='mr-24 text-blue-700 font-bold' onClick={handleLoginClick}>Login</span>
            </div>
        </nav>
        </>
    )
}

export default Navbar;
