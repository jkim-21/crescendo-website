import React from 'react'
import { stats } from '../data/home-page'
import {styles} from '../style'
import { YoutubeVideo } from "."

const Stats = () => {
  return (
    <section id = 'our-impact' className={`${styles.paddingY}`}>
      <h1 className={`${styles.heading1} dark-color text-center mb-[2rem] md:mb-[4rem] lg:mb-[4.5rem]`}>
        Our Impact
      </h1>
      <div className='flex flex-col mb-[3rem]
                      md:flex-row md:mb-[4rem] lg:mb-[4.5rem]'>
        {stats.map((stat) => (
          <div key={stat.id} className={`${!stat.firstStat ? 'pt-[1rem] md:pl-[1rem] lg:pl-[3rem]' : ''} ${!stat.lastStat ? 'border-b border-[#b2b2b2] pb-[1rem] md:border-b-0 md:border-r md:pr-[1rem]' : ''} flex flex-col justify-center items-center`}>
            <h3 className={`${styles.heading3} text-gradient-dark text-center mb-5
                          xl:text-[2.5rem] xl:leading-[3.25rem]`}>
              {stat.value}
            </h3>
            <img src={stat.img} alt={stat.id} className='w-[7rem] mb-[2rem]'/>
            <p className={`${styles.paragraph} text-center dark-color uppercase`}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>
        <div className='m-auto w-full
                        md:w-[66.67%]'>
          <p className={`${styles.paragraph} font-semibold text-[0.875rem] gray-color mb-[0.5rem]`}>LEARN MORE ABOUT THE ORGANIZATION</p>
          <h2 className={`${styles.heading3} font-semibold mb-[0.5rem]`}>Welcome to C4C: Our Origin Story</h2>
          <p className={`${styles.paragraph} dark-color mb-[2rem]`}>Hear from some of our officers to learn why we are so passionate about what we do.</p>
          <div className='flex justify-center'>
            <YoutubeVideo/>
          </div>
        </div>
    </section>
    
  );
}

export default Stats;
