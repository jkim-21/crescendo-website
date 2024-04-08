import React from 'react'
import {styles} from '../style'
import { socialMedias } from '../data/global'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
      <section className='w-full flex justify-between items-center flex-col py-[2.5rem]
                      md:flex-row lg:py-[2.5rem]'>
        <p className={`${styles.paragraph} font-normal text-center text-white`}>
          2024 Crescendo For A Cause. All Rights Reserved.
        </p>  
        <div className='flex flex-row mt-6
                        md:mt-0'>      
          {socialMedias.map((social, index) => (
            <a 
            key={social.id} 
            href={social.link} 
            target='_blank' 
            rel='noreferrer noopener'>
              <FontAwesomeIcon className={`text-white w-[21px] h-[21px] object-contain cursor-pointer ${index !== social.length - 1 ? 'mr-6' : 'mr-0'}`} size="2x" icon={social.smIcon}/>
            </a>
          ))}
        </div>    
    </section>
  )
}

export default Footer
