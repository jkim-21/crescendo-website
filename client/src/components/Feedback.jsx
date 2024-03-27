import React from 'react';

const Feedback = ({ picture, name, title, img }) => {
  return (
    <div className='flex justify-between flex-col px-8 py-6 rounded-[5px] max-w-[370px] 
         lg:w-[30%] md:w-[45%] sm:w-[70%] w-full 
         mx-4 my-4 lg:mx-6 md:mx-5 sm:mx-4 feedback-card bg-[#e8ecfc]'>
      <div className='w-full m-auto'>
        <img
          src={picture}
          alt='Feedback'
          className='object-contain dark-color rounded-lg'
        />
      </div>
      <div className='flex flex-row grow-0 min-h-[78px] mt-10'>
        <img
          src={img}
          alt={name}
          className='max-w-[48px] max-h-[48px] min-w-[48px] min-h-[48px] rounded-full dark-color ml-5'
        />
        <div className='flex flex-col ml-8'>
          <h4 className='font-semibold text-[20px] leading-[110%] dark-color mb-2'>{name}</h4>
          <p className='font-normal text-[16px] leading-[24px] dark-color'>{title}</p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
