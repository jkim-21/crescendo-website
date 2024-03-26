import React from 'react';
import { chapters } from '../data/home-page';
import {styles} from '../style';
import { Link } from "react-router-dom";

const Chapters = () => {
  return (
    <section id="chapters" className='py-28'>
      <h1 className={`${styles.heading2} dark-color text-center mb-20 ss:text-[4.5rem]`}>Chapters</h1>
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
               
              <h5 className={`text-[1.9rem] dark-color w-fit m-auto`}>
                <Link to={chapter.link} className='block'>
                  {chapter.name}
                </Link>
              </h5>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Chapters;
