import React from 'react'
import {styles} from '../style'
import Feedback from './Feedback'
import { feedback } from '../data/home-page'

const Testimonials = () => {
  return (
    <section id='events' className={`${styles.flexCenter} py-28 flex-col relative`}>
      <div className='w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'>
        <h2 className={`${styles.heading2} text-center`}>
          Recent Events/News <br className='sm:block hidden'/>
        </h2>
        <div className='w-full md:mt-0 mt-6'>
          <p className={`${styles.paragraphBlack} text-center max-w-[450px] mx-auto`}>
            Here are just some of our recent activities & performances!
          </p>  
        </div>
      </div>
      <div className='flex flex-wrap justify-center w-full feedback-container items-stretch relative z-[1]'>
        {feedback.map((card) => (
          <Feedback key={card.id} {...card}/>        
        ))}
      </div>      
    </section>
  )
}

export default Testimonials;

