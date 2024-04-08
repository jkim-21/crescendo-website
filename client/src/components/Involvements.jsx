import React from 'react'
import { involvementLogo } from "../assets"
import { styles } from '../style'

const Involvements = ({header, restOfHeader, boxColor, link}) => {
    return (
        <div className={`${boxColor} py-[3rem] px-[1rem] flex flex-col basis-[80%] 
                        sm:[aspect-ratio:1/1] sm:basis-[45%] md:basis-[35%] lg:basis-[23%] lg:[aspect-ratio:1/1.232]`}>
            <h4 className={`${styles.heading4} mb-[1.8rem] text-center text-white leading-[1.5rem]`}>{header}</h4>
            <p className={`${styles.subparagraph} text-gray-100 text-center m-auto mb-[2.5rem] flex-grow`}>{restOfHeader}</p>
            <a 
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            >
                <img src={involvementLogo} className='m-auto w-[8rem] flex-grow-0'/>
            </a>
        </div>
    )
}

export default Involvements