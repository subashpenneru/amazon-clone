import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

import { selectTotal } from '../../store/slices/basketSlice';

const CheckoutProceed = () => {
  const { data: session } = useSession();
  const { totalItems, totalPrice } = useSelector(selectTotal);

  return (
    totalItems > 0 && (
      <div className='flex flex-col bg-white p-10 shadow-md mb-5'>
        <h2 className='whitespace-nowrap'>
          Subtotal ({totalItems} items):
          <span className='font-bold'>${totalPrice}</span>
        </h2>

        <button
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
