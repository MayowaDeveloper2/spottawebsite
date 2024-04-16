import React, { useState } from 'react';
import { Formik } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import AnonymousReviewImage from '../assets/emptyreview.jpg';
import mayowaImage from '../assets/mayowa.jpg';

const CreateReview = () => {
    const reviewFormAmenities = [
        { name: 'Parking Lot', value: 'parkingLot' },
        { name: 'Nightlife', value: 'nightlife' },
        { name: 'Hospitals', value: 'hospitals' },
        { name: 'Adult Home', value: 'adultHome' },
        { name: 'Schools', value: 'schools' },
        { name: 'Free Wi-Fi', value: 'wifi' },
        { name: 'Pet Store', value: 'petStore' },
        { name: 'Childcare', value: 'childcare' },
        { name: 'Gym', value: 'gym' },
        { name: 'Security', value: 'security' }
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };

    const address = "Bonny and Clyde Street, Ajao Estate, Lagos State";
    const likes = 2;
    const dislikes = 300;
    const comments = 40;
    const time = "1 hour ago";

    const handleSubmit = (values) => {
        if (values?.anonymous === true) {
            values.reviewer_name = 'Anonymous';
            values.reviewer_image_url = AnonymousReviewImage;
        } else {
            values.reviewer_name = 'Akintoye Mayowa';
            values.reviewer_image_url = mayowaImage;
        }
        const data = {
            address: address,
            time: time,
            likes: likes,
            dislikes: dislikes,
            comments: comments,
            star_review: rating,
            ...values
        };

        
        axios.post('https://spottawebsite-api.vercel.app/reviews', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-95">
            <div className="bg-white rounded-lg p-8 lg:w-[500px] lg:h-[587px]">
                <Formik
                    initialValues={{
                        body: '',
                        amenities: {},
                        anonymous: false,
                        reviewer_name: "Akintoye Mayowa",
                        reviewer_image_url: "../assets/mayowa.jpg"
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}  className="flex flex-col gap-6">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold">Review Location</h1>
                                <p className="text-gray-600 text-left mt-2">{address}</p>
                            </div>
                            <div className="relative bg-lightBlue w-full">
                                <button
                                    type="button"
                                    className="h-12 rounded-[6px] w-full bg-inherit p-2 flex items-center justify-between"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className="insect-2">Select Amenities</span>
                                    <ExpandMoreIcon className="h-6 w-6" />
                                </button>
                                <div className={`h-[164px] w-full p-2 rounded-b-md grid grid-cols-2 gap-y-2 gap-x-6 bg-lightBlue absolute bottom-[-164px] border-[1px] border-gray z-10 duration-[.2s] ${
                                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                                }`}>
                                    {reviewFormAmenities.map((amenity, index) => (
                                        <div key={index} className='flex gap-3 justify-start items-center'>
                                            <input
                                                type="checkbox"
                                                name={amenity.value}
                                                className='cursor-pointer'
                                                checked={values.amenities[amenity.value]}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={amenity.value} className='text-sm'>
                                                {amenity.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='w-full h-[55px] flex flex-col items-start justify-between'>
                                <>  
                                    <div>Rate Location</div>
                                    <div className='flex gap-1 h-fit'>
                                        {Array.from({ length: 5 }, (_, i) => {
                                            const starValue = i + 1;
                                            return (
                                                <div key={i} className='h-fit w-fit'>
                                                    <label
                                                        onClick={() => handleStarClick(starValue)}
                                                        className='cursor-pointer'
                                                    >
                                                        <StarIcon
                                                            fontSize='20px'
                                                            style={{ color: starValue <= rating ? "#FFC700" : "#D4DCF1" }}
                                                        />
                                                        <input
                                                            className='hidden'
                                                            value={starValue}
                                                            onChange={handleChange}
                                                        />
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            </div>
                            <div className='w-full flex flex-col items-start gap-4'>
                                <>
                                    <textarea
                                        name='body'
                                        id="body"
                                        className='outline-0 min-h-[173px] max-h-[173px] min-w-full max-w-full p-3 bg-[#FBFAFC] border-[1px] border-gray text-sm text-darkFont rounded-md'
                                        placeholder='Write a review'
                                        value={values.body}
                                        onChange={handleChange}
                                    />
                                </>
                            </div>
                            <div className='flex justify-start gap-1 w-full'>
                                <input
                                    type='checkbox'
                                    name='anonymous'
                                    id='anonymous'
                                    className='cursor-pointer'
                                    checked={values.anonymous}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor='anonymous'
                                    className='text-[#484851] text-sm'
                                >
                                    Post as anonymous
                                </label>
                            </div>
                            <div className='w-full flex flex-col lg:flex-row gap-3 justify-between items-center'>
                                <button
                                    type="submit"
                                    className="w-[312px] font-bold h-10 rounded-md text-white bg-blue-600"
                                >
                                    SUBMIT
                                </button>
                                <button
                                    type="button"
                                    className='w-[312px] font-bold rounded-md outline outline-1 h-10 bg-transparent text-blue-600'
                                >
                                    CANCEL
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreateReview;
