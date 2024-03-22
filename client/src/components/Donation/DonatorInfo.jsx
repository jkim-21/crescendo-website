import {CardContent, Typography, OutlinedInput, Button, Box, CircularProgress, Alert} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, React } from "react";
import { motion } from "framer-motion";



const DonatorInfo = ({handleFirstNameChange, handleLastNameChange, handleEmailChange, handleDonatorInfoSubmit, firstName, lastName, email, isLoading, error, handleInfoClear, infoAnimationType}) => {

    const dropIn = {
        hidden: {
            x: infoAnimationType === 'submit' ? "-100vh" : "100vh",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 10,
                type: "spring",
                damping: 50,
                stiffness: 750, 
            },
        },
        exit: {
            x: infoAnimationType === 'submit' ? "-100vh" : "100vh",
            opacity: 0,
        }
    }
    return (
        <motion.div
        onClick = {(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit">
            <CardContent sx={{position: 'absolute'}}>
                <form onSubmit = {handleDonatorInfoSubmit}>
                    <Box sx={{display:'flex', my:3, position: 'relative', justifyContent:'center'}}>
                        <Button 
                        onClick = {handleInfoClear}
                        sx={{position: 'absolute', left: 0, top:4, padding: 0, minWidth:0}}>
                            <ChevronLeftIcon fontSize='large'/>
                        </Button>
                        <Typography className='text-white' align='center' variant='h4' sx={{fontWeight: 'bold'}}>
                            Donator Information
                        </Typography>
                        
                    </Box>
                    <Typography className='text-white' align='center' variant='body1' sx={{mb: 5, fontWeight: 'regular'}}>
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
                            backgroundColor:'#f0f0f0',
                            borderBottomLeftRadius: 0, 
                            borderBottomRightRadius: 0
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
                            backgroundColor:'#f0f0f0',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            mb: 3
                        }}
                    />
                    
                    <OutlinedInput
                        type="email"
                        placeholder='Email Address'
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        required
                        sx={{
                            backgroundColor:'#f0f0f0',
                            mb: 5
                        }}
                    />
                    <Button fullWidth variant="contained" type="submit" disabled={isLoading}>
                        {isLoading ? <CircularProgress/> : 'Continue'}
                    </Button>
                    {error && <Alert severity = "error" sx={{width: '100%', backgroundColor: "#FFD6D7", display: 'block'}}>Something went wrong</Alert>}
                </form>
            </CardContent>
        </motion.div>
        );
    };

export default DonatorInfo;