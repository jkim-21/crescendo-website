import React from 'react'
import {styles} from "../style"
import { placeholder } from '../assets'

const Officers = ({name, title, img, content}) => {
    return (
        <div className='whitespace-nowrap max-w-[15rem]'>
            {img && <img src={img} className='w-[15rem] mb-1'/>}
            {!img && <img src={placeholder} className='w-[15rem] mb-1'/>}
            
            <h4 className='gold-color text-[2rem] font-medium'>{name}</h4>
            <h5 className='text-[1.3rem] white-color'>{title}</h5>
        </div>
    )
}

export default Officers