import React from 'react';

const Feedback = ({ picture, name, title, img }) => {
  return (
    // Adjusted width and margin for responsiveness
    <div className='flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] 
         lg:w-[30%] md:w-[45%] sm:w-[70%] w-full 
         mx-4 my-4 lg:mx-6 md:mx-5 sm:mx-4 feedback-card border border-gray-300/50'>
      <img
        src={picture}
        alt='Feedback'
        className='w-full h-auto object-contain'
      />
      <div className='flex flex-row mt-4'>
        <img
          src={img}
          alt={name}
          className='w-[48px] h-[48px] rounded-full'
        />
        <div className='flex flex-col ml-4'>
          <h4 className='font-poppins font-semibold text-[20px] leading-[32px] text-white'>{name}</h4>
          <p className='font-poppins font-normal text-[16px] leading-[24px] text-white'>{title}</p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
