import {styles} from '../style'
import { Slideshow } from '.';
import React from "react";


const Hero = () => {
  return (
    <section className={`${styles.paddingY} flex flex-col items-center justify-between gap-[2rem]
                        md:flex-row lg:gap-[5rem] lg:justify-start`}>
      <div className={`${styles.flexStart} flex-col max-w-full items-center mb-[3rem]
                      sm:mb-0 sm:items-start md:[flex-basis:55%] lg:[flex-basis:50%]`}>
        <div className={`block ${styles.heading1} mb-[1.5rem] text-white text-center
                        sm:hidden sm:text-left md:block lg:mb-[2.5rem]`}>
          <h1>Music</h1>  
          <h1 className='text-gradient'>Motivates</h1> 
          <h1>Meaning.</h1>
        </div>

        <div className='hidden items-center justify-between  max-w-full mb-[3rem]
                        sm:flex md:hidden'>
          <div className={`${styles.heading2} [flex-basis:40%] text-white font-bold ml-[2rem]`}>
            <h1>Music</h1>  
            <h1 className='text-gradient'>Motivates</h1> 
            <h1>Meaning.</h1>
          </div>
          <div className='[flex-basis:45%] pr-[1rem]
                          md:hidden'>
            <Slideshow/>
          </div>

        </div>

        <p className={`${styles.paragraph} white-text max-w-[37.5rem] text-center
                      sm:text-start`}>
        We are Crescendo for a Cause, a registered 501(c)(3) non-profit and Presidential Volunteer Service Award certifying organization. Our mission is to improve music education in underserved areas and to utilize music performance as a vehicle for advocacy and community service.
        </p>
        <div className='relative'>
          <div className="hidden absolute z-[1] w-[21.875rem] h-[32rem] rounded-full white__gradient left-[5rem] bottom-0
                          md:block"/>
        </div>
      </div>
      <div className='block w-full px-[2rem]
                      sm:hidden sm:px-[0] md:block md:[flex-basis:45%] md:pr-[1rem]'>
        <Slideshow/>
      </div>
    </section>
  )
}

export default Hero
