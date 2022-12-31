import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';

const Home = ({ products }) => {
  return (
    <main className='max-w-screen-2xl mx-auto'>
      <Banner />
      <ProductFeed products={products} />
    </main>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

  return {
    props: { products },
  };
};
