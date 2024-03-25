import React from 'react'
import { stats } from '../data/home-page'
import {styles} from '../style'
import { YoutubeVideo } from "."

const Stats = () => {
  return (
    <section id = 'our-impact' className='py-24'>
      <h1 className={`${styles.heading2} text-center ss:text-[4.5rem] mb-10`}>
        Our Impact
      </h1>
      <div className={`${styles.flexCenter} flex sm:mb-20`}>
        {stats.map((stat) => (
          <div key={stat.id} className={`flex flex-col justify-center items-center mt-10 ${!stat.firstStat ? 'pl-[3rem]' : ''} ${!stat.lastStat ? 'border-r border-[#b2b2b2] pr-[3rem]' : ''}`}>
            
            <h4 className='font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-gradient-dark mb-5 text-center'>
              {stat.value}
            </h4>
            <img src={stat.img} alt={stat.id} className='w-[7rem] mb-5'/>
            <p className='font-normal text-center xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] dark-color uppercase'>
              {stat.title}
            </p>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <div className='w-[66.67%]'>
          <p className={`${styles.paragraphDarkGray} text-[14px] font-semibold`}>LEARN MORE ABOUT THE ORGANIZATION</p>
          <h4 className='font-semibold text-[48px] mb-[1rem]'>Welcome to C4C: Our Origin Story</h4>
          <p className={`${styles.paragraphBlack} mb-[2rem]`}>Hear from some of our officers to learn why we are so passionate about what we do.</p>
          <div className='flex justify-center'>
            <YoutubeVideo/>
          </div>
        </div>
      </div>
    </section>
    
  );
}

export default Stats;
