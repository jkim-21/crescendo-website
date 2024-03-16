import React from 'react'
import {AboutUs, Chapters, Footer, Hero, Navbar, Stats, DonationForm, QueryProvider, Testimonials} from './components'
import styles from './style'
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';

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
          <ThemeProvider theme={theme}>
            <QueryProvider>
              <DonationForm/> 
            </QueryProvider>
          </ThemeProvider>
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