import React, { useState } from 'react';
import spotta from "../assets/spottalogo.svg";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import spottaim from "../assets/spotta.avif";
import LocationInfo from "../components/locationinfo";
//import Noreview from './noreviews';
import AllReviews from '../components/allreviews';

const Navbarr = () => {

    const [reviewCount] = useState(1);
    return (
        <> 
            <div className="flex items-center justify-between h-[50px] md:h-[82px] bg-[#F2F6FD] w-full mb-5 fixed top-0 left-0 px-[15px] md:px-[100px] lg:px-[100px] z-50">
                <img src={spotta} alt="" />
                <div>
                    <form className='w-full'>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none'>
                                <SearchIcon />
                            </div>
                            <input  type='text' className='lg:w-[778px] w-[150px] ps-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none text-sm' placeholder='Bonny and Clyde Street, Ajao Estate, Lagos' />
                            <div className='absolute right-0 flex items-center inset-y-0 pe-3'>
                                <CloseIcon />
                            </div>
                        </div>         
                    </form>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <p className="font[500] text-base">Welcome!</p>
                    <img className='h-6 w-6 rounded-full' src={spottaim} alt=""/>
                </div>
            </div>

            <div className="mt-[50px] md:mt-[82px]">
                <LocationInfo />
            </div>
            {reviewCount === 0 ? (
                <div className='' >
                    <AllReviews />
                </div>
            ) : (
                <AllReviews />
            )} 
        </>  
    );
}

export default Navbarr;
