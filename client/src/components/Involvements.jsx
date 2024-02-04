import React from 'react'
import styles from "../style"
import { involvementLogo } from "../assets"

const Involvements = ({header, restOfHeader, boxColor}) => {
    return (
        <div className={`${boxColor} [aspect-ratio:1.1_/_1] flex-1`}>
            <p className='font-medium text-[1.5rem] mt-[1.8rem] mb-[1.8rem] text-center'>{header}</p>
            <p className='text-[0.9rem] text-gray-100 max-w-[85%] text-center m-auto mb-[2.3rem]'>{restOfHeader}</p>
            <img src={involvementLogo} className='m-auto w-[8rem]'/>
        </div>

    )
}

export default Involvements