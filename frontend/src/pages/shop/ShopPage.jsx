import React, { useEffect, useState } from 'react'

import productsData from '../../data/products.json'
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsAPI';

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
        {label: 'Under $50', min:0, max:50},
        {label: '$50-$100', min:50, max:100},
        {label: '$100-$200', min:100, max:200},
        {label: '$200 and above', min:200, max:Infinity},
    ]
} 

const ShopPage = () => {
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

     const [currentPage, setcurrentPage] = useState(1);
     const [ProductsPerPage] = useState(8);

     const {category, color, priceRange} = filtersState;
     const [minPrice, maxPrice] = priceRange.split('-').map(Number);

     const {data:{products = [], totalPages, totalProducts} = {}, error, isLoading} = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: ProductsPerPage,
     })


    // clear fliter
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        })
    }
    
   if(isLoading) return <div>...Loading</div>
   if(error) return <div>Error loading products: {error.message}</div>

  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'>Discover the Hottest Picks: Elevate Your Style with our Curated Collection of Trending Jewellery Products!</p>
    </section>

    <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'> 
            {/* Left Side */}
            <ShopFiltering 
            filters={filters} 
            filtersState={filtersState} 
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
            />
            
            {/* Right Side */}
            <div>
                <h3 className='text-xl font-medium mb-4'>Products Available: {products.length}</h3>
                <ProductCards products={products}/>
            </div>

        </div>
    </section>
    </>
  )
}

export default ShopPage