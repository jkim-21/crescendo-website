import React from 'react'
import styles from '../style'
import { footerLinks } from '../data/home-page'
import { socialMedias } from '../data/global'
import logo2 from '../assets/logo2.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className='w-full mb-8 flex flex-col md:flex-row justify-center items-center'>
      <div className='flex flex-col items-center justify-center'>
      <img
        src={logo2}
        alt='logo2'
        className='w-[266px] h-[172px] object-contain'
      />
          <p className={`${styles.paragraph} mt-4 max-w-[310px]`}>
                  
          </p>
        </div>
        <div className='flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10'>
          {footerLinks.map((link) => (
            <div key={link.title} className='flex flex-col ss:my-0 my-4 min-w-[150px]'>
              <h4 className='font-poppins font-medium text-[18px] leading-[27px] text-white'>
                {link.title}
              </h4>
              <ul className='list-none mt-4'>
                {link.links.map((item, index) => (
                  <li 
                    key={item.name} 
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${index !== link.links.length - 1 ? 'mb-4' : 'mb-0'}`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]'>
        <p className='font-poppins font-normal text-center text-[18px] leading-[27px] text-white'>
          2024 Crescendo For A Cause. All Rights Reserved.
        </p>  
        <div className='flex flex-row md:mt-0 mt-6'>      
          {socialMedias.map((social, index) => (
            <a href={social.link} target="_blank" rel="noreferrer noopener">
              <FontAwesomeIcon className={`text-white w-[21px] h-[21px] object-contain cursor-pointer ${index !== social.length - 1 ? 'mr-6' : 'mr-0'}`} size="2x" key={social.id} icon={social.smIcon}/>
            </a>
          ))}
        </div>    
      </div>
    </section>
  )
}

export default Footer
