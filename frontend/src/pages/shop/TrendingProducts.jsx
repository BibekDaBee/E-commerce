// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import ProductCards from './ProductCards'
import products from "../../data/products.json"

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);
    const loadMoreProducts = () =>{
        setVisibleProducts(prevCount => prevCount+4)
    }
  return (
    <section className='section__container product__container'>
        <h2 className='section__header'>Trending Products</h2>
        <p className='section__subheader mb-12'>Discover the Hottest Picks: Elevate Your Style With Our Curated Collection Of Trending Jewellery Fashion Product.</p>

        {/* products card */}
        <ProductCards products={products }/>
    </section>
  )
}

export default TrendingProducts