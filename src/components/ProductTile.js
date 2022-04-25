import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, selectItems } from "../slices/basketSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductTile({
  id,
  title,
  description,
  image,
  price,
  rating,
  category,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const items = useSelector(selectItems);

  useEffect(() => {
    if (items.length !== 0) {
      let co = items.find((element) => element.id === id);
      setAdded(co);
    }
  }, [items]);

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
        <div className="tile_rating_container">
          {Array(Math.round(`${rating.rate}`))
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="tile_rating" />
            ))}
          <span> ({rating.count})</span>
        </div>
        <p>{description}</p>
        <p className="tile_currency">
          <Currency quantity={price} currency="GBP" />
        </p>

        {added ? (
          <button
            className="view_basket"
            onClick={() => router.push("/checkout")}
          >
            View Basket
          </button>
        ) : (
          <button className="add_basket" onClick={addItemToBasket}>
            Add to Basket
          </button>
        )}
      </div>
    </div>
  );
}
