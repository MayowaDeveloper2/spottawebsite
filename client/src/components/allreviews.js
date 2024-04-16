import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import newyork1 from "../assets/newyork1.avif";
import newyork2 from "../assets/newyork2.avif";
import newyork3 from "../assets/newyork3.avif";

const AllReview = () => {
    const [reviews, setReviews] = useState([]);
  axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://spottawebsite-api.vercel.app/reviews');
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className='flex-col grid grid-cols-1 md:grid-cols-3 mt-6 md:ml-24'>
            {reviews.map(review => (
                <div key={review.id} className='col-span-1 md:col-span-2 relative'>
                    <div className='md:max-w-[722px] mx-4 '>
                        <div className='flex flex-row'>
                            <img className="w-6 h-6 rounded-full" src={review.reviewer_image_url} alt="" />
                            <div className='ml-3'>{review.reviewer_name}</div>
                            <div className='ml-3 text-[13px] items-center inline-flex'>{review.time}</div>
                            <span className='absolute right-0 mx-4 lg:right-[208px] md:right-[10px] top-0'><StarIcon style={{ fontSize: '10px', color: "#ecc94b"}}  /> {review.star_review}.0</span>
                        </div>
                        <div className='w-full mt-4 text-justify text-[14px]'>
                            {review.body}
                        </div>
                        <div className='mx-auto flex flex-row'>
                            <span className='inline-block mr-2 text-customDarkBlue'><ThumbUpIcon  style={{fontSize: "14px", color: "#0D2159"}} /> {review.likes}</span>
                            <span className='inline-block mr-8 text-customDarkBlue'><ThumbDownAltIcon  style={{fontSize: "14px", color: "#0D2159"}} /> {review.dislikes}</span>
                            <span className='inline-block text-customDarkBlue'><ChatBubbleIcon  style={{fontSize: "14px", color: "#0D2159"}} /> {review.comments}</span>
                        </div>
                        <div className='mt-4'>
                            <hr className='w-full border-t border-gray-300' />
                        </div>
                    </div>
                </div>
            ))}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:mr-24 mx-auto mt-4 md:absolute lg:max-w-[400px] md:max-w-[200px] md:right-0 lg:absolute lg:right-0 md:mt-0 md:col-span-1'>
                <img className='w-full h-auto' src={newyork1} alt="" />
                <img className='w-full h-auto' src={newyork2} alt="" />
                <img className='w-full h-auto' src={newyork3} alt="" />
                <img className='w-full h-auto' src={newyork3} alt="" />
            </div>
        </div>
    );
}

export default AllReview;
