import {CardContent, Typography, Grid, InputAdornment, OutlinedInput, Button, CircularProgress, Alert, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as React from 'react';

const DonationInput = ({ amount, handleAmountChange, handleInputSubmit, isLoading, error }) => {
    const [donationType, setDonationType] = React.useState('oneTime');
    const [donationAmount, setDonationAmount] = React.useState('10');

    const handleDonationType = (event, newDonationType) => {
        if (newDonationType !== null) {
            setDonationType(newDonationType);
        }
    };

    const handleDonationAmount = (event, newDonationAmount) => {
        if (newDonationAmount !== null) {
            setDonationAmount(newDonationAmount);
            handleAmountChange({target: {value: newDonationAmount}});
        }
    };

    const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({  
        "&&": {
            color: '#00000',
            backgroundColor: "#f0f0f0",
            borderColor: '#D3D3D3'
        },   
        "&.Mui-selected": {
         color: '#f0f0f0',
         backgroundColor: "rgb(51, 187, 207)",
         borderColor: '#bef3f5',
          "&:hover": {
           color: '#f0f0f0',
           backgroundColor: "rgb(51, 187, 207)",
           borderColor: '#bef3f5',
          },
        },
        "&:hover": {
         color: "#f0f0f0",
         backgroundColor: "rgb(211, 211, 211)",
         borderColor:'#D3D3D3'
       },
      }));
    
    return ( 
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className='text-white' align='center' variant='h4' sx={{my: 3, fontWeight: 'bold'}}>
                        Donate Now
                    </Typography>
                    <div className='text-center mb-4'>
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
                                    <FavoriteBorderIcon/>
                                    Monthly
                                </StyledToggleButton>
                            </div>
                        </ToggleButtonGroup>
                    </div>
                </Grid>
                
                <Grid item xs={12} >
                    <ToggleButtonGroup size="large" color="primary"
                    onChange = {handleDonationAmount}
                    value = {donationAmount}
                    exclusive
                    fullWidth
                    sx={{mb: 1}}
                    >
                        <Grid container spacing={1} >
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
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} >
                            <OutlinedInput 
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                startAdornment={<InputAdornment position = "start">$</InputAdornment>}
                                endAdornment={<InputAdornment position = "end">USD</InputAdornment>}
                                fullWidth
                                required
                                sx={{
                                    backgroundColor:'#f0f0f0'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" type="submit" onClick={handleInputSubmit} disabled={isLoading}>
                                {isLoading ? <CircularProgress/> : 'Donate'}
                            </Button>
                            {error && <Alert severity = "error" sx={{backgroundColor: "#FFD6D7"}}>Something went wrong</Alert>}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>  
    )
}

export default DonationInput