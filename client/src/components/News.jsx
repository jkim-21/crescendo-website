import React from 'react';
import {styles} from '../style'

const News = ({ picture, title, description, link, watch}) => {
    return (
        <div className='news-card flex flex-col bg-white basis-[80%]
                        md:basis-[45%] lg:basis-[30%]'>
            <div className='relative'>
                <img
                src={picture}
                alt={`${title} news article`}
                className='dark-text object-cover [aspect-ratio:1.354/1] w-full flex-shrink-0'
                />
                <div className='absolute bottom-0 left-0 px-5 pt-3.5 min-w-[12rem] bg-white'>
                    <h4 className='dark-text text-[1.25rem] leading-[0.9] font-semibold'>
                        {title}
                    </h4>
                </div>
            </div>
            <p className={`${styles.subparagraph} px-[1.25rem] py-[2rem] flex-grow`}>
                {description}
            </p>
            <a 
            href={link} 
            target='_blank'
            rel='noopener noreferrer'
            className='black-color font-semibold text-center bg-[#e8ecfc] m-auto w-[60%] py-[1rem] mb-[1.5rem]'>
                {watch ? 'Watch' : "Read More"}
            </a>
        </div>
    )
}

export default News;