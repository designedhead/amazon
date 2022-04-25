import { signIn, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import CategoryNav from "../src/components/CategoryNav";
import CheckoutProductTile from "../src/components/CheckoutProductTile";
import Nav from "../src/components/Nav";
import {
  selectItems,
  selectTotal,
  purgeBasket,
} from "../src/slices/basketSlice";
import Currency from "react-currency-formatter";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const { data: session } = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    // Backend call for stripe
    const stripe = await stripePromise;
    const checkoutSession = await axios.post(
      "https://amazon-opal-one.vercel.app/api/create-checkout-session",
      {
        items: items,
        email: session.user.email,
        name: session.user.name,
      }
    );

    //Redirect user/customer to Stripe
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };
  const dispatch = useDispatch();
  const clearBasket = () => {
    dispatch(purgeBasket());
  };

  return (
    <section id="checkout">
      <Nav />
      <CategoryNav />
      <main>
        <div className="left">
          <h1>
            {items.length === 0 ? "Your basket is empty" : "Shopping Basket"}
          </h1>
          {items.map((item, i) => (
            <CheckoutProductTile
              key={i}
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price}
              rating={item.rating}
              category={item.category}
            />
          ))}
        </div>
        <div className="right">
          <div className="right_container">
            <div className="right_price">
              <h2>Subtotal ({items.length} item):</h2>
              <h3>
                <Currency quantity={total} currency="GBP" />
              </h3>
            </div>
            {session ? (
              <button
                onClick={createCheckoutSession}
                role="link"
                className="checkout_bt"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button className="signin_bt" onClick={signIn}>
                Sign in to Checkout
              </button>
            )}
            <button className="clear_bt" onClick={clearBasket}>
              Clear Cart
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
export default Checkout;
