import React from 'react'
import instaIMG1 from '../assets/instagram-1.jpg'
import instaIMG2 from '../assets/instagram-2.jpg'
import instaIMG3 from '../assets/instagram-3.jpg'
import instaIMG4 from '../assets/instagram-4.jpg'
import instaIMG5 from '../assets/instagram-5.jpg'
import instaIMG6 from '../assets/instagram-6.jpg'

const Footer = () => {
  return (
    <div>
        <footer className='section__container footer__container'>
            <div className='footer__col'>
                <h4>CONTACT INFO</h4>
                <p>
                    <span><i className="ri-map-pin-2-fill"></i></span>
                    123,Parramatta Street, Parramatta
                </p>
                <p>
                    <span><i className="ri-mail-fill"></i></span>
                    support@gmail.com
                </p>
                <p>
                    <span><i className="ri-phone-fill"></i></span>
                    1234567890
                </p>
            </div>

            <div className='footer__col'>
                <h4>COMPANY</h4>
                <a href='/'>Home</a>
                <a href='/'>About us</a>
                <a href='/'>Work With Us</a>
                <a href='/'>Our Blogs</a>
                <a href='/'>Terms and Conditions</a>
            </div>

            <div className='footer__col'>
                <h4>USEFUL LINKS</h4>
                <a href='/'>Help</a>
                <a href='/'>Track Your Order</a>
                <a href='/'>Men</a>
                <a href='/'>Women</a>
                <a href='/'>Jewellery</a>
            </div>
            
            <div className='footer__col'>
                <h4>INSTAGRAM</h4>
                <div className='instagram__grid'>
                    <img src={instaIMG1} alt='InstaImage'/>
                    <img src={instaIMG2} alt='InstaImage'/>
                    <img src={instaIMG3} alt='InstaImage'/>
                    <img src={instaIMG4} alt='InstaImage'/>
                    <img src={instaIMG5} alt='InstaImage'/>
                    <img src={instaIMG6} alt='InstaImage'/>
                </div>
            </div>
        </footer>

        <div className='footer__bar'>
            Copyright © 2024 by E-Commerce. All rights reserved.
        </div>
    </div>
  )
}

export default Footer