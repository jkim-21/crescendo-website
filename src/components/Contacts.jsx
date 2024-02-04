import React from 'react'
import styles from "../style"
import { general, socialMedias } from '../data/global'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const Contacts = () => {
    return (
        <div className={`background-navy-color ${styles.flexCenter}]`}>
            <div className={`contact-information w-[1100px] pt-10 pb-10`}>
                <p className='font-medium text-[1.3rem] mb-5'>{general.name}</p>
                <p>{general.phoneNumber}</p>
                <p className='mb-5'>{general.email}</p>
                <p className='mb-5'>{general.location}</p>
                <div>
                {socialMedias.map((socialMedia) => (
                    <a href={socialMedia.link} target="_blank" rel="noreferrer noopener">
                        <FontAwesomeIcon className='text-white w-[2.3rem] mr-[1rem]' size="2x" key={socialMedia.id} icon={socialMedia.smIcon}/>
                    </a>
                ))}
                </div>
            </div>
        </div>
        )}

export default Contacts