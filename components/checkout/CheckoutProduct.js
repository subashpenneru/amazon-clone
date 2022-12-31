import Image from 'next/image';
import { StarIcon, PlusIcon, MinusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addToBasket, removeFromBasket } from '../../store/slices/basketSlice';

const CheckoutProduct = ({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const plusClickHandler = () => {
    setQty((prev) => prev + 1);
    dispatch(
      addToBasket({
        id,
        title,
        price,
        rating,
        description,
        category,
        image,
        hasPrime,
        qty: qty + 1,
      })
    );
  };

  const minusClickHandler = () => {
    setQty((prev) => prev - 1);
    dispatch(removeFromBasket({ id, qty: 1 }));
  };

  const removeItemHandler = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className='grid grid-cols-5'>
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        style={{ objectFit: 'contain' }}
      />

      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <>${price}</>
        {hasPrime && (
          <div className='flex items-center space-x-2'>
            <img
              loading='lazy'
              className='w-12'
              src='https://links.papareact.com/fdw'
              alt='prime'
            />
            <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className='flex items-center space-x-2'>
        <span
          id='qty-minus'
          className='text-center border border-gray-500 p-1 cursor-pointer rounded-sm shadow-lg font-bold'
          onClick={minusClickHandler}>
          <MinusIcon className='h-4' />
        </span>
        <span
          id='qty-val'
          className='text-center border border-gray-500 p-1 px-3'>
          {qty}
        </span>
        <span
          id='qty-add'
          className='text-center border border-gray-500 p-1 cursor-pointer rounded-sm shadow-lg font-bold'
          onClick={plusClickHandler}>
          <PlusIcon className='h-4' />
        </span>
        {/* <select name='qty' id='qty' className='p-2' onChange={qtyChangeHandler}>
          {Array(10)
            .fill()
            .map((_, i) => (
              <option value={i + 1} selected={i + 1 === 1}>
                {i + 1}
              </option>
            ))}
        </select> */}
        <button className='button' onClick={removeItemHandler}>
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
