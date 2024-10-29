import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import products from '../../data/products.json'
import ProductCards from '../shop/ProductCards';

const CategoryPage = () => {
    const {categoryName} = useParams();
    //console.log(categoryName);
    const [filteredProducts, setfilteredProducts] = useState([]);

    useEffect(() =>{
        const filtered = products.filter((product) => product.category == categoryName.toLocaleLowerCase());
        setfilteredProducts(filtered);
    },[categoryName])

    useEffect(()=>{
        window.scrollTo(0,0);
    })

  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>Browser a diverse range of categories, from chic jewellery to versatile accessories. Elevate your style today!</p>
    </section>

    {/* Products cards*/}

    <div className='section__container'>
        <ProductCards products={filteredProducts}/>
    </div>
    </>
  )
}

export default CategoryPage