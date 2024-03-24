import { Button, Box, CardContent, CircularProgress, Typography, Alert } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { PaymentElement } from "@stripe/react-stripe-js";
import useCapturePayment  from "../../hooks/useCapturePayment";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {donationStyle} from '../../style'

const StripeForm = ({ client_secret, amount, handlePaymentClear, handleConfirmPayment, slideAnimation}) => {

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
        <motion.div
        onClick = {(e) => e.stopPropagation()}
        variants={slideAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className = 'h-full w-full absolute'>
            <CardContent className='flex flex-col w-full h-full'>
                <Box sx={{display:'flex', position: 'relative', justifyContent:'center'}}>
                    <Button onClick={handlePaymentClear} sx={{position: 'absolute', top:16, left: 0, padding: 0, minWidth:0, ...donationStyle.cancelButtonStyle}}>
                        <ChevronLeftIcon fontSize='large'/>
                    </Button>
                    <Typography variant="h5" mb={3} className="black-color border-b border-[#c7cdd6] container" align='center' sx={{pt: 2, pb: 3, mb: 4}}>Thank you for your support!</Typography>
                </Box>
                <div className='flex-grow'>
                    <PaymentElement/>
                </div>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <div className='flex flex-col items-end'>
                        <Button variant="contained" onClick={handleSubmit} disabled={isLoading} sx={{mt:5, ...donationStyle.buttonStyle}}>
                            {isLoading ? <CircularProgress sx={{color:'#3874e4'}}/> : `Donate $${amount / 100}`}
                        </Button>
                        {error && <Alert severity = "error" sx={{backgroundColor: "#FFD6D7"}}>Something went wrong</Alert>}
                    </div>
                </Box>
            </CardContent>
        </motion.div>
    )
}

export default StripeForm
