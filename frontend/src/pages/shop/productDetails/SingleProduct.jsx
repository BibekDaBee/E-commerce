import React from 'react'
import { Link, useParams } from 'react-router-dom'

const SingleProduct = () => {
    const {id} = useParams();
    console.log(id)
  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Single Product Page</h2>
        <div className='section__subheader space-x-2'>
            <span className='hover:text-primary'><Link to="/">home</Link></span>
            <i className="ri-arrow-right-s-line"></i>
            <span className='hover:text-primary'><Link to="/shop">shop</Link></span>
            <i className="ri-arrow-right-s-line"></i>
            <span className='hover:text-primary'>product name</span>
        </div>
    </section>
    </>
  )
}

export default SingleProduct