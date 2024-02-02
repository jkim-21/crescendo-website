import React from 'react'
import {AboutUs, Chapters, CTA, Footer, Hero, Navbar, Stats} from './components'

import styles from './style'

const App = () => {
  return (
    
    <div className='bg-third w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          
        </div>
      </div>
      <div className={`bg-harvardBackground ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
        <Navbar/>
          <Hero/>      
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats/>
          <AboutUs/>
          <Chapters/>
          <CTA/>
          <Footer/>     
        </div>
      </div>
    </div>
  )
}

export default App