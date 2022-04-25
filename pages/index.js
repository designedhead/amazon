import Head from "next/head";
import Image from "next/image";
import Nav from "../src/components/Nav";
import CategoryNav from "../src/components/CategoryNav";
import Banner from "../src/components/Banner";
import ProductFeed from "../src/components/ProductFeed";
import { useState } from "react";
export default function Home({ products }) {
  const [modal, setModal] = useState(true);

  return (
    <div>
      <div id="myModal" class={modal ? "modal" : "modal_hidden"}>
        <div class="modal-content">
          <span class="close" onClick={() => setModal(false)}>
            &times;
          </span>
          <h1>Welcome to my Project</h1>
          <h2 href="https://github.com/designedhead" target="_blank">
            Rafael Mendes - Git
          </h2>
          <p>In this skill assessment project you'll be able to:</p>
          <lu>
            <li>View Mapped items from FakeStore API</li>
            <li>
              Login with Google using <strong>NextAuth</strong>
            </li>
            <li>
              Add them to cart using <strong>Redux</strong>
            </li>
            <li><strong>Persist</strong> Redux info after refreshing the page</li>
            <li>Visit Basket and checkout using <strong>Stripe.js</strong></li>
            <li>On Success we store your order info with <strong>Firebase/Firestore</strong></li>
            <li>Go to Order page and view previous orders</li>
          </lu>
        </div>
      </div>
      <Nav />
      <CategoryNav />
      <Banner />
      <ProductFeed products={products} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: { products },
  };
}
