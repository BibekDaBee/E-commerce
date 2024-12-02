// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsAPI";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };
  const {
    data: { products = [], totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    page: 1, // Assuming page 1 fetches trending products
    limit: 100, // Fetch a large number, then slice locally for "Load More" behavior
  });

  if (isLoading) return <div>Loading trending products...</div>;
  if (error) return <div>Error loading trending products: {error.message}</div>;

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the Hottest Picks: Elevate Your Style With Our Curated
        Collection Of Trending Jewellery Fashion Product.
      </p>

      {/* products card */}
      <div className="mt-12">
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      {/* Load More Products Button */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
