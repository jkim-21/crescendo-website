import React from 'react'
import {executiveBoard} from '../data/home-page'
import {styles} from '../style'
import Founders from './Founders'

const AboutUs = () => {
  return (
    <section 
    id='about-us' 
    className={`${styles.paddingY} w-full m-auto
              lg:lg:w-[80%]`}>
      <h1 className={`${styles.heading1} text-white text-center mb-[2rem]
                    lg:mb-[4rem]`}>
        National Leadership
      </h1>
      {executiveBoard.map((founder) => (
        <div key={founder.id}>
          <Founders {...founder}/>
        </div>
      ))}
    </section>
  )
}

export default AboutUs;
