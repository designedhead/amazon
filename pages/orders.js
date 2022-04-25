import db from "../firebase";
import Nav from "../src/components/Nav";
import { getSession, useSession } from "next-auth/react";
import moment from "moment";
import OrderTile from "../src/components/OrderTile";

function Orders({ orders }) {
  const { data: session } = useSession();

  console.log(orders);

  return (
    <div>
      <Nav />
      <main className="orders" id="orders">
        <h1>Your Orders</h1>

        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        {orders?.map(
          ({ id, amount, amountShipping, items, timestamp, images }) => (
            <OrderTile
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
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //Getting users logged in Credentials

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("order")
    .orderBy("timestamp", "desc")
    .get();

  //Getting Firestore DB

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
}
