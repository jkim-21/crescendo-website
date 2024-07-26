import React from 'react';
import {styles} from '../style'

const News = ({ picture, title, description, link, watch}) => {
    return (
        <div className='news-card flex flex-col max-w-[23.125rem] w-full bg-white
                        md:w-[45%] lg:w-[30%]'>
            <div className='relative'>
                <img
                src={picture}
                alt='{title} news article'
                className='dark-color object-contain [aspect-ratio:1.354/1]'
                />
                <div className='absolute bottom-0 left-0 px-5 pt-3.5 min-w-[12rem] bg-white'>
                    <h4 className='dark-color text-[20px] leading-[0.9] font-semibold'>{title}</h4>
                </div>
            </div>
            <p className={`${styles.subparagraph} bg-white px-5 py-8 flex-grow`}>{description}</p>
            <a 
            href={link} 
            target='_blank'
            rel='noopener noreferrer'
            className='black-color py-4 font-semibold text-center bg-[#e8ecfc] w-[11rem] m-auto mb-6'>
                {watch ? 'Watch' : "Read More"}
            </a>
        </div>
    )
}

export default News;