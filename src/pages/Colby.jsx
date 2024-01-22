import React from 'react'
import {Navbar} from '../components'
import {chapterBackground} from '../assets'
import{chapterData} from '../data/chapter-details'
import styles from "../style"

const Colby = () => {
    return (
        <div>
            <div style={{backgroundImage: `url(${chapterData[0].background})`}}
            className='bg-primary w-full overflow-hidden bg-center bg-cover'>
                <div className={`${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar pageStyles='[filter:drop-shadow(2px_2px_0px_rgb(0_0_0_/_0.9))]'/>
                    </div>
                </div>
                <div className={`h-[25rem] bg-no-repeat w-full ${styles.flexCenter}`}>
                <p className={`font-medium xs:text-[3rem] text-[2.5rem] text-white xs:leading-[76.8px] leading-[66.8px] w-full font-raleway text-center [text-shadow:2px_2px_2px_black] text-outline`}>
                {chapterData[0].header}</p>
                </div>
            </div>
            <div style={{backgroundImage: `url(${chapterBackground})`}}
            className='h-[25rem]'>
                <h3 className=''>Officers</h3>
            </div>
            
        </div>
        
    )
}

export default Colby;