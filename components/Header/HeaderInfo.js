import { ShoppingCartIcon } from '@heroicons/react/outline';

const HeaderInfo = () => {
  return (
    <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
      <div className='link'>
        <p>Hello, Subash</p>
        <p className='font-extrabold md:text-sm'>Account & Lists</p>
      </div>
      <div className='link'>
        <p>Returns</p>
        <p className='font-extrabold md:text-sm'>& Orders</p>
      </div>
      <div className='relative link flex items-center'>
        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
          0
        </span>
        <ShoppingCartIcon className='h-10' />
        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>
          Basket
        </p>
      </div>
    </div>
  );
};

export default HeaderInfo;
