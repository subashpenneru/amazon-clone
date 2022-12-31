import Image from 'next/image';
import { useSelector } from 'react-redux';

import { selectItems } from '../../store/slices/basketSlice';
import CheckoutProduct from './CheckoutProduct';

const CheckoutList = () => {
  const items = useSelector(selectItems);

  return (
    <div className='flex-grow m-5 shadow-sm'>
      <Image
        src='https://links.papareact.com/ikj'
        alt='checkout-img'
        width={1020}
        height={250}
        style={{ objectFit: 'contain' }}
      />

      <div className='flex flex-col p-5 space-y-10 bg-white'>
        <h1 className='text-3xl border-b pb-4'>
          {items.length === 0
            ? 'Your Amazon basket is empty.'
            : 'Shopping Basket'}
        </h1>

        {items.map(
          ({
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
          }) => (
            <CheckoutProduct
              key={id}
              id={id}
              title={title}
              price={price}
              rating={rating}
              description={description}
              category={category}
              image={image}
              hasPrime={hasPrime}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CheckoutList;
