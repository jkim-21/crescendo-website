import React from 'react'
import { stats } from '../data/home-page'
import styles from '../style'

const Stats = () => {
  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      {stats.map((stat) => (
        <div key={stat.id} className="flex flex-col justify-center items-center mt-16 ml-[3rem]">
          {/* Value */}
          <h4 className='font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white'>
            {stat.value}
          </h4>
          {/* Title */}
          <p className='font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase'>
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Stats;
