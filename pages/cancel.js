import Nav from "../src/components/Nav";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

function Cancel() {
  const router = useRouter();
  return (
    <div>
      <Nav />
      <main className="cancel" id="cancel">
        <div className="container">
          <div className="top_container">
            <ExclamationCircleIcon className="icon" />
            <h1>{"Ups, something wen't wrong 😔"}</h1>
          </div>
          <p>
            {
              "Seems you may have cancelled the stripe transaction, remember you can use the card number 4242 4242 4242 4242 since it's currently in Test Mode."
            }
          </p>
          <button onClick={() => router.push("/checkout")}>Go to Basket</button>
        </div>
      </main>
    </div>
  );
}

export default Cancel;
