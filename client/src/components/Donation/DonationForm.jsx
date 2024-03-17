import { useState, useEffect, React } from "react";
import { Card, Fade, Container, Typography} from "@mui/material";
import useCreatePaymentIntent from "../../hooks/useCreatePaymentIntent";
import useCreateSubscription from "../../hooks/useCreateSubscription";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe } from "@stripe/stripe-js";
import DonationInput from "./DonationInput";
import DonatorInfo from "./DonatorInfo";
import StripeForm from "./StripeForm";
import { donationPic } from "../../assets";
import styles from '../../style';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const DonationForm = () => {
    const[amount, setAmount] = useState(10);
    const [paymentIntent, setPaymentIntent] = useState(false);
    const [confirmedPayment, setConfirmedPayment] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [donationType, setDonationType] = useState('oneTime');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [collectingDonatorInfo, setCollectingDonatorInfo] = useState(false);

    
    const{ mutate: paymentMutate, isLoading: paymentIsLoading, data: paymentData, error: paymentError } = useCreatePaymentIntent(amount, firstName, lastName, donorEmail);
    const { mutate: subscriptionMutate, isLoading: subscriptionIsLoading, data: subscriptionData, error: subscriptionError} = useCreateSubscription(amount, firstName, lastName, donorEmail);

    //  Donation Amount

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleInputSubmit = () => {
        if (!isNaN(amount) && amount > 0) {
            setCollectingDonatorInfo(true);
            setAmountError(false);
        }
        else {
            setAmountError(true);
        }
    };

    // Donator Information 

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
        if (donationType === 'oneTime') {
            paymentMutate(amount, firstName, lastName, donorEmail);
        }
        else {
            subscriptionMutate(amount, firstName, lastName, donorEmail);
        }
        setTimeout(() => {
            setCollectingDonatorInfo(false);
        }, 3000);
    };

    const handleInfoClear = () => {
        setCollectingDonatorInfo(false)
    }

    // Stripe Payment Platform

    const handlePaymentClear = () => {
        setCollectingDonatorInfo(true);
        setPaymentIntent(false);
    }

    const handleConfirmPayment = async (payment) => {
        setConfirmedPayment(payment);
        await setTimeout(() => {
            setConfirmedPayment(false);
            handleInfoClear();
            setPaymentIntent(false);
            setDonationType('oneTime');
            setFirstName("");
            setLastName("");
            setDonorEmail("");
            setCollectingDonatorInfo(false);

        }, 5000);
    }


    useEffect(() => {
        donationType === 'oneTime' ? setPaymentIntent(paymentData) : setPaymentIntent(subscriptionData)
    }, [paymentData, subscriptionData]);
    
    return (
        <section>
            <h1 className={`${styles.heading2} text-black text-center mb-20 ss:text-[4.5rem]`}>Get Involved</h1>
            <div className='flex gap-8'>
                <img src={donationPic} className='[flex-basis:45%] self-start max-h-[31rem] object-contain rounded'/>    
                <Card id = 'donate' className = "sm:mb-20 mb-6 [flex-basis:55%] " sx={{bgcolor: '#002e5d' }}>
                    <Fade in={!paymentIntent && !confirmedPayment && !collectingDonatorInfo} unmountOnExit timeout={{ enter: 1000, exit: 10 }}>
                        <div>
                            <DonationInput 
                            amount={amount} 
                            handleAmountChange={handleAmountChange} 
                            handleInputSubmit={handleInputSubmit}
                        amountError={amountError} 
                        isLoading={donationType === 'oneTime' ? paymentIsLoading : subscriptionIsLoading} 
                        donationType={donationType}
                        setDonationType={setDonationType}
                        />
                    </div>
                </Fade>

                <Fade in={collectingDonatorInfo && !paymentIntent} unmountOnExit timeout={{ enter: 1000, exit: 10 }}>
                    <div>
                        <DonatorInfo 
                        handleFirstNameChange={handleFirstNameChange} 
                        handleLastNameChange={handleLastNameChange} 
                        handleEmailChange={handleEmailChange} 
                        handleDonatorInfoSubmit={handleDonatorInfoSubmit}
                        firstName={firstName}
                        lastName={lastName}
                        email={donorEmail}
                        isLoading={donationType === 'oneTime' ? paymentIsLoading : subscriptionIsLoading} 
                        error={donationType === 'oneTime' ? paymentError : subscriptionError} 
                        handleInfoClear={handleInfoClear}
                        />
                    </div>
                </Fade>

                <Fade in={paymentIntent && !confirmedPayment} unmountOnExit timeout={{ enter: 1000, exit: 10 }}>
                    <Container>
                        <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent?.client_secret }}>
                            <StripeForm 
                                client_secret={paymentIntent?.client_secret} 
                                amount={paymentIntent?.amount} 
                                handlePaymentClear={handlePaymentClear} 
                                handleConfirmPayment={handleConfirmPayment}
                                donationType = {donationType} 
                            />
                        </Elements>
                    </Container>
                </Fade>
                <Fade in={!!confirmedPayment} unmountOnExit timeout={1000}>
                    <Typography p={4} variant="h6" textAlign={'center'} className='text-white'>Your generosity goes a long way!</Typography>
                </Fade>
            </Card>
        </div>
        </section>
    )
}
export default DonationForm