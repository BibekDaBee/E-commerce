// eslint-disable-next-line no-unused-vars
import React from 'react'

import category1 from '../../assets/category-1.jpg'
import category2 from '../../assets/category-2.jpg'
import category3 from '../../assets/category-3.jpg'
import category4 from '../../assets/category-4.jpg'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = [
        {name: 'Accessories', path: 'accessories', Image: category1},
        {name: 'Dress Collection', path: 'dress', Image: category2},
        {name: 'Jewellery', path: 'jewellery', Image: category3},
        {name: 'Cosmetics', path: 'cosmetics', Image: category4},
    ];

    return (
        <>
            <div className='product__grid'>
                {categories.map((category, ) => (
                    <Link key={category.name } to={`/categories/${category.path}`} className='categories__card'>
                        <img src={category.Image} alt={category.name} />
                        <h4>{category.name}</h4>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Categories;
