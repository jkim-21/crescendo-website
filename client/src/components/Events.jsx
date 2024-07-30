import React from 'react';

const Events = ({ picture, name, title, schoolLogo, instagramUrl }) => {
  return (
    <a 
    href={instagramUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    className='feedback-card flex flex-col items-center px-5 py-4 rounded-[5px] bg-[#e8ecfc] basis-[80%]
              sm:basis-[45%] lg:basis-[30%]'>
      <div className='w-full mb-[1.5rem] flex-grow flex items-center justify-center'>
        <img
          src={picture}
          alt='Events'
          className='object-cover dark-text rounded-lg w-full [aspect-ratio:1/0.65] '
        />     
      </div>
      <div className='flex flex-col items-center mb-[0.5rem]'>
        <img
          src={schoolLogo}
          alt={name}
          className='w-[3rem] h-[3rem] rounded-full dark-text mb-[0.5rem]
                    lg:w-[55px] lg:h-[55px]'
        />
        <div className='text-center'>
          <h4 className='font-semibold text-[18px] leading-[110%] dark-text mb-[0.25rem]'>
            {name}
          </h4>
          <p className='font-normal text-[16px] leading-[24px] dark-text'>
            {title}
          </p>
        </div>
      </div>
    </a>
  );
}

export default Events;
