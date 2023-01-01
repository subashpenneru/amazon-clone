import { useRouter } from 'next/router';
import { CheckCircleIcon } from '@heroicons/react/solid';

const SuccessPage = () => {
  const router = useRouter();

  return (
    <main className='max-w-screen-lg mx-auto'>
      <div className='flex flex-col p-10'>
        <div className='flex items-center space-x-2 mb-5'>
          <CheckCircleIcon className='text-green-500 h-10' />
          <h1 className='text-3xl'>
            Thank you, your order has been confirmed!
          </h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis,
          quae! Cupiditate eius, at sit autem eligendi ducimus quo inventore
          assumenda!
        </p>
        <button onClick={() => router.push('/orders')} className='button mt-8'>
          Go to my Orders
        </button>
      </div>
    </main>
  );
};

export default SuccessPage;
