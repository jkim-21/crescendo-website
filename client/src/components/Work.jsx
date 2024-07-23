import React from 'react';
import { styles } from '../style';
import { Events, News } from '.';
import { events, news } from '../data/home-page';

const Work = () => {
  return (
    <section 
      id='events' 
      className={`${styles.paddingY} relative flex-col m-auto
                lg:w-[80%]`}>
      <div className='flex flex-col justify-center items-center mb-[2rem] relative text-center
                      lg:mb-[2.5rem]'>
        <h2 className={`${styles.heading2} text-center mb-[0.5rem]`}>
          Recent Events
        </h2>
        <p className={`${styles.paragraph} dark-color w-full lg:mt-0`}>
        </p>  
      </div>
      <div className='flex flex-wrap justify-center items-stretch gap-[2rem] mb-[4rem]'>
        {events.map((event) => (
          <Events key={event.id} {...event}/>        
        ))}
      </div>
      <h2 className={`${styles.heading2} text-center mb-[2rem] 
                    lg:mb-[4rem]`}>
        In The News
      </h2> 
      <div className='flex flex-wrap justify-center w-full items-stretch gap-[2rem]'>
        {news.map((newsArticle) => (
          <News key={newsArticle.id} {...newsArticle}/>
        ))}
      </div>
    </section>
  );
}

export default Work;
