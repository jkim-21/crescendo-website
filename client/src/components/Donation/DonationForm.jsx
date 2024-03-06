import { useState, useEffect } from "react";
import { Card, Fade, Container, Typography} from "@mui/material";
import useCreatePaymentIntent from "../../hooks/useCreatePaymentIntent";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe } from "@stripe/stripe-js";
import DonationInput from "./DonationInput";
import DonatorInfo from "./DonatorInfo";
import StripeForm from "./StripeForm";
import styles from "../../style.js"
import { donationPlaceholder } from "../../assets";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const DonationForm = () => {


    const[amount, setAmount] = useState(10);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [confirmedPayment, setConfirmedPayment] = useState(null);
    const{ mutate, isLoading, data, error } = useCreatePaymentIntent();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [collectingDonatorInfo, setCollectingDonatorInfo] = useState(false);
    
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleInputSubmit = () => {
        setCollectingDonatorInfo(true);
        };
    
    //

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setDonorEmail(e.target.value);
    }

    const handleDonatorInfoSubmit = (e) => {
        e.preventDefault();
        mutate(amount, firstName, lastName, donorEmail);
        setTimeout(() => {
            setCollectingDonatorInfo(false);
        }, 5000);
    };

    //

    const handleClear = () => {
        setPaymentIntent(null);
    }

    const handleConfirmPayment = async (payment) => {
        setConfirmedPayment(payment);
        handleClear();
        await setTimeout(() => {
            setConfirmedPayment(null);
        }, 5000);
    }
    
    useEffect(() => {
        if (data) setPaymentIntent(data);
    }, [data]);

    return (
        <div className='flex gap-8'>
            <img src={donationPlaceholder} className='[flex-basis:45%] self-start mt-11'/>    
            <Card id = 'donate' className = "sm:mb-20 mb-6 [flex-basis:55%]" sx={{bgcolor: '#002e5d' }}>
                <Fade in={!isLoading && !paymentIntent && !confirmedPayment && !collectingDonatorInfo} unmountOnExit>
                    <Container>
                        <DonationInput amount={amount} handleAmountChange={handleAmountChange} handleInputSubmit={handleInputSubmit} isLoading={isLoading} data={data} error={error} />
                    </Container>
                </Fade>

                <Fade in={!paymentIntent && collectingDonatorInfo && !confirmedPayment} unmountOnExit>
                    <Container>
                        <DonatorInfo 
                        handleFirstNameChange={handleFirstNameChange} 
                        handleLastNameChange={handleLastNameChange} 
                        handleEmailChange={handleEmailChange} 
                        handleInfoSubmit={handleDonatorInfoSubmit}
                        firstName={firstName}
                        lastName={lastName}
                        email={donorEmail}
                        isLoading={isLoading} 
                        error={error}
                        />
                    </Container>
                    
                </Fade>

                <Fade in={!!paymentIntent && !confirmedPayment} unmountOnExit>
                    <Container>
                        <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent?.client_secret }}>
                            <StripeForm client_secret={paymentIntent?.client_secret} amount={paymentIntent?.amount} handleClear={handleClear} handleConfirmPayment={handleConfirmPayment} />
                        </Elements>
                    </Container>
                </Fade>
                <Fade in={!!confirmedPayment} unmountOnExit>
                    <Typography p={4} variant="h6" textAlign={'center'} className='text-white'>Your generosity goes a long way!</Typography>
                </Fade>
            </Card>
        </div>
    )
}
export default DonationForm