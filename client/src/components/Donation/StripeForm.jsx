import { Button, Box, CardContent, CircularProgress, Typography, Alert } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { PaymentElement } from "@stripe/react-stripe-js";
import useCapturePayment  from "../../hooks/useCapturePayment";
import useCaptureSubscription  from "../../hooks/useCaptureSubscription";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";

const StripeForm = ({ client_secret, amount, handlePaymentClear, handleConfirmPayment, donationType }) => {

    const stripe = useStripe();
    const elements = useElements();



    
   const {mutate, isLoading, data, error} =  useCapturePayment(elements, stripe, client_secret);

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate();
    };

    useEffect(() => {
        if (data) handleConfirmPayment(data);
    }, [data]);


    return (
        <CardContent>
            <Box my={3} sx={{display:'flex', position: 'relative', justifyContent:'center'}}>
                <Button onClick={handlePaymentClear} sx={{position: 'absolute', left: 0, padding: 0, minWidth:0}}>
                    <ChevronLeftIcon fontSize='large'/>
                </Button>
                <Typography variant="h5" mb={3} className="text-white">Thank you for your support!</Typography>
            </Box>
            <PaymentElement/>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                <Button variant="contained" onClick={handleSubmit} disabled={isLoading} sx={{mt:5}}>
                    {isLoading ? <CircularProgress/> : `Donate $${amount / 100}`}
                </Button>
                {error && <Alert severity = "error" sx={{backgroundColor: "#FFD6D7"}}>Something went wrong</Alert>}
            </Box>

        </CardContent>
    )
}

export default StripeForm
