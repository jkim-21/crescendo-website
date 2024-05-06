import { useMutation } from 'react-query';
import createPaymentIntent from '../paymentIntegration/createPaymentIntent';

const useCreatePaymentIntent = (amount, firstName, lastName, donorEmail) => {
    const mutation = useMutation(() => createPaymentIntent(amount, firstName, lastName, donorEmail));
    return mutation;
}

export default useCreatePaymentIntent;
