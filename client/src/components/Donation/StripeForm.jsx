import { Button, Box, CardContent, CircularProgress, Typography, Alert } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { PaymentElement } from "@stripe/react-stripe-js";
import useCapturePayment  from "../../hooks/useCapturePayment";
import useCaptureSubscription  from "../../hooks/useCaptureSubscription";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { motion } from "framer-motion";

const StripeForm = ({ client_secret, amount, handlePaymentClear, handleConfirmPayment, setInfoAnimationType }) => {

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

    const dropIn = {
        hidden: {
            x: "100vh",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 0.01,
                type: "spring",
                damping: 50,
                stiffness: 500, 
            },
        },
        exit: {
            x: "100vh",
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
            <CardContent>
                <Box my={3} sx={{display:'flex', position: 'relative', justifyContent:'center'}}>
                    <Button onClick={handlePaymentClear} sx={{position: 'absolute', left: 0, padding: 0, minWidth:0}}>
                        <ChevronLeftIcon fontSize='large'/>
                    </Button>
                    <Typography variant="h5" mb={3} className="text-white">Thank you for your support!</Typography>
                </Box>
                <PaymentElement className='donationForm'/>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <Button variant="contained" onClick={handleSubmit} disabled={isLoading} sx={{mt:5}}>
                        {isLoading ? <CircularProgress/> : `Donate $${amount / 100}`}
                    </Button>
                    {error && <Alert severity = "error" sx={{backgroundColor: "#FFD6D7"}}>Something went wrong</Alert>}
                </Box>
            </CardContent>
        </motion.div>
    )
}

export default StripeForm
