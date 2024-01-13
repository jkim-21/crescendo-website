import React from 'react'
import { chapters } from '../constants'
import styles from '../style'

const Chapters = () => {
  return (
    <section id="chapters">
      <h1 className={`${styles.heading2} text-center mb-10 ss:text-[4.5rem]`}>Chapters</h1>
      <div className={`w-full grid grid-cols-[repeat(3,_1fr)] gap-x-24 gap-y-20 items-top`}>
        {chapters.map((chapter) => (
          <div key={chapter.id} className={`text-center`}>
            <img
              src={chapter.img}
              alt='chapter'
              className='sm:w-full w-[100px] object-contain rounded-[50%] display-block mb-8'
            />
            <h3 className={`text-[2rem] text-white w-full`}>{chapter.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Chapters;
