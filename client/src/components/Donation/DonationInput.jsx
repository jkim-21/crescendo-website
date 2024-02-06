import {CardContent, Typography, Grid, InputAdornment, OutlinedInput, Button, CircularProgress } from "@mui/material";

const DonationInput = ({ amount, handleChange, handleSubmit, isLoading, error }) => {
    return (
        <CardContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography className = 'text-black'>
                    Donation?
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OutlinedInput 
                            type="text"
                            value={amount}
                            onChange={handleChange}
                            startAdornment={<InputAdornment position = "start">$</InputAdornment>}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" type="submit" onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? <CircularProgress/> : 'Donate'}
                        </Button>
                        {error && <Typography variant = "alert">Something went wrong</Typography>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </CardContent>  
    )
}

export default DonationInput