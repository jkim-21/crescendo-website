import { useMutation } from 'react-query';
import createSubscription from '../paymentIntegration/createSubscription'

const useCreateSubscription = (amount, firstName, lastName, donorEmail) => {
    const mutation = useMutation(() => createSubscription(amount, firstName, lastName, donorEmail));
    return mutation;
}

export default useCreateSubscription;