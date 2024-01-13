import React from 'react'
import {founders} from '../constants'
import styles from '../style'
import Founders from './Founders'

const AboutUs = () => {
  return (
    <section id='about-us' className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
      <div className='absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-[40rem]'/>
      <h1 className =  {`text-white text-center mb-10 ${styles.heading2}`}>About Us</h1>

      <div className='w-full sm:mb-16 mb-6 z-[1]'>
      

        <div className='w-full sm:mb-16 mb-6 z-[1]'>
          {founders.map((founder) => (
            <Founders key={founder.id} {...founder}/>
          ))}
        </div>

      </div>
      
    </section>
  )
}

export default AboutUs
