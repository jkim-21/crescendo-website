import React from 'react'
import styles from '../style'

const Founders = ({ content, name, title, img }) => {
  return (
    <div className='md:mt-0 mt-6 flex justify-between ml-10 mb-20 items-center'>
      <div className='basis-[35%]'>
        <img src={img} alt={name} className='object-contain w-[323px]'/>
      </div>     
      <div className='text-left basis-[70%]'>
        <h2 className={'gold-color text-[2.5rem] font-poppins font-medium mb-2'}>{name}</h2>
        <h3 className='text-white text-[1.5rem] font-poppins px-0 mb-2'>{title}</h3>
        <p className={`${styles.paragraph}`}>{content.content1}</p>
        {content.content2 && <p className={`${styles.paragraph} mt-4`}>{content.content2}</p>}
      </div>
    </div>
  )
}

export default Founders
