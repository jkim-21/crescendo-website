import {CardContent, Typography, OutlinedInput, Button, Box, CircularProgress, Alert, Card} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, React } from "react";
import { motion } from "framer-motion";
import {donationStyle} from '../../style'

const DonatorInfo = ({handleFirstNameChange, handleLastNameChange, handleEmailChange, handleDonatorInfoSubmit, firstName, lastName, email, isLoading, error, handleInfoClear, slideAnimation}) => {

    return (
        <motion.div
        onClick = {(e) => e.stopPropagation()}
        variants={slideAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='w-full h-full absolute'>
            <CardContent className='w-full h-full'>
                <form onSubmit = {handleDonatorInfoSubmit} className='h-full flex flex-col'>
                    <Box sx={{display:'flex', position: 'relative', justifyContent:'center'}}>
                        <Button 
                        onClick = {handleInfoClear}
                        sx={{position: 'absolute', left: 0, top:21, padding: 0, minWidth:0, ...donationStyle.cancelButtonStyle}}>
                            <ChevronLeftIcon fontSize='large'/>
                        </Button>
                        <Typography className='black-color border-b border-[#c7cdd6] container' align='center' variant='h4' sx={{pt: 2, pb: 3, mb: 4, fontWeight: 'bold'}}>
                            Donator Information
                        </Typography>
                    </Box>
                    <Typography className='black-color' align='center' variant='body1' sx={{mb: 5, fontWeight: 'regular'}}>
                            Please provide your details to continue with your donation.
                        </Typography>
                    
                    <OutlinedInput
                        type="text"
                        placeholder='First Name'
                        value={firstName}
                        onChange= {handleFirstNameChange}
                        fullWidth
                        required
                        sx={{
                            borderBottomLeftRadius: 0, 
                            borderBottomRightRadius: 0,
                            ...donationStyle.outlinedInputStyle
                        }}
                    />
                    <OutlinedInput
                        type="text"
                        placeholder='Last Name'
                        value={lastName}
                        onChange= {handleLastNameChange}
                        fullWidth
                        required
                        sx={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            mb: 3,
                            ...donationStyle.outlinedInputStyle
                        }}
                    />
                    <div className='flex-grow'>
                        <OutlinedInput
                        type="email"
                        placeholder='Email Address'
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        required
                        sx={{
                            flexGrow: 1,
                            ...donationStyle.outlinedInputStyle
                        }}/>
                    </div>
                    
                    <Button fullWidth variant="contained" type="submit" disabled={isLoading} className='py-4' sx={{...donationStyle.buttonStyle}}>
                        {isLoading ? <CircularProgress sx={{color:'#3874e4'}}/> : 'Continue'}
                    </Button>
                    {error && <Alert severity = "error" sx={{width: '100%', backgroundColor: "#FFD6D7", flexShrink: 0}}>Something went wrong</Alert>}
                </form>
            </CardContent>
        </motion.div>
        );
    };

export default DonatorInfo;