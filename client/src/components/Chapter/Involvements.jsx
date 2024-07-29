import React from 'react';
import { involvementLogo } from "../../assets";
import { styles } from '../../style';

const Involvements = ({ header, restOfHeader, boxColor, link }) => {
    return (
        <a 
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className={`${boxColor} flex flex-col basis-[80%] py-[3rem] px-[1rem] 
                    sm:basis-[45%] md:basis-[35%] lg:basis-[23%]`}>
                <h4 className={`${styles.heading4} flex-grow text-center text-white leading-[1.5rem] mb-[1.8rem]`}>
                    {header}
                </h4>
                <p className={`${styles.subparagraph} text-gray-100 text-center m-auto mb-[2.5rem] flex-grow`}>
                    {restOfHeader}
                </p>
                <img 
                src={involvementLogo} 
                className='m-auto w-[8rem]'/>
        </a>
    )
}

export default Involvements;