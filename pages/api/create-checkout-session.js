const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.qty ?? 1,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: transformedItems,
    mode: 'payment',
    payment_method_types: ['card'],
    shipping_options: [
      {
        shipping_rate: 'shr_1MKyc4KrgBnvhshhhLazX3qO',
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'IN'],
    },
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
