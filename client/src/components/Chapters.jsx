import React from 'react';
import { chapters } from '../data/home-page';
import {styles} from '../style';
import { Link } from "react-router-dom";

const Chapters = () => {
  return (
    <section 
    id="chapters" 
    className={`${styles.paddingY} m-auto
              lg:w-[75%] lgs:w-[60%]`}>
      <h1 className={`${styles.heading1} dark-color text-center mb-[2rem]
                    lg:mb-[4.5rem]`}>
        Chapters
      </h1>
      <div className='grid grid-cols-2 gap-x-[3rem] gap-y-[2rem]
                      md:grid-cols-[repeat(3,_1fr)] lg:gap-x-[3rem] lg:gap-y-[3rem]'>
        {chapters.map((chapter) => (
          <div 
          key={chapter.id} 
          className='text-center'>
              <Link 
              to={chapter.link} 
              className='block mb-5'>
                  <img
                    src={chapter.picture}
                    alt='chapter'
                    className='w-full object-contain rounded-[50%] [aspect-ratio:1/1]'
                  />
              </Link>
              <h4 className={`${styles.heading4} font-medium dark-color w-fit m-auto`}>
                <Link to={chapter.link}>
                  {chapter.name}
                </Link>
              </h4>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Chapters;
