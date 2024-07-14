import React from 'react';

const Events = ({ picture, name, title, schoolLogo, instagramUrl }) => {
  return (
    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className='feedback-card flex justify-between flex-col px-5 py-4 rounded-[5px] max-w-[23.125rem] bg-[#e8ecfc] basis-[80%] sm:basis-[45%] lg:basis-[30%]'>
      <div className='m-auto'>
        <img
          src={picture}
          alt='Feedback'
          className='object-contain dark-color rounded-lg mb-10'
        />
      </div>
      <div className='flex flex-row grow-0 min-h-[78px] ml-2'>
        <img
          src={schoolLogo}
          alt={name}
          className='max-w-[48px] max-h-[48px] min-w-[48px] min-h-[48px] rounded-full dark-color'
        />
        <div className='flex flex-col ml-5'>
          <h4 className='font-semibold text-[18px] leading-[110%] dark-color mb-2'>{name}</h4>
          <p className='font-normal text-[16px] leading-[24px] dark-color'>{title}</p>
        </div>
      </div>
    </a>
  );
}

export default Events;
