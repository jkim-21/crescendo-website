import React from 'react'
import { feedback, founders } from '../constants'
import styles from '../style'
import Feedback from './Feedback'

const Founders = () => {
  return (
    <section id='about-us' className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
      <div className='absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-[40rem]'/>
      <h1 className =  {`text-white text-center mb-10 ${styles.heading2}`}>About Us</h1>
      <div className='w-full items-center sm:mb-16 mb-6 relative z-[1]'>

        <div className='w-full md:mt-0 mt-6 flex justify-between ml-10 mb-20'>
          <div className='basis-[35%]'>
            <img src={founders[0].img} alt = "Allen Beckwith" className= "object-contain w-[323px]"/>
          </div>     
          <div className='text-left basis-[70%]'>
            <h2 className={'founder-title text-[2.5rem] font-poppins font-medium mt-1 mb-2'}>{founders[0].name}</h2>
            <h3 className='text-white text-[1.5rem] font-poppins px-0 mb-2'>{founders[0].title}</h3>
            <p className={`${styles.paragraph} mb-4`}>{founders[0].content1}</p>
            <p className={`${styles.paragraph}`}>{founders[0].content2}</p>
          </div>
        </div>

        <div className='w-full md:mt-0 mt-6 flex justify-between ml-10 mb-20'>
          <div className='basis-[35%] flex items-center'>
            <img src={founders[1].img} alt = "Kiran Mohan" className= "object-contain w-[323px]"/>
          </div>     
          <div className='text-left basis-[70%]'>
            <h2 className={'founder-title text-[2.5rem] font-poppins font-medium mt-1 mb-2'}>{founders[1].name}</h2>
            <h3 className='text-white text-[1.5rem] font-poppins mb-2'>{founders[1].title}</h3>
            <p className={`${styles.paragraph} mb-4`}>{founders[1].content1}</p>
            <p className={`${styles.paragraph}`}>{founders[1].content2}</p>
          </div>    
        </div>

        <div className='w-full md:mt-0 mt-6 flex justify-between ml-10'>
          <div className='basis-[35%]'>
            <img src={founders[2].img} alt = "Jonathan Raymond" className= "object-contain w-[323px]"/>
          </div>     
          <div className='text-left basis-[70%]'>
            <h2 className={'founder-title text-[2.5rem] font-poppins font-medium mt-1 mb-2'}>{founders[2].name}</h2>
            <h3 className='text-white text-[1.5rem] font-poppins mb-2'>{founders[2].title}</h3>
            <p className={`${styles.paragraph} mb-4`}>{founders[2].content1}</p>
            <p className={`${styles.paragraph}`}>{founders[2].content2}</p>
          </div>    
        </div>

      </div>
      
    </section>
  )
}

export default Founders
