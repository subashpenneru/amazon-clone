import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import { collection, getDocs } from 'firebase/firestore';

import db from '../firebase';
import Order from '../components/Order';

const OrdersPage = ({ orders }) => {
  const { data: session } = useSession();

  return (
    <main className='max-w-screen-lg mx-auto p-10 bg-white'>
      <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
        Your Orders
      </h1>

      {session ? (
        <h2>{orders?.length} Orders</h2>
      ) : (
        <h2>Please sign in to see your orders</h2>
      )}

      <div className='mt-5 space-y-4'>
        {orders?.map(
          ({ id, amount, amountShipping, items, timestamp, images }) => (
            <Order
              key={id}
              id={id}
              amount={amount}
              amountShipping={amountShipping}
              items={items}
              timestamp={timestamp}
              images={images}
            />
          )
        )}
      </div>
    </main>
  );
};

export default OrdersPage;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const colRef = collection(db, 'users', session.user.email, 'orders');
  const docsSnap = await getDocs(colRef);

  const orders = await Promise.all(
    docsSnap.docs.map(async (order) => {
      const data = order.data();
      const items = await stripe.checkout.sessions.listLineItems(order.id, {
        limit: 100,
      });
      return {
        id: order.id,
        amount: data.amount,
        amountShipping: data.amount_shipping,
        images: data.images,
        timestamp: moment(data.timestamp.toDate()).unix(),
        items: items.data,
      };
    })
  );

  return {
    props: { orders },
  };
}
