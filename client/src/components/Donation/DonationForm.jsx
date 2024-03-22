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
import { motion, AnimatePresence } from "framer-motion";
import { set } from "mongoose";



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const DonationForm = () => {
    const[amount, setAmount] = useState("10");
    const [amountError, setAmountError] = useState(false);
    const [donationType, setDonationType] = useState('oneTime');
    const [donationInputOpen, setDonationInputOpen] = useState(true);
    const closeDonationInput = () => setDonationInputOpen(false);
    const openDonationInput = () => setDonationInputOpen(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [paymentIntent, setPaymentIntent] = useState(false);

    
    const[infoAnimationType, setInfoAnimationType] = useState('');
    const [donationInfoOpen, setDonationInfoOpen] = useState(false);
    const closeDonationInfo = () => setDonationInfoOpen(false);
    const openDonationInfo = () => setDonationInfoOpen(true);
    
    const [confirmedPayment, setConfirmedPayment] = useState(false);
    const [stripePaymentOpen, setStripePaymentOpen] = useState(false);
    const closeStripePayment = () => setStripePaymentOpen(false);
    const openStripePayment = () => setStripePaymentOpen(true);

    
    const{ mutate: paymentMutate, isLoading: paymentIsLoading, data: paymentData, error: paymentError } = useCreatePaymentIntent(amount, firstName, lastName, donorEmail);
    const { mutate: subscriptionMutate, isLoading: subscriptionIsLoading, data: subscriptionData, error: subscriptionError} = useCreateSubscription(amount, firstName, lastName, donorEmail);

    //  Donation Amount

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleInputSubmit = () => {
        if (!isNaN(amount) && amount > 0) {
            setAmountError(false);
            closeDonationInput();
            openDonationInfo();
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

    const handleInfoClear = async () => {
        await setInfoAnimationType("cancel");
        closeDonationInfo();
        openDonationInput();
    }

    const handleDonatorInfoSubmit = async (e) => {
        e.preventDefault();
        await setInfoAnimationType("submit");
        if (donationType === 'oneTime') {
            paymentMutate(amount, firstName, lastName, donorEmail);
        }
        else {
            subscriptionMutate(amount, firstName, lastName, donorEmail);
        }
    };

    useEffect(() => {
        donationType === 'oneTime' ? setPaymentIntent(paymentData) : setPaymentIntent(subscriptionData)
    }, [paymentData, subscriptionData]);

    useEffect(() => {
        if (!paymentError && !subscriptionError && paymentIntent) {
            closeDonationInfo();
            openStripePayment();
        }
    }, [paymentError, subscriptionError, paymentIntent]);

    // Stripe Payment Platform

    const handlePaymentClear = async () => {
        await setInfoAnimationType("submit");
        setPaymentIntent(false);
        closeStripePayment();
        openDonationInfo();
    }

    const handleConfirmPayment = async (payment) => {
        setConfirmedPayment(payment);
    }

    useEffect(() => {
        if (confirmedPayment) {
            closeStripePayment();

            setTimeout(() => {
                openDonationInput();
                setConfirmedPayment(false);
                setPaymentIntent(false);
                setDonationType('oneTime');
                setFirstName("");
                setLastName("");
                setDonorEmail("");
            }, 5000);
        }
    }, [confirmedPayment]);


    return (
        <section id = 'donate' className= 'pt-16'>
            <h1 className={`${styles.heading2} text-black text-center pb-20 ss:text-[4.5rem]`}>Get Involved</h1>
            <div className='flex gap-8'>
                <img src={donationPic} className='[flex-basis:45%] self-start max-h-[31rem] object-contain rounded'/>    
                <Card className = "sm:mb-20 mb-6 [flex-basis:55%]" sx={{bgcolor: '#002e5d', height: 550, position: 'relative'}}>
                    <AnimatePresence
                    initial={false}
                    mode='wait'
                    onExitComplete={() => null}
                    >
                        {donationInputOpen && <DonationInput 
                            amount={amount} 
                            handleAmountChange={handleAmountChange} 
                            handleInputSubmit={handleInputSubmit}
                            amountError={amountError} 
                            isLoading={donationType === 'oneTime' ? paymentIsLoading : subscriptionIsLoading} 
                            donationType={donationType}
                            setDonationType={setDonationType}
                        />}
                    </AnimatePresence>
                    
                    <AnimatePresence
                    initial={false}
                    mode='wait'
                    onExitComplete={() => null}
                    >
                        {donationInfoOpen && <DonatorInfo 
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
                            infoAnimationType={infoAnimationType}
                            setInfoAnimationType={setInfoAnimationType}
                        />}
                    </AnimatePresence>

                    <AnimatePresence
                    initial={false}
                    mode='wait'
                    onExitComplete={() => null}
                    >
                        {stripePaymentOpen && <Elements 
                            stripe={stripePromise} 
                            options={{ clientSecret: paymentIntent?.client_secret }}>
                                <StripeForm 
                                    client_secret={paymentIntent?.client_secret} 
                                    amount={paymentIntent?.amount} 
                                    handlePaymentClear={handlePaymentClear} 
                                    handleConfirmPayment={handleConfirmPayment}
                                    setInfoAnimationType={setInfoAnimationType}
                                />
                            </Elements>}
                    </AnimatePresence>
                    <Fade in={confirmedPayment} unmountOnExit timeout={1000}>
                        <Typography p={4} variant="h6" textAlign={'center'} className='text-white'>Your generosity goes a long way!</Typography>
                    </Fade>
            </Card>
        </div>
        </section>
    )
}
export default DonationForm