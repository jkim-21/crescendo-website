import {CardContent, Typography, Grid, InputAdornment, OutlinedInput, Button, CircularProgress, Alert, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from "framer-motion";
import * as React from 'react';
import {donationStyle} from '../../style'

const DonationInput = ({ amount, donationType, setDonationType, handleAmountChange, handleInputSubmit, amountError, isLoading, slideAnimation}) => {
    const [donationAmount, setDonationAmount] = React.useState('10');

    const handleDonationType = (event, newDonationType) => {
        if (newDonationType !== null) {
            setDonationType(newDonationType);
        }
    };

    const handleDonationAmount = (event, newDonationAmount) => {
        if (newDonationAmount !== null) {
            setDonationAmount(newDonationAmount);
            handleAmountChange(event);
        }
    };

    React.useEffect(() => {
        const numericAmount = Number(amount);
        const validAmounts = [10, 20, 30, 50, 100, 250];
        if (validAmounts.includes(numericAmount)) {
            setDonationAmount(String(numericAmount));
        }
        else {
            setDonationAmount('');
        }
    }, [amount]);

    const StyledToggleButton = styled(ToggleButton)(() => ({  
        "&&": {
            color: '#222832',
            backgroundColor: "#fafafa",
            borderColor: '#c9cfd7',
            fontWeight: '400',
        },   
        "&.Mui-selected": {
         color: '#222832',
         backgroundColor: "#ebf1fc",
         borderColor: '#3272e6',
         fontWeight: '500',
          "&:hover": {
           color: '#222832',
           backgroundColor: "#ebf1fc",
           borderColor: '#3272e6',
           fontWeight: '500',
          },
        },
        "&:hover": {
         color: "#222832",
         backgroundColor: "#f5f5f5",
         borderColor:'#D3D3D3'
       },
      }));
    
    return ( 
        <motion.div
        onClick = {(e) => e.stopPropagation()}
        variants={slideAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='w-full h-full absolute'>
            <CardContent className='w-full h-full flex flex-col'>
                <Typography className='dark-color border-b border-[#c7cdd6] flex-shrink-0' align='center' variant='h4' sx={{pt: 2, pb: 3, mb: 4, fontWeight: 'bold'}}>
                    Donate Now
                </Typography>
                <div className='text-center mb-4 flex-shrink-0'>
                    <ToggleButtonGroup 
                        size="large" 
                        color="primary"
                        exclusive
                        onChange = {handleDonationType}
                        value = {donationType}
                        >
                        <div>
                            <StyledToggleButton sx={{px: 5, mr: 3}} value='oneTime'>
                                Give Once
                            </StyledToggleButton>
                            
                            <StyledToggleButton sx={{px: 5}} value='monthly'>
                                <FavoriteIcon sx={{color: "#ff447c", pr:'5px'}}/>
                                Monthly
                            </StyledToggleButton>
                        </div>
                    </ToggleButtonGroup>
                </div>
                
                <ToggleButtonGroup size="large" color="primary"
                onChange = {handleDonationAmount}
                value = {donationAmount}
                exclusive
                fullWidth
                sx={{mb: 4, flexShrink: 0}}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <StyledToggleButton value='10'>
                                $10
                            </StyledToggleButton>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledToggleButton value='20'>
                                $20
                            </StyledToggleButton>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledToggleButton value='30'>
                                $30
                            </StyledToggleButton>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledToggleButton value='50'>
                                $50
                            </StyledToggleButton>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledToggleButton value='100'>
                                $100
                            </StyledToggleButton>
                        </Grid>
                        <Grid item xs={4}>
                            <StyledToggleButton value='250'>
                                $250
                            </StyledToggleButton>
                        </Grid>
                    </Grid>
                </ToggleButtonGroup>

                <div className='flex-grow'>
                    <OutlinedInput
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        startAdornment={<InputAdornment position = "start">$</InputAdornment>}
                        endAdornment={<InputAdornment position = "end">USD</InputAdornment>}
                        fullWidth
                        required
                        sx={{fontWeight: 500, ...donationStyle.outlinedInputStyle}}
                    />
                </div>
                <Button 
                fullWidth 
                variant="contained" 
                type="submit" 
                onClick = {(event) => {
                    handleInputSubmit(event);
                }}
                disabled={isLoading}
                sx={{flexShrink: 0, minHeight: 0, ...donationStyle.buttonStyle}}>
                    {isLoading ? <CircularProgress/> : 'Donate'}
                </Button>
                {amountError && <Alert severity = "error" sx={{backgroundColor: "#FFD6D7"}}>Invalid Donation Amount</Alert>}
            </CardContent>
        </motion.div>
    )
}

export default DonationInput