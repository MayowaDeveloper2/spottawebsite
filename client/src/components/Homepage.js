import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StarIcon from '@mui/icons-material/Star';
import mayowa from '../assets/mayowa.jpg';
import Navbar from './navbar';

const Homepage = () => {

   
  const additionalContainers = new Array(8).fill(null);

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-12'>
        <div className='col-span-12 lg:col-span-6 mx-10 md:ml-24 h-screen flex flex-col justify-center items-center md:items-start'>
          <h1 className='max-w-[900px] lg:max-w-[600px] md:text-left font-bold text-6xl mb-8'>Find a place you will love to live!</h1>
          <p className='max-w-[600px] text-base mb-8'>
            See through the lenses of people who have lived or visited
            the neighbourhood you might have in mind.
          </p>
          <form className='w-full'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none'>
                <SearchIcon />
              </div>
              <input type='search' className='w-full ps-10 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none' placeholder='Enter address' />
            </div>
          </form>
          <button type='button' className='button text-white bg-customBlue mt-3 px-2 py-2 bg-blue-900 rounded-md w-[146px]'>
            SEARCH
          </button>
        </div>
        <div className='mx-auto lg:col-start-8 col-span-12 lg:col-span-5 lg:left-7 lg:mr-24 h-screen flex flex-col bg-[#e5eaf5] relative '>    
          <div className='container overflow-y-scroll grid lg:grid-cols-2 gap-4'>
            {additionalContainers.map((_, index) => (
              <div key={index} className='w-[239px] h-[233px] rounded-xl bg-customWhite'>
                <div className='flex flex-col grid-cols-2 '>
                  <div className='flex items-center mt-4 ml-4'>
                    <img className="w-6 h-6 mr-2 rounded-full" src={mayowa} alt="" />
                    <div className='text-sm'>
                      <p className='leading-none'>James T.</p>
                      <p className='text-[9px]'>5 months ago</p>
                    </div>
                    <div className='text-sm ml-14'>
                      <p className='leading-none' style={{fontSize: "11px"}}>Ikate, Lekki</p>
                      <div className='flex flex-row'>
                        <span className='inline-block'><StarIcon style={{ fontSize: '10px', color: "#ecc94b"}}  /></span>
                        <span className='inline-block'><StarIcon style={{ fontSize: '10px', color: "#ecc94b" }}  /></span>
                        <span className='inline-block'><StarIcon style={{ fontSize: '10px', color: "#ecc94b" }} /></span>
                        <span className='inline-block'><StarIcon style={{ fontSize: '10px', color: "#808080" }} /></span>
                        <span className='inline-block'><StarIcon style={{ fontSize: '10px', color: "#808080" }} /></span>
                      </div>
                    </div>
                  </div>
                  <div className='px-3 py-1'>
                    <p className='text-[14px] max-w-[207px] max-h-[140px] text-justify'>There is no stable electricity. The roads are fairly good and there is a sense of community
                    The drainage system is poor and most residents litter their surroundings. There are lots stores and Supermarkets.</p>
                  </div>
                  <div className='mb-4'>
                    <div className='flex flex-row ml-4 mt-1' style={{fontSize: "14px"}}>
                      <span className='inline-block mr-2 text-customGreyy'><ThumbUpIcon  style={{fontSize: "14px", color: "#808080"}} /> 24</span>
                      <span className='inline-block mr-2 text-customGreyy'><ThumbDownAltIcon  style={{fontSize: "14px", color: "#808080"}} /> 02</span>
                      <span className='inline-block text-customGreyy'><ChatBubbleIcon  style={{fontSize: "14px", color: "#808080"}} /> 125</span>
                      <span className='inline-block ml-12 border-1 border-yellow-500 rounded-full px-2 py-1 text-[9px] border-solid outline outline-1 outline-yellow-800 bg-yellow-200'>Traffic</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute overflow-y-scroll top-1 bottom-1 left-1 right-1 bg-gradient-to-b from-white via-transparent to-white " />
        </div>
      </div>
    </>
  );
};

export default Homepage;