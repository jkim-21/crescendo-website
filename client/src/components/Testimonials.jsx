import React from 'react'
import styles from '../style'
import Feedback from './Feedback'
import { feedback } from '../data/home-page'

const Testimonials = () => {
  return (
    <section id='clients' className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
      <div className='absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40'/>
      <div className='w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]'>
        <h2 className={`${styles.heading2} text-center text-white`}>
          Our Impact <br className='sm:block hidden'/>
        </h2>
        <div className='w-full md:mt-0 mt-6'>
          <p className={`${styles.paragraphWhite} text-center max-w-[450px] mx-auto`}>
            Here are just some of our recent events!
          </p>  
        </div>
      </div>
      <div className='flex flex-wrap justify-center w-full feedback-container relative z-[1]'>
        {feedback.map((card) => (
          <Feedback key={card.id} {...card}/>        
        ))}
      </div>      
    </section>
  )
}

export default Testimonials;

