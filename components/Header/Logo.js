import Image from 'next/image';

const Logo = () => {
  return (
    <div className='mt-2 mr-6 flex items-center flex-grow sm:flex-grow-0'>
      <Image
        src='https://links.papareact.com/f90'
        alt='Amazon'
        width={150}
        height={40}
        style={{ objectFit: 'contain' }}
        className='cursor-pointer'
      />
    </div>
  );
};

export default Logo;
