import Image from "next/image";
import Prime from "../../public/img/prime.png";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

export default function CheckoutProductTile({
  id,
  title,
  description,
  image,
  price,
  rating,
  category,
}) {
  return (
    <div className="checkout_tile" id="checkout_tile">
      <div className="checkout_left">
        <Image src={image} height={180} width={180} objectFit="contain" />
      </div>
      <div className="checkout_tile_right">
        <h3>{title}</h3>
        <p className="instock">In stock</p>
        <div className="prime_icon">
          <Image src={Prime} height={14} width={40} />
        </div>
        <p className="description">{description}</p>
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
