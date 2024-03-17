import React from 'react'
import { stats } from '../data/home-page'
import styles from '../style'

const Stats = () => {
  return (
    <section id = 'our-work' className='pt-16'>
      <h1 className={`${styles.heading2} text-center ss:text-[4.5rem] mb-10`}>
        Our Work
      </h1>
      <div className={`${styles.flexCenter} flex-wrap sm:mb-20`}>
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col justify-center items-center mt-10 ml-[3rem]">
            {/* Value */}
            <h4 className='font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-black'>
              {stat.value}
            </h4>
            {/* Title */}
            <p className='font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient-dark uppercase'>
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
    
  );
}

export default Stats;
