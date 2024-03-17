import React from 'react'
import {founders} from '../data/home-page'
import styles from '../style'
import Founders from './Founders'

const AboutUs = () => {
  return (
    <section id='about-us' className='pt-16'>
      <h1 className={`${styles.heading2} text-white text-center mb-10 ss:text-[4.5rem]`}>About Us</h1>
      <div className='w-full z-[1]'>
        {founders.map((founder) => (
          <div key={founder.id}> {/* Fixed margin */}
            <Founders {...founder}/>
          </div>
        ))}
      </div>
    </section>
  )
}



export default AboutUs
