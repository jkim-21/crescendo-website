import { useMutation } from 'react-query';
import capturePayment from '../paymentIntegration/capturePayment';

const useCapturePayment = (elements, stripe, amount) => {
    const mutation = useMutation(() => capturePayment(elements, stripe, amount));
    return mutation;
}

export default useCapturePayment