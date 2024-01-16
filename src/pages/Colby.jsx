import React from 'react'
import {Navbar} from '../components'
import{chapterData} from '../data/chapter-details'
import styles from "../style"

const Colby = () => {
    return (

        <div className='bg-primary w-full overflow-hidden'>
            <div className={` ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                        <Navbar></Navbar>
                </div>
            </div>
            <div style={{backgroundImage: `url(${chapterData[0].background})`}} className={`h-[25rem] bg-no-repeat bg-center w-full bg-cover ${styles.flexCenter}`}>
            <p className={`font-medium xs:text-[3rem] text-[2.5rem] text-white xs:leading-[76.8px] leading-[66.8px] w-full font-raleway text-center [text-shadow:2px_2px_2px_black] text-outline`}>{chapterData[0].header}</p>
            </div>
        </div>
    )
}

export default Colby;