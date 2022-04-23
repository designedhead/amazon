import Logo from "../../public/img/logo-white.png";
import Image from "next/image";
import { MenuIcon } from "@heroicons/react/solid";
export default function CategoryNav() {
  return (
    <div className="category_nav" id="category_nav">
      <div className="category_nav_ctn">
        <div className="category_menuall">
          <MenuIcon className="category_menu" />
          <p>All</p>
        </div>
        <p>Prime Video</p>
        <p>Gift Cards &amp; Top up</p>
        <p>Prime</p>
        <p>Books</p>
        <p>Morrisons</p>
        <p>Buy Again</p>
        <p>Free Delivery</p>
      </div>
    </div>
  );
}
