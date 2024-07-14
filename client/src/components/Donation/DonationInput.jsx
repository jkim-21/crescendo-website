import {
    CardContent,
    Typography,
    Grid,
    InputAdornment,
    OutlinedInput,
    Button,
    CircularProgress,
    Alert,
    ToggleButtonGroup,
    ToggleButton
  } from "@mui/material";
  import { styled } from '@mui/material/styles';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import { motion } from "framer-motion";
  import * as React from 'react';
  import { donationStyle } from '../../style';
  
  const DonationInput = ({
    amount,
    donationType,
    handleDonationType,
    handleAmountChange,
    handleInputSubmit,
    amountError,
    isLoading,
    slideAnimation
  }) => {
  
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
        borderColor: '#D3D3D3'
      },
    }));
  
    return (
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={slideAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='absolute w-full h-full'>
        <CardContent
          sx={{ px: '5%' }}
          className='flex flex-col h-full'>
  
          <Typography
            align='center'
            variant='h4'
            sx={{ pt: 2, pb: 3, mb: 4, fontWeight: '600' }}
            className='flex-shrink-0 dark-color border-b border-[#c7cdd6]'>
            Donate Now
          </Typography>
          <div className='text-center mb-4 flex-shrink-0'>
            <ToggleButtonGroup
              size="large"
              color="primary"
              exclusive
              onChange={handleDonationType}
              value={donationType}
              className='flex items-start'
            >
              <StyledToggleButton
                value='oneTime'
                sx={{ px: 4, height: 50 }}
                className={`${donationType === 'oneTime' ? 'z-40' : 'z-0'}`}>
                Give Once
              </StyledToggleButton>
  
              <StyledToggleButton
                value='monthly'
                sx={{ px: 3, height: 50 }}
                className={`${donationType === 'monthly' ? 'z-40' : 'z-0'}`}>
                <div>
                  <FavoriteIcon sx={{ color: "#ff447c", pr: '5px' }} />
                  Monthly
                </div>
              </StyledToggleButton>
            </ToggleButtonGroup>
          </div>
  
          <ToggleButtonGroup
            size="large"
            color="primary"
            onChange={handleAmountChange}
            value={amount}
            exclusive
            fullWidth
            sx={{ flexShrink: 0, mb: 4 }}
          >
            <Grid container
              spacing={1}
              justifyContent='center'>
              <Grid item xs={4}>
                <StyledToggleButton
                  value='10'
                  sx={{ height: 50 }}>
                  $10
                </StyledToggleButton>
              </Grid>
              <Grid item xs={4}>
                <StyledToggleButton
                  value='20'
                  sx={{ height: 50 }}>
                  $20
                </StyledToggleButton>
              </Grid>
              <Grid item xs={4}>
                <StyledToggleButton
                  value='30'
                  sx={{ height: 50 }}>
                  $30
                </StyledToggleButton>
              </Grid>
              <Grid item xs={4}>
                <StyledToggleButton
                  value='50'
                  sx={{ height: 50 }}>
                  $50
                </StyledToggleButton>
              </Grid>
              <Grid item xs={4}>
                <StyledToggleButton
                  value='100'
                  sx={{ height: 50 }}>
                  $100
                </StyledToggleButton>
              </Grid>
              <Grid item xs={4}>
                <StyledToggleButton
                  value='250'
                  sx={{ height: 50 }}>
                  $250
                </StyledToggleButton>
              </Grid>
            </Grid>
          </ToggleButtonGroup>
  
          <div className='flex-grow'>
            <Typography
              align='center'
              variant='body1'
              sx={{ mb: 1, color: '#555' }}>
              Enter custom amount here
            </Typography>
            <OutlinedInput
              type="text"
              value={amount}
              onChange={handleAmountChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              endAdornment={<InputAdornment position="end">USD</InputAdornment>}
              fullWidth
              required
              sx={{ fontWeight: 500, ...donationStyle.outlinedInputStyle, backgroundColor: "#fafafa" }}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={(event) => {
              handleInputSubmit(event);
            }}
            disabled={isLoading}
            sx={{ flexShrink: 0, minHeight: 0, ...donationStyle.buttonStyle }}>
            {isLoading ? <CircularProgress /> : 'Donate'}
          </Button>
          {amountError &&
            <Alert
              severity="error"
              sx={{ backgroundColor: "#FFD6D7" }}>
              Invalid Donation Amount
            </Alert>}
        </CardContent>
      </motion.div>
    )
  }
  
  export default DonationInput;
  