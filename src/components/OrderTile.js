import moment from "moment";
import Image from "next/image";
import Currency from "react-currency-formatter";

export default function OrderTile({
  id,
  amount,
  amountShipping,
  items,
  timestamp,
  images,
}) {
  return (
    <div className="ordertile" id="ordertile">
      <div className="order_details">
        <div className="order_details_left">
          <div className="info_flex">
            <p className="title">ORDER PLACED</p>
            <p className="result">
              {moment.unix(timestamp).format("DD MMM YYYY")}
            </p>
          </div>
          <div className="info_flex">
            <p className="title">TOTAL</p>
            <p className="result">
              {" "}
              <Currency quantity={amount} currency="GBP" />
            </p>
          </div>
          <div className="info_flex">
            <p className="title">Shipping</p>
            <p className="result">
              Next Day Delivery -{" "}
              <Currency quantity={amountShipping} currency="GBP" />
            </p>
          </div>
        </div>
        <div className="order_details_right">
          <p className="ordernumber">{`Order #${id}`}</p>
          <p className="itemsnumber">2 items</p>
        </div>
      </div>
      <div className="order_content">
        {images.map((image, i) => (
          <img key={i} src={image} alt="" />
        ))}
      </div>
    </div>
  );
}
