import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';

const ProductItem = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rate,
}) => {
  const hasPrime = price > 500;

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
        {category}
      </p>

      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        style={{ objectFit: 'contain' }}
      />

      <h4 className='my-3'>{title}</h4>

      <div className='flex'>
        {Array(Math.round(rate))
          .fill()
          .map((_, i) => (
            <StarIcon className='h-5 text-yellow-500' key={i} />
          ))}
      </div>

      <p className='text-xs my-2 line-clamp-2'>{description}</p>

      <div className='mb-5'>${price}</div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img
            className='w-12'
            src='https://links.papareact.com/fdw'
            alt='prime'
          />
          <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
        </div>
      )}

      <button className='mt-auto button'>Add to Basket</button>
    </div>
  );
};

export default ProductItem;
