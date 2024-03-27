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
import {styles} from '../../style';
import { motion, AnimatePresence } from "framer-motion";



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

    const [closingOpen, setClosingOpen] = useState(false);
    const closeClosing = () => setClosingOpen(false);
    const openClosing = () => setClosingOpen(true);

    
    const{ mutate: paymentMutate, isLoading: paymentIsLoading, data: paymentData, error: paymentError } = useCreatePaymentIntent(amount, firstName, lastName, donorEmail);
    const { mutate: subscriptionMutate, isLoading: subscriptionIsLoading, data: subscriptionData, error: subscriptionError} = useCreateSubscription(amount, firstName, lastName, donorEmail);

    const slideAnimation = {
        hidden: {
            x: infoAnimationType === 'submit' ? "100vh" : infoAnimationType === 'cancel' ? "-100vh" : 0,
            opacity: 0,
            transition: infoAnimationType === 'formSubmit' ? {duration: 0.5} : 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: infoAnimationType === 'formSubmit' ? {
                duration: 3 
            } : {
                duration: 10,
                type: "spring",
                damping: 50,
                stiffness: 750, 
            },
        },
        exit: {
            x: infoAnimationType === 'submit' ? "-100vh" : infoAnimationType === 'cancel' ? "100vh" : 0,
            opacity: 0,
            transition: infoAnimationType === 'formSubmit' ? {duration: 0.5} : 0,
        },
    };

    //  Donation Amount

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleInputSubmit = async () => {
        if (!isNaN(amount) && amount > 0) {
            setAmountError(false);
            await setInfoAnimationType("submit");
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
        await setInfoAnimationType("cancel");
        setPaymentIntent(false);
        closeStripePayment();
        openDonationInfo();
    }

    const handleConfirmPayment = async (payment) => {
        await setInfoAnimationType("formSubmit");
        setConfirmedPayment(payment);
    }

    useEffect(() => {
        if (confirmedPayment) {
            closeStripePayment();
            openClosing();

            setTimeout(() => {
                closeClosing();
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

    // Closing Remarks 

    return (
        <section id = 'donate' className= 'py-28'>
            <h1 className={`${styles.heading2} text-center pb-20 ss:text-[4.5rem] white-color`}>Get Involved</h1>
            <div className='flex gap-8'>
                <img src={donationPic} className='[flex-basis:45%] rounded-[2%] w-full object-cover max-h-[35rem]'/>    
                <Card className = "[flex-basis:55%] flex-grow" sx={{bgcolor: '#e8ecfc', position: 'relative', borderRadius: "2%", minHeight: '35rem'}}>
                    <AnimatePresence
                    initial='hidden'
                    mode='wait'
                    onExitComplete={() => null}
                    >
                        {donationInputOpen && 
                        <DonationInput 
                        amount={amount} 
                        handleAmountChange={handleAmountChange} 
                        handleInputSubmit={handleInputSubmit}
                        amountError={amountError} 
                        isLoading={donationType === 'oneTime' ? paymentIsLoading : subscriptionIsLoading} 
                        donationType={donationType}
                        setDonationType={setDonationType}
                        slideAnimation={slideAnimation}
                        />}
                    </AnimatePresence>
                    
                    <AnimatePresence
                    initial='hidden'
                    mode='wait'
                    onExitComplete={() => null}
                    >
                        {donationInfoOpen && 
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
                        infoAnimationType={infoAnimationType}
                        setInfoAnimationType={setInfoAnimationType}
                        slideAnimation={slideAnimation}
                        />}
                    </AnimatePresence>

                    <AnimatePresence
                    initial='hidden'
                    mode='wait'
                    onExitComplete={() => null}
                    >
                        {stripePaymentOpen && 
                        <Elements 
                        stripe={stripePromise} 
                        options={{ clientSecret: paymentIntent?.client_secret }}>
                            <StripeForm 
                                client_secret={paymentIntent?.client_secret} 
                                amount={paymentIntent?.amount} 
                                handlePaymentClear={handlePaymentClear} 
                                handleConfirmPayment={handleConfirmPayment}
                                setInfoAnimationType={setInfoAnimationType}
                                slideAnimation={slideAnimation}/>
                        </Elements>}
                    </AnimatePresence>
                    <AnimatePresence
                    initial='hidden'
                    mode='wait'
                    onExitComplete={() => null}>
                        {closingOpen && 
                        <motion.div
                        variants={slideAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className='w-full h-full absolute'>
                            <Typography variant="h6" textAlign={'center'} className='dark-color pt-[25%]'>Your generosity goes a long way!</Typography>
                        </motion.div>}
                    </AnimatePresence>
                </Card>
            </div>
        </section>
    )
}
export default DonationForm