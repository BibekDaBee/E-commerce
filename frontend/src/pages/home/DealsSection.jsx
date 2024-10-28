// eslint-disable-next-line no-unused-vars
import React from 'react'

import dealsImg from '../../assets/deals.png'

function DealsSection() {
  return (
    <section className='section__container deals__container'>
        <div className='deals__image'>
            <img src={dealsImg} alt="Deal Image"/>
        </div>

        <div className='deals__content'>
            <h5>Get Upto 20% Discount</h5>
            <h4>Deals of This Month</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Soluta maiores dolorum sed deleniti quaerat suscipit repellendus 
                obcaecati eligendi itaque consequuntur nemo reiciendis quis laborum ipsam fugiat, 
                tempore iusto possimus minima.</p>
            <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                    <h4>14</h4>
                    <p>Days</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>20</h4>
                    <p>Hours</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>15</h4>
                    <p>Mins</p>
                </div>
                <div className='deals__countdown__card'>
                    <h4>05</h4>
                    <p>Secs</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default DealsSection