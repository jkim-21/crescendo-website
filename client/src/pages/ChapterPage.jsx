import React from 'react'
import { chapterBackground } from '../assets'
import {colby, harvard, northwestern, stevenson, ucsb, uiuc} from '../data/chapter-details'
import { Involvements, Officers, Contacts, Navbar} from '../components'
import {styles} from "../style"
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const chapters = {
    colby, harvard, northwestern, stevenson, ucsb, uiuc
}

const chapterPage = () => {
    let {chapterName} = useParams();
    const chapterData = chapters[chapterName];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div style={{backgroundImage: `url(${chapterData.background})`}}
            className='w-full overflow-hidden bg-center bg-cover'>
                <div className={`${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth} sm:px-16 px-6`}>
                        <Navbar pageStyles='[filter:drop-shadow(2px_2px_0px_rgb(0_0_0_/_0.9))]'/>
                    </div>
                </div>
                <div className={`h-[25rem] bg-no-repeat w-full ${styles.flexCenter}`}>
                    <h1 className={`font-medium xs:text-[3rem] text-[2.5rem] xs:leading-[76.8px] leading-[66.8px] w-full font-raleway text-center [text-shadow:2px_2px_2px_black] text-outline text-white`}>
                    {chapterData.header}</h1>
                </div>
            </div>

            <div style={{backgroundImage: `url(${chapterBackground})`}} className={`${styles.flexCenter} py-10`}>

                <div className={`${styles.chaptersWidth}`}>
                    <p className={`${styles.paragraphWhite} mb-5`}>{chapterData.aboutInformation}</p>
                    {chapterData.aboutInformation2 && <p className={`${styles.paragraphWhite} mb-5`}>{chapterData.aboutInformation2}</p>}
                    <p className={`${styles.paragraphWhite} mb-10`}>You can contact us at {chapterData.emailAddress}</p>

                    <h2 className='gold-color text-[2.5rem] font-bold text-center mb-5'>Get Involved</h2>
                    <div className='flex w-full gap-[1rem] mb-10'>
                        {chapterData.involvements.map((involvement, index) => (
                            <Involvements key={involvement.id} {...involvement} boxColor = {index % 2 === 0 ? 'bg-navy-color' : 'bg-gold-color'} />
                        ))}
                    </div>

                    <h4 className='gold-color text-[2.5rem] font-medium text-center mb-5'>Officers</h4>
                    <div className={`${styles.flexCenter} gap-x-[7rem] gap-y-[4rem] flex-wrap`}>
                        {chapterData.officers.map((officer) => (
                            <Officers key={officer.id} {...officer}/>
                        ))}
                    </div>
                </div>
            </div>
            <Contacts />
        </div>
        
    )
}

export default chapterPage;