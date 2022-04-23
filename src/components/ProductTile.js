import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
export default function ProductTile({
  title,
  description,
  image,
  price,
  rating,
  category,
  id,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
    };
    dispatch(addToBasket(product));
  };
  return (
    <div className="tile" id="tile">
      <div className="tile_category">{category}</div>
      <div className="title_inner_container">
        <Image src={image} height={200} width={200} objectFit="contain" />
        <h3>{title.substring(0, 35)}</h3>
        <div>
          {Array(Math.round(`${rating.rate}`))
            .fill()
            .map((_, i) => (
              <StarIcon className="tile_rating" />
            ))}
        </div>
        <p>{description}</p>
        <p className="tile_currency">
          <Currency quantity={price} currency="GBP" />
        </p>
        <button onClick={addItemToBasket}>Add to Basket</button>
      </div>
    </div>
  );
}
