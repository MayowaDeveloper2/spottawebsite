import React, { useState } from 'react';
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CreateReview from '../components/createreview';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


const LocationInfo = () => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const tabs = [
        'Schools', 'Hospitals', 'Resort Park', 'Shopping Malls', 'Airport', 'Train Station', 'Nightlife', 'Public Wifi', 'Parking Lot', 'Security',
        'Public Transport', 'Bus Station', 'Quiet'
    ];

    const handleClick = () => {
        setShowReviewForm(!showReviewForm);
    };

    
    return (
        <div className="lg:h-[135px] h-[195px] md:h-[175px] flex flex-col w-full items-start justify-start px-[15px] md:px-[100px] bg-[#F2F6FD] gap-4 ">
            <div className="flex flex-col md:flex-row justify-between items-start h-fit w-full gap-3">
                <div className="flex flex-col items-start justify-start w-full md:w-fit gap-3">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-[500] text-[#1E1E1E]">
                        Bonny and Clyde Street, Ajao Estate, Lagos
                    </h1>
                    <p className="text-sm lg:text-base font-[500] text-[#18181B]">
                        <span>"450" Reviews (People are raving about the selected location)</span>
                    </p>
                    <div className="flex flex-row justify-end gap-4 md:absolute md:right-0 md:px-[100px]">
                        
                        <div className='flex flex-row relative'>
                            <button onClick={handleClick} className='bg-customBlue text-[12px] mt-3 text-white rounded-md px-10 h-10 mr-3'>LEAVE A REVIEW</button>
                            <button className='border h-10 items-center mt-3 outline-1 outline flex justify-center  outline-customBlue px-3 py-2 rounded-md mr-3'><BookmarkBorderOutlinedIcon className='object-center outline-1 text-customBlue'/></button>
                            <button className='border h-10 items-center mt-3 outline-1 outline flex justify-center  outline-customBlue px-3 py-2 rounded-md'><ShareOutlinedIcon className='object-center outline-1 text-customBlue'/></button>
                        </div>
                        
                    </div>
                    <div className=' mx-auto scrollable-tabs-container w-[360px] lg:w-[1240px] md:w-[800px] flex  overflow-hidden '>
                        <div className='absolute mt-1'>
                          <KeyboardArrowLeftIcon className='bg-gray-50 rounded-full w-6 h-6 cursor-pointer' style={{color: "#000000"}} />  
                        </div>
                        <ul className='flex gap-6 px-7 pt-1 pb-3  overflow-x-scroll'>
                            {tabs.map((tab, index) => (
                                <li key={index} className='no-underline inline-flex items-center outline outline-1 bg-gray-50  text-black outline-black h-4 px-3 py-3 rounded-md select-none whitespace-nowrap gap-4'> 
                                  {tab}
                                </li>
                            ))}

                        </ul>
                        <div className=" flex justify-end mt-1">
                           <KeyboardArrowRightIcon className=' bg-gray-50 rounded-full w-6 h-6 cursor-pointer' style={{color: "#000000"}} />
                        </div>

                    </div>
                    
                   
                    
                    {showReviewForm && <CreateReview />}
                      
                </div>
            </div>
            {/* <div className=' scrollable-tabs-container flex '>
                        <div className='absolute mt-1'>
                          <KeyboardArrowLeftIcon className=' bg-white rounded-full w-6 h-6 cursor-pointer' style={{color: "#000000"}} />  
                        </div>
                        <ul className='flex gap-6 px-7 md:w-[1320px] w-[380px] overflow-x-scroll'>
                            {tabs.map((tab, index) => (
                                <li key={index} className='no-underline inline-flex items-center bg-white outline outline-1 text-black outline-black h-3 px-3 py-3 rounded-md select-none whitespace-nowrap gap-4'> 
                                  {tab}
                                </li>
                            ))}

                        </ul>
                        <div class=" flex justify-end mt-1">
                           <KeyboardArrowRightIcon className=' bg-white rounded-full w-6 h-6 cursor-pointer' style={{color: "#000000"}} />
                        </div>

            </div> */}
                    
        </div>
    );
};

export default LocationInfo;
