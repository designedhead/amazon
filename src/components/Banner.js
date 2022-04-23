import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Image from "next/image";
import BannerOne from "../../public/img/banner1.jpg";
import BannerTwo from "../../public/img/banner2.jpg";
import BannerThree from "../../public/img/banner3.jpg";

export default function Banner() {
  return (
    <div className="banner" id="banner">
      <div className="banner_fade" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div className="image_container">
          <Image src={BannerOne} objectFit="contain" />
        </div>
        <div>
          <Image src={BannerTwo} objectFit="contain" />
        </div>
        <div>
          <Image src={BannerThree} objectFit="contain" />
        </div>
      </Carousel>
    </div>
  );
}
