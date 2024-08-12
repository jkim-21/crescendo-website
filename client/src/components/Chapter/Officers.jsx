import React from 'react'
import {styles} from "../../style"
import { placeholder } from '../../assets'

const Officers = ({name, title, headshot}) => {
    return (
        <div className='whitespace-nowrap flex flex-col max-w-[23.125rem] w-[60%]
                        sm:basis-[60%] md:basis-[31%] lg:basis-[22%]'>
            {headshot && 
                <img 
                src={headshot} 
                className='w-full object-cover mb-[0.25rem] flex-grow 
                          md:[aspect-ratio:1/1.3]'/>}
            {!headshot && 
                <img src={placeholder} 
                className='w-full mb-[0.25rem] flex-grow 
                          md:[aspect-ratio:1/1.3]'/>}
            
            <h4 className='gold-text text-[2rem] font-medium flex-grow-0'>{name}</h4>
<h5 className='text-[1.3rem] white-text flex-grow-0 whitespace-normal break-words'>{title}</h5>


        </div>
    )
}

export default Officers