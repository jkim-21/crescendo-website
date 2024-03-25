import React from 'react'
import {AboutUs, Chapters, Footer, Hero, Navbar, Stats, DonationForm, QueryProvider, Testimonials} from './components'
import {styles} from './style'
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';

const App = () => {


  
  return (
    <div className='bg-navy-color' id='home'>
      <Navbar/>
      <div className={`bg-navy-color w-full overflow-hidden`}>
        <div className={`${styles.flexStart} ${styles.paddingX}`} id='#home'>
          <div className={`${styles.boxWidth}`}>
            <Hero/> 
          </div>
        </div>
        <div className={`background-beige-color ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
          <Stats/>
          </div>
        </div>

        <div className={`bg-navy-color ${styles.paddingX} ${styles.flexStart}`}>
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
        
        <div className={`bg-navy-color ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <AboutUs/>
          </div>
        </div>

        <div className={`background-beige-color ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Chapters/>
          </div>
        </div>
        
        <div className={`px-14 ${styles.flexStart} bg-black-gradient`}>
          <div className={`${styles.boxWidth}`}>
            <Footer/>     
          </div>
        </div>
      </div>
    </div>
  )
}

export default App