import {React, useEffect} from 'react'
import {AboutUs, Chapters, Footer, Hero, Navbar, Impact, DonationForm, QueryProvider, Work, AnimationLayout} from './components'
import {styles} from './style'
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';

const App = () => {

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1)
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth'});
          }, 200)
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <AnimationLayout>
        <div className='bg-navy-color' id='home'>
          <Navbar/>
          <div className={`bg-navy-color w-full overflow-hidden`}>
            <div className={`${styles.flexStart}`} id='#home'>
              <div className={`${styles.boxWidth}`}>
                <Hero/> 
              </div>
            </div>
            <div className={`${styles.flexStart} bg-beige-color`}>
              <div className={`${styles.boxWidth}`}>
              <Impact/>
              </div>
            </div>
              
            <div className={`${styles.flexStart} bg-navy-color`}>
              <div className={`${styles.boxWidth}`}>
                <ThemeProvider theme={theme}>
                  <QueryProvider>
                    <DonationForm/> 
                  </QueryProvider>
                </ThemeProvider>
              </div>
            </div>

            <div className={`${styles.flexStart} bg-beige-color`}>
              <div className={`${styles.boxWidth}`}>
                <Work/>
              </div>
            </div>
            
            <div className={`${styles.flexStart} bg-navy-color`}>
              <div className={`${styles.boxWidth}`}>
                <AboutUs/>
              </div>
            </div>

            <div className={`${styles.flexStart} bg-beige-color`}>
              <div className={`${styles.boxWidth}`}>
                <Chapters/>
              </div>
            </div>
            
            <div className={`${styles.flexStart} bg-dark`}>
              <div className={`${styles.boxWidth}`}>
                <Footer/>     
              </div>
            </div>
          </div>
        </div>
    </AnimationLayout>
  )
}

export default App