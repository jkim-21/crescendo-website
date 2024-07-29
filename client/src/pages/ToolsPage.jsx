import React from 'react';
import { Navbar, AnimationLayout } from '../components';
import {styles} from '../style'
import '../index.css';
import SouthIcon from '@mui/icons-material/South';


const ToolsPage = () => {
    return (
        <AnimationLayout>
        <Navbar/>

        <div className={`${styles.boxWidth} ${styles.paddingY} m-auto white-color`}>
            <div className='w-[80%] m-auto'>
                <div className='flex justify-between items-center'>
                    <h2 className = {`${styles.heading2} basis-[40%]`}>
                        Hello, Crescendo for a Cause
                    </h2>
                    <h3 className={`${styles.heading4} basis-[50%]`}>
                        Welcome to your tools dashboard. Please select one of the tools to use down below.
                    </h3>
                </div>
                <SouthIcon
                sx={{fontSize: 35}}
                className='display mt-[5rem]'/>
            </div>
        </div>

        </AnimationLayout>
    )
}

export default ToolsPage;