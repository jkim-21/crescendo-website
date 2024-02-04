import React from 'react'
import {AboutUs, Chapters, Donation, Footer, Hero, Navbar, Stats} from './components'
import styles from './style'

const App = () => {
  return (
    
    <div className='background-navy-color w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/> 
        </div>
      </div>
      <div className={`${styles.flexStart} ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats/>
          <Donation/>
          <AboutUs/>
          <Chapters/>
        </div>
      </div>
      <div className={`${styles.paddingX} ${styles.flexStart} background-navy-color`}>
        <div className={`${styles.boxWidth}`}>
          <Footer/>     
        </div>
      </div>
    </div>
  )
}

export default App