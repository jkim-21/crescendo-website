import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorButton = ({errorMessage, format}) => {
    return (
        <div className={`${format} flex gap-[0.5rem] items-center justify-center py-[0.5rem] px-[1rem] rounded error-red-bg`}>
            <ErrorOutlineIcon sx={{color:'red'}}/>
            {errorMessage}
        </div>
    );
};

export default ErrorButton;