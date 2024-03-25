import React from 'react'
import {styles} from '../style'
import { footerLinks } from '../data/home-page'
import { socialMedias } from '../data/global'
import {logo} from '../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <section className={`${styles.flexCenter} py-10 px-20 flex-col`}>
      <div className='w-full flex justify-between items-center md:flex-row flex-col'>
        <p className='font-normal text-center text-[18px] leading-[27px] text-white'>
          2024 Crescendo For A Cause. All Rights Reserved.
        </p>  
        <div className='flex flex-row md:mt-0 mt-6'>      
          {socialMedias.map((social, index) => (
            <a key={social.id} href={social.link} target="_blank" rel="noreferrer noopener">
              <FontAwesomeIcon className={`text-white w-[21px] h-[21px] object-contain cursor-pointer ${index !== social.length - 1 ? 'mr-6' : 'mr-0'}`} size="2x" icon={social.smIcon}/>
            </a>
          ))}
        </div>    
      </div>
    </section>
  )
}

export default Footer
