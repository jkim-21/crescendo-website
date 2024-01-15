import React from 'react'
import {Navbar} from '../components'
import{chapterInformation} from '../data/chapter-details'
import styles from "../style"
import { Link } from "react-router-dom";

const Colby = () => {
    return (
        <div>
            <div className='bg-primary w-full overflow-hidden'>
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                            <Navbar></Navbar>
                    </div>
                </div>
            </div>
            <img src={chapterInformation[0].background} className='object-fill w-full'/>
        </div>
    )
}

export default Colby;