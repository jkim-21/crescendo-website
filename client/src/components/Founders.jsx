import React from 'react'
import {styles} from '../style'

const Founders = ({ content, name, title, img }) => {
  return (
    <div className='md:mt-0 mt-6 flex justify-between ml-10 mb-16 items-center'>
      <div className='basis-[35%]'>
        <img src={img} alt={name} className='object-contain w-[323px]'/>
      </div>     
      <div className='text-left basis-[70%]'>
        <h2 className={'gold-color text-[2.5rem] font-medium mb-2'}>{name}</h2>
        <h5 className='text-white text-[1.5rem] px-0 mb-2'>{title}</h5>
        <p className={`${styles.paragraphGray}`}>{content.content1}</p>
        {content.content2 && <p className={`${styles.paragraphGray} mt-4`}>{content.content2}</p>}
      </div>
    </div>
  )
}

export default Founders
