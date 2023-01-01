import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

import { selectItems, selectTotal } from '../../store/slices/basketSlice';

const stripePromise = loadStripe(process.env.stripe_public_key);

const CheckoutProceed = () => {
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  const { totalItems, totalPrice } = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    totalItems > 0 && (
      <div className='flex flex-col bg-white p-10 shadow-md mb-5'>
        <h2 className='whitespace-nowrap'>
          Subtotal ({totalItems} items):
          <span className='font-bold'>${totalPrice}</span>
        </h2>

        <button
          role='link'
          onClick={createCheckoutSession}
          disabled={!session}
          className={`button mt-2 ${
            !session &&
            'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
          }`}>
          {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
        </button>
      </div>
    )
  );
};

export default CheckoutProceed;
