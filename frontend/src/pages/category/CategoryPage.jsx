import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from "../../redux/features/products/productsAPI";

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [visibleProducts, setVisibleProducts] = useState(8);
    const loadMoreProducts = () => setVisibleProducts((prevCount) => prevCount + 4);
  
    const {
      data: { products = [] } = {},
      error,
      isLoading,
    } = useFetchAllProductsQuery({ category: categoryName });
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [categoryName]);
  
    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products: {error.message}</div>;
  
    const filteredProducts = products.slice(0, visibleProducts);

  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>{categoryName}</h2>
        <p className='section__subheader'>Browser a diverse range of categories, from chic jewellery to versatile accessories. Elevate your style today!</p>
    </section>

    {/* Products cards*/}

      {/* Products cards */}
      <div className="section__container">
        {filteredProducts.length > 0 ? (
          <ProductCards products={filteredProducts} />
        ) : (
          <p className="text-center text-lg">No products found in this category.</p>
        )}
      </div>

      {/* Load More Products Button */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </>
  )
}

export default CategoryPage