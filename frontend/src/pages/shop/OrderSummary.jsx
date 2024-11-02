import React from 'react'
import { useSelector } from 'react-redux'

const OrderSummary = () => {

    const products = useSelector((store) => store.cart.products);
    const {tax, taxRate, totalPrice, grandTotal, selectedItems} = useSelector((store) => store.cart)

  return (
    <div className='bg-primary-light mt-5 rounded text-base'>
        <div className='px-6 py-4 space-y-5'>
            <h2 className='text-xl text-text-dark'>Order Summary</h2>
            <p className='text-text-dark mt-2'>Selected Items: {selectedItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Tax ({taxRate*100}%): ${tax.toFixed(2)}</p>
            <h3 className='font-semibold'>GrandTotal: ${grandTotal.toFixed(2)}</h3>

            <div className='px-4 mb-6'>
                <button className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md
                flex justify-center items-center mb-4'>
                    <span className='mr-2'>Clear Cart </span>
                    <i className="ri-delete-bin-7-line"></i>
                    </button>
                <button className='bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md
                flex justify-center items-center mb-4'>
                    <span className='mr-2'>Proceed To Checkout</span>
                    <i className="ri-bank-card-line"></i>
                    </button>
            </div>
        </div>
    </div>
  )
}

export default OrderSummary