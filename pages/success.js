import Nav from "../src/components/Nav";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { purgeBasket } from "../src/slices/basketSlice";
import { useEffect } from "react";

function Success() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(purgeBasket());
  }, []);
  return (
    <div>
      <Nav />
      <main className="success" id="success">
        <div className="container">
          <div className="top_container">
            <CheckCircleIcon className="icon" />
            <h1>Thank you, your order has been confirmed</h1>
          </div>
          <p>
            {
              "Thank you for shopping with us. Well send a confirmation once your items have been shipped, if you would like to check the status of your order(s) please press the link bellow."
            }
          </p>
          <button onClick={() => router.push("/orders")}>
            Go to my Orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
