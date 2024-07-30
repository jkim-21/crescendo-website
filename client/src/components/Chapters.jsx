// chapters.jsx
import React from 'react';
import { chapters } from '../data/home-page';
import { styles } from '../style';
import { Link } from "react-router-dom";

const Chapters = () => {
  return (
    <section 
      id="chapters" 
      className={`${styles.paddingY} m-auto 
                lg:w-[75%] lgs:w-[60%]`}>
      <h1 className={`${styles.heading1} dark-text text-center mb-[2rem] lg:mb-[4.5rem]`}>
        Chapters
      </h1>
      <div className='grid grid-cols-2 gap-x-[3rem] gap-y-[2rem] grid-centered
                      md:grid-cols-[repeat(3,_1fr)] lg:gap-x-[3rem] lg:gap-y-[3rem]'>
        {chapters.map((chapter) => (
          <Link key={chapter.id} to={chapter.link} className='block text-center'>
            <div className='mb-5'>
              <img
                src={chapter.picture}
                alt='chapter'
                className='w-full object-contain rounded-[50%] [aspect-ratio:1/1]'
              />
            </div>
            <h4 className={`${styles.heading4} font-medium dark-text w-fit m-auto`}>
              {chapter.name}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Chapters;