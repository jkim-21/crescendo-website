import React from 'react';
import { chapters } from '../data/home-page-info';
import styles from '../style';
import { Link } from "react-router-dom";

const Chapters = () => {
  return (
    <section id="chapters">
      <h1 className={`${styles.heading2} text-center mb-10 ss:text-[4.5rem]`}>Chapters</h1>
      <div className='w-full grid grid-cols-[repeat(3,_1fr)] gap-x-24 gap-y-20'>
        {chapters.map((chapter) => (
          <div key={chapter.id} className='text-center'>
          
              <Link to={chapter.link} className='block mb-8'>
                  <img
                    src={chapter.img}
                    alt='chapter'
                    className='sm:w-full w-[100px] object-contain rounded-[50%]'
                  />
              </Link>
               
              <h3 className={`text-[2rem] text-white w-fit m-auto`}>
                <Link to={chapter.link} className='block'>
                  {chapter.name}
                </Link>
              </h3>
              
          </div>
        ))}
      </div>
    </section>
  )
}

export default Chapters;
