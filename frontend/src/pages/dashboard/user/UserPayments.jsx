import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/orderApi';

const UserPayments = () => {
    const {user} = useSelector((state) => state.auth);
    const {data: ordersdata, error, isLoading} = useGetOrderByEmailQuery(user?.email);
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>No order found!</div>
    const orders = ordersdata.orders || [];
    // console.log(orders)
  return (
    <div className='py-6 px-4 '>
        <h3 className='text-xl font-semibold mb-4'>Total Payments</h3>
        <div>
            <p className='text-lg text-gray-500 mb-5'>Thank you for shopping with us!</p>
            <ul>
                {
                    orders && orders.map((item, index) => (
                        <li key={index}>
                            <h5 className='font-medium text-gray-750 mb-2'>#{index + 1}</h5>
                            <div>
                                <span className='text-gray-600'>Order # ${item?.amount?.toFixed(2)}</span>
                            </div>
                            <div className='flex md:flex-row items-center space-x-2'>
                                <span className='text-gray-600'>Date: {new Date(item?.createdAt).toLocaleString()}</span>
                                <p className='text-gray-600'>
                                   | Status: <span className={`ml-2 py-[2px] px-2 text-sm rounded
                                    ${item?.status === 'completed' ? 'bg-green-100 text-green-700': 
                                        item?.status === 'pending' ? 'bg-red-100 text-red-700':
                                        item?.status === 'processing' ? 'bg-blue-100 text-blue-700':
                                        'bg-lime-100 text-lime-600'
                                    }`}
                                >
                                    {item?.status}
                                </span>
                                </p>
                            </div>
                            <hr className='my-2'/>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default UserPayments