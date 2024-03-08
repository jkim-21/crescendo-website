const captureSubscription = async (stripe, clientSecret) => {
    if (!stripe) {
        console.error('Stripe has not been initialized');
        return;
    }

    if (!clientSecret) {
        console.error('Client secret is required for confirming payment');
        return;
    }

    try {
    

        const confirmResult = await stripe.confirmCardPayment(clientSecret);
        
        if (confirmResult.error) {
            console.error(`Payment confirmation failed: ${confirmResult.error.message}`);
            return;
        }

        // Handle successful subscription creation
        console.log('Subscription created successfully');
    }
    catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
};

export default captureSubscription;