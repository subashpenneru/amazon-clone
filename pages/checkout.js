import CheckoutList from '../components/checkout/CheckoutList';
import CheckoutProceed from '../components/checkout/CheckoutProceed';

const Checkout = () => {
  return (
    <main className='lg:flex max-w-screen-2xl mx-auto'>
      <CheckoutList />
      <CheckoutProceed />
    </main>
  );
};

export default Checkout;
