import { useSelector } from "react-redux";
import CategoryNav from "../src/components/CategoryNav";
import CheckoutProductTile from "../src/components/CheckoutProductTile";
import Nav from "../src/components/Nav";
import { selectItems } from "../src/slices/basketSlice";

function Checkout() {
  const items = useSelector(selectItems);

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
              <h3>£13.99</h3>
            </div>
            <button>Proceed to Checkout</button>
          </div>
        </div>
      </main>
    </section>
  );
}
export default Checkout;
