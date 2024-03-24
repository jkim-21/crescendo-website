import React from 'react'
import { stats } from '../data/home-page'
import {styles} from '../style'

const Stats = () => {
  return (
    <section id = 'our-work' className='pt-16'>
      <h1 className={`${styles.heading2} text-center ss:text-[4.5rem] mb-10`}>
        Our Work
      </h1>
      <div className={`${styles.flexCenter} flex sm:mb-20`}>
        {stats.map((stat) => (
          <div key={stat.id} className={`flex flex-col justify-center items-center mt-10 px-[3rem] ${!stat.lastStat ? 'border-r border-[#b2b2b2]' : ''}`}>
            
            <h4 className='font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-gradient-dark mb-5 text-center'>
              {stat.value}
            </h4>
            <img src={stat.img} alt={stat.id} className='w-[7rem] mb-5'/>
            <p className='font-normal text-center xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] black-color uppercase'>
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
    
  );
}

export default Stats;
