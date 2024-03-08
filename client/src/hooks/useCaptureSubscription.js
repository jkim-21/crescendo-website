import { useMutation } from 'react-query';
import captureSubscription from '../api/payment/createSubscription'

const useCaptureSubscription = (stripe, clientSecret) => {
    const mutation = useMutation(() => captureSubscription(stripe, clientSecret));
    return mutation;
}

export default useCaptureSubscription;