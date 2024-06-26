import React, { useState } from 'react';
import { Formik } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import AnonymousReviewImage from '../assets/guy.webp';
import mayowaImage from '../assets/mayowa.jpg';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

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
    const [starTouched, setStarTouched] = useState(false);
    const [amenitiesTouched, setAmenitiesTouched] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true); // Maintain modal state
    
    const handleStarClick = (starValue, setFieldValue) => {
        setRating(starValue);
        setStarTouched(true);
        setFieldValue('star_review', starValue);
    };

    const handleAmenitiesChange = (event, setFieldValue) => {
        const { name, checked } = event.target;
        setAmenitiesTouched(true);
        setFieldValue(name, checked);
    };

    const handleCancelClick = () => {
        setIsModalOpen(false); // Close the modal
    };

    const address = "Bonny and Clyde Street, Ajao Estate, Lagos State";
    const likes = 2;
    const dislikes = 300;
    const comments = 40;
    const time = "1 hour ago";

    const validationSchema = Yup.object().shape({
        amenities: Yup.object().test('has-amenities', '* Required', obj => amenitiesTouched ? true : Object.values(obj).some(val => val === true)),
        body: Yup.string().required('* Required'),
        star_review: Yup.number().min(1, starTouched ? '' : '* Required').required(starTouched ? '' : '* Required'),
    });

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
            toast.success("Review uploaded successfully", {
                duration: 6000,
            });
            window.location.reload();
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };
    

    return (
     <>    
        {isModalOpen && (  
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-95">
                    <div className="bg-white rounded-lg p-4 lg:w-[500px] lg:h-[590px]">
                        <Formik
                            initialValues={{
                                body: '',
                                amenities: {},
                                anonymous: false,
                                reviewer_name: '',
                                reviewer_image_url: '',
                                star_review: '',
                            }}
                            onSubmit={(values) => handleSubmit(values)}
                            validationSchema={validationSchema}
                        >
                            {({ values, handleChange, handleSubmit, errors, touched, handleBlur, setFieldValue }) => (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                                            <span className="insect-2">Select Amenities {touched.amenities && errors.amenities && <span className="text-red-500 ml-4 text-[12px]">* Required</span>}</span>
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
                                                        onChange={(e) => handleAmenitiesChange(e, setFieldValue)}
                                                        onBlur={handleBlur}
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
                                            <div>Rate Location {touched.star_review && errors.star_review && <span className="text-red-500 text-[12px] ml-4">* Required</span>}</div>
                                            <div className='flex gap-1 h-fit'>
                                                {Array.from({ length: 5 }, (_, i) => {
                                                    const starValue = i + 1;
                                                    return (
                                                        <div key={i} className='h-fit w-fit'>
                                                            <label
                                                                onClick={() => handleStarClick(starValue, setFieldValue)}
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
                                                                    onBlur={handleBlur}
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
                                            <div>Write a review {touched.body && errors.body && <span className="text-red-500 text-[12px] ml-4">* Required</span>}</div>
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
                                            onClick={handleCancelClick} // Call handleCancelClick function
                                        >
                                            CANCEL
                                        </button>
                                        
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                
            </div>
        )}
    </>
    );
}

export default CreateReview;
