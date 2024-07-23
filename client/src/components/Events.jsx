import React from 'react';

const Events = ({ picture, name, title, schoolLogo, instagramUrl }) => {
  return (
    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className='feedback-card flex flex-col items-center px-5 py-4 rounded-[5px] max-w-[23.125rem] bg-[#e8ecfc] basis-[80%] sm:basis-[45%] lg:basis-[30%]'>
      <div className='w-full flex justify-center mb-4'>
        <img
          src={picture}
          alt='Feedback'
          className='object-contain dark-color rounded-lg w-full'
        />
      </div>
      <div className='flex flex-col items-center mb-2'>
        <img
          src={schoolLogo}
          alt={name}
          className='w-[60px] h-[60px] rounded-full dark-color mb-2'
        />
        <div className='text-center'>
          <h4 className='font-semibold text-[18px] leading-[110%] dark-color mb-1'>{name}</h4>
          <p className='font-normal text-[16px] leading-[24px] dark-color'>{title}</p>
        </div>
      </div>
    </a>
  );
}

export default Events;
