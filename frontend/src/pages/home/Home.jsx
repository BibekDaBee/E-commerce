// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import Banner from './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'
import Blogs from '../blogs/Blogs'

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  return (
  <>
  <Banner/>
  {/* <Categories/> */}
  {/* <HeroSection/> */}
  <TrendingProducts/>
  <DealsSection/>
  <PromoBanner/>
  {/* <Blogs/> */}
  </>
)
}

export default Home