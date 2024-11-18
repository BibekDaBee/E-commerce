import React from 'react'
import { useSelector } from 'react-redux'
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi';

const UserReviews = () => {
    const {user} = useSelector((state) => state.auth);
    const {data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?.id);

    console.log(reviews)
    
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Failed to load reviews!</div>


  return (
    <div className='py-6'>
        <h2 className='text-2xl font-semibold mb-8'>Your Given Reviews</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 '>
            {
                reviews && reviews.map((review, index) => (
                    <div key={index} className='bg-white shadow-md rounded-lg p-4 border-gray-200 cursor-pointer 
                    hover:scale-105 transition-all duration-200'
                    >
                        <p className='text-lg font-semibold mb-2'>Rating: {review?.rating}</p>
                        <p className='mb-2'><strong>Comment: </strong>{review?.comment}</p>
                        <p className='mb-2'><strong>Date: </strong>{new Date(review?.createdAt).toLocaleString()}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default UserReviews