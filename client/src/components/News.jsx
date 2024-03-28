import React from 'react';
import {styles} from '../style';

const News = ({ picture, title, description, link, watch}) => {
    return (
        <div className='rounded-[5px] max-w-[370px] lg:w-[30%] md:w-[45%] sm:w-[70%] w-full mx-4 my-4 lg:mx-6 md:mx-5 sm:mx-4 news-card bg-white flex flex-col'>
            <div className='relative'>
                <img
                src={picture}
                alt='Feedback'
                className='object-contain dark-color'
                />
                <div className='absolute bottom-0 left-0 bg-white px-5 pt-4 min-w-[13rem]'>
                    <h4 className='dark-color text-[25px] font-semibold leading-[0.9]'>{title}</h4>
                </div>
            </div>
            <p className='text-[18px] bg-white px-5 py-8 flex-grow'>{description}</p>
            <a href={link} target="_blank" className='black-color py-4 font-semibold text-center bg-[#e8ecfc] w-[11rem] m-auto mb-6'>{watch ? 'Watch' : "Read More"}</a>
        </div>
    )
}

export default News;