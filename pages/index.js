import Head from "next/head";
import Image from "next/image";
import Nav from "../src/components/Nav";
import CategoryNav from "../src/components/CategoryNav";
import Banner from "../src/components/Banner";
import ProductFeed from "../src/components/ProductFeed";
export default function Home({ products }) {
  return (
    <div>
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
