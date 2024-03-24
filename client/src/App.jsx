import React from 'react'
import {AboutUs, Chapters, Footer, Hero, Navbar, Stats, DonationForm, QueryProvider, Testimonials} from './components'
import {styles} from './style'
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';

const App = () => {


  
  return (
    
    <div className={`background-navy-color w-full overflow-hidden`}>
      <div className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth} h-screen flex flex-col`}>
          <Navbar/>
          <Hero/> 
        </div>
      </div>
      <div className={`background-beige-color ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
        <Stats/>
        </div>
      </div>

      <div className={`background-navy-color ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Testimonials/>
        </div>
      </div>
        
      <div className={`background-beige-color ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <ThemeProvider theme={theme}>
            <QueryProvider>
              <DonationForm/> 
            </QueryProvider>
          </ThemeProvider>
        </div>
      </div>
      
      <div className={`background-navy-color ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <AboutUs/>
        </div>
      </div>

      <div className={`background-beige-color ${styles.paddingX} ${styles.flexStart} pt-16`}>
        <div className={`${styles.boxWidth}`}>
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