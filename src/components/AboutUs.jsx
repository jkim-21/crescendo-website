import React from 'react'
import {founders} from '../data/home-page'
import styles from '../style'
import Founders from './Founders'

const AboutUs = () => {
  return (
    <section id='about-us' className={`${styles.flexCenter} flex-col relative`}>
      <div className='absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-[40rem]'/>
      <h1 className={`${styles.heading2} text-white text-center mb-10 ss:text-[4.5rem]`}>About Us</h1>
      <div className='w-full z-[1]'>
        {founders.map((founder) => (
          <div className="mb-8"> {/* Fixed margin */}
            <Founders key={founder.id} {...founder}/>
          </div>
        ))}
      </div>
    </section>
  )
}



export default AboutUs
