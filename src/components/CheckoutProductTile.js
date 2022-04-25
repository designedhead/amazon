import Image from "next/image";
import Prime from "../../public/img/prime.png";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../slices/basketSlice";
export default function CheckoutProductTile({
  id,
  title,
  description,
  image,
  price,
  rating,
  category,
}) {
  const dispatch = useDispatch();
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="checkout_tile" id="checkout_tile">
      <div className="checkout_left">
        <Image src={image} height={180} width={180} objectFit="contain" />
      </div>
      <div className="checkout_tile_right">
        <h3>{title}</h3>
        <p className="instock">In stock</p>
        <div className="prime_icon">
          <Image src={Prime} display="fill" objectFit="contain" />
        </div>
        <p className="description">{description}</p>
        <div className="checkout_tile_options">
          <select className="checkout_amount">
            <option>1</option>
          </select>
          <div className="vertical_divider" />
          <p onClick={removeItemFromBasket} className="checkout_tile_delete">
            Delete
          </p>
        </div>
        {/* <button>Add to Basket</button> */}
      </div>
      <div className="checkout_farleft">
        <p className="tile_currency">
          <Currency quantity={price} currency="GBP" />
        </p>
      </div>
    </div>
  );
}
