import React from 'react'
import {styles} from "../style"
import { general, socialMedias } from '../data/global'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const Contacts = () => {
    return (
        <div className={`${styles.boxWidth} bg-navy-color m-auto`}>
            <div className={`contact-information pt-[2.5rem] pb-[2.5rem]`}>
                <p className='font-medium text-[1.3rem] mb-[1.25rem] white-color'>{general.name}</p>
                <p>{general.phoneNumber}</p>
                <p className='mb-[1.25rem]'>{general.email}</p>
                <p className='mb-[1.25rem]'>{general.location}</p>
                <div>
                {socialMedias.map((socialMedia) => (
                    <a 
                    key={socialMedia.id}
                    href={socialMedia.link} 
                    target='_blank'
                    rel='noreferrer noopener'>
                        <FontAwesomeIcon className='text-white w-[2.3rem] mr-[1rem]' size="2x" key={socialMedia.id} icon={socialMedia.smIcon}/>
                    </a>
                ))}
                </div>
            </div>
        </div>
        )}

export default Contacts