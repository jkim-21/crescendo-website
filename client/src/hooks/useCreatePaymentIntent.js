import { useMutation } from 'react-query';
import createPaymentIntent from '../api/payment/createPaymentIntent';

const useCreatePaymentIntent = () => {
    const mutation = useMutation(createPaymentIntent);
    return mutation;
}

export default useCreatePaymentIntent
