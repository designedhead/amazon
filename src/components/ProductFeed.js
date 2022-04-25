import ProductTile from "./ProductTile";
import ProductBanner from "../../public/img/product-banner.png";
import Image from "next/image";
export default function ProductFeed({ products }) {
  return (
    <div className="product" id="product">
      {products.slice(0, 4).map((product, i) => (
        <div key={i}>
          <ProductTile
            key={`${product.id}_${i}`}
            id={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            price={product.price}
            rating={product.rating}
            category={product.category}
          />
        </div>
      ))}
      <div className="productfeed_image">
        <Image src={ProductBanner} display="fill" objectFit="contain" />
      </div>
      {products.slice(4, 20).map((product, i) => (
        <ProductTile
          key={`${product.id}_${i}`}
          id={product.id}
          title={product.title}
          description={product.description}
          image={product.image}
          price={product.price}
          rating={product.rating}
          category={product.category}
        />
      ))}
    </div>
  );
}
