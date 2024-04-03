import React from 'react'
import {styles} from '../style'

const Founders = ({ content, name, title, img, lastOfficer }) => {
  return (
    <div className= {`${lastOfficer ? '' : 'mb-[2rem] md:mb-[3rem]'} flex flex-col justify-between items-center 
                    md:flex-row md:mt-0`}>
      <div className='basis-[43%] w-[85%] 
                      md:w-full lg:basis-[28%]'>
        <img 
        src={img} 
        alt={name} 
        className='object-cover min-w-full mb-[1rem] [aspect-ratio:1/1.3]
                  md:aspect-auto md:mb-[0] md:w-full'/>
      </div>     
      <div className='basis-[55%]
                      lg:basis-[70%]'>
        <h2 className={`${styles.heading3} gold-color font-medium`}>{name}</h2>
        <h5 className='text-white text-[1.25rem] px-0 mb-2
                      lg:text-[1.5rem]'>{title}</h5>
        <p className={`${styles.subparagraph} text-gray-200`}>{content.content1}</p>
        {content.content2 && <p className={`${styles.subparagraph} text-gray-200 mt-4`}>{content.content2}</p>}
      </div>
    </div>
  )
}

export default Founders;