import React, { useState } from 'react';
import emptyreview from "../assets/emptyreview.jpg";
import CreateReview from './createreview';

const Noreview = () => {
    const [showReviewForm, setShowReviewForm] = useState(false);

    const handleClick = () => {
        setShowReviewForm(true);
    }

    return (
        <>
            {showReviewForm ? (
                <CreateReview />
            ) : (
                <div className='flex flex-col w-full mx-auto items-center justify-center'>
                    <div><img className="items-center mt-10" style={{ width: "250px", height: "150px" }} src={emptyreview} alt="" /></div>
                    <div className='mt-4'>Oops! No reviews yet.</div>
                    <button onClick={handleClick} className='bg-customBlue text-white px-4 py-2 mt-4 rounded-md'>LEAVE A REVIEW</button>
                </div>
            )}
        </>
    );
}

export default Noreview;
