import { useState, useEffect, React } from "react";
import { Card, Typography} from "@mui/material";
import useCreatePaymentIntent from "../../hooks/useCreatePaymentIntent";
import useCreateSubscription from "../../hooks/useCreateSubscription";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe } from "@stripe/stripe-js";
import DonationInput from "./DonationInput";
import DonatorInfo from "./DonatorInfo";
import StripeForm from "./StripeForm";
import { donationPic, discount } from "../../assets";
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

    const handleDonationType = (event, newDonationType) => {
        if (newDonationType !== null) {
            setDonationType(newDonationType);
        }
    };


    const handleInputSubmit = async () => {
        if (!isNaN(amount) && amount > 0 && /^\d+$/.test(amount)) {
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
            console.log(subscriptionData)
        }
    };

    useEffect(() => {
        donationType === 'oneTime' ? setPaymentIntent(paymentData) : setPaymentIntent(subscriptionData);
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
        <section 
        id = 'donate' 
        className={
            `${styles.paddingY} m-auto
            lg:max-w-[80%] xl:max-w-[90%]`}>
            <h1 className={
                `${styles.heading1} text-center white-text mb-[2rem] 
                md:mb-[4.5rem]`}>
                    Get Involved
            </h1>
            <div className='m-auto gap-[1rem]
                            sm:w-full sm:h-[33rem] sm:flex md:gap-[2rem] lg:h-[35rem] xl:h-[42rem]'>
                <div className='relative flex flex-col basis-[40%] m-auto mb-[3rem]
                                sm:mb-0 sm:h-full sm:w-full md:basis-[50%] lg:basis-[60%]'>
                    <div className='flex flex-row items-center justify-center black-gradient-bg rounded-[10px] py-[0.375rem] px-4 mb-[0.5rem]'>
                        <img
                            src={discount}
                            alt='stat icon'
                            className='hidden 
                                        md:[display:initial]'/>
                        <p className={
                            `${styles.paragraph} white-text ml-[0.5rem] text-center
                             md:text-start`}>
                            100% of Proceeds Go to Students in Need
                        </p>
                    </div>
                    <img
                    src={donationPic}
                    alt='Donation picture'
                    className='grow object-cover rounded-[2%]'/>
                </div>
                <Card
                    sx={{bgcolor: '#e8ecfc', position: 'relative', borderRadius: "2%"}}
                    className='grow h-[33rem] relative
                              sm:h-full sm:[flex-basis:50%] lg:[flex-basis:40%]'>
                    <AnimatePresence
                        initial='hidden'
                        mode='wait' 
                        onExitComplete={() => null}>
                            {donationInputOpen ?
                            <DonationInput
                                amount={amount}
                                handleAmountChange={handleAmountChange}
                                handleInputSubmit={handleInputSubmit}
                                handleDonationType={handleDonationType}
                                amountError={amountError}
                                isLoading={donationType === 'oneTime' ? paymentIsLoading : subscriptionIsLoading}
                                donationType={donationType}
                                setDonationType={setDonationType}
                                slideAnimation={slideAnimation}
                            /> : null}
                    </AnimatePresence>
                
                    <AnimatePresence
                    initial='hidden'
                    mode='wait'
                    onExitComplete={() => null}>
                        {donationInfoOpen ?
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
                        /> : null}
                    </AnimatePresence>
                    <AnimatePresence
                    initial='hidden'
                    mode='wait'
                    onExitComplete={() => null}>
                        {stripePaymentOpen ?
                        <Elements
                            stripe={stripePromise}
                            options={{clientSecret: paymentIntent?.client_secret}}>
                                <StripeForm
                                    client_secret={paymentIntent?.client_secret}
                                    amount={paymentIntent?.amount}
                                    handlePaymentClear={handlePaymentClear}
                                    handleConfirmPayment={handleConfirmPayment}
                                    setInfoAnimationType={setInfoAnimationType}
                                    slideAnimation={slideAnimation}/>
                        </Elements> : null}
                    </AnimatePresence>
                    <AnimatePresence
                        initial='hidden'
                        mode='wait'
                        onExitComplete={() => null}>
                            {closingOpen ?
                            <motion.div
                                variants={slideAnimation}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className='w-full h-full absolute'>
                            <Typography
                                variant="h6"
                                textAlign={'center'}
                                className='dark-text pt-[25%]'>
                                    Your generosity goes a long way!
                            </Typography>
                        </motion.div> : null}
                    </AnimatePresence>
                </Card>
            </div>
        </section>
    )
}

export default DonationForm;