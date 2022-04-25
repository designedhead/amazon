import Logo from "../../public/img/logo-white.png";
import Image from "next/image";
import { SearchIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <div className="nav" id="nav">
      <div className="nav_cnt">
        <Image
          src={Logo}
          objectFit="contain"
          height={80}
          width={90}
          onClick={() => router.push("/")}
        />
        <div className="nav_search">
          <input className="nav_search_input" />
          <div className="search_icon_container">
            <SearchIcon className="search_icon" />
          </div>
        </div>
        <div className="nav_right">
          <div className="nav_section" onClick={!session ? signIn : signOut}>
            <p className="subtitle">
              {session ? `Hello, ${session.user.name}` : "Sign-in"}
            </p>
            <div className="nav_section_bottom">
              <p className="title">Account &amp; Listing</p>
              <ChevronDownIcon className="nav_chevron" />
            </div>
          </div>
          <div className="nav_section" onClick={() => router.push("/orders")}>
            <p className="subtitle">Returns</p>
            <div className="nav_section_bottom">
              <p className="title">&amp; Orders</p>
            </div>
          </div>
          <div className="nav_basket" onClick={() => router.push("/checkout")}>
            <div className="cart_total">
              <svg
                id="a"
                xmlns="http://www.w3.org/2000/svg"
                width="49.34mm"
                height="34.67mm"
                viewBox="0 0 139.87 98.28"
                className="cart_svg"
              >
                <g id="b">
                  <g id="c">
                    <g id="d">
                      <polyline
                        id="e"
                        points="7 7 26.12 7 55.38 65.36 111.42 65.36 132.87 20.47"
                        fill="none"
                        stroke="#ffff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="14"
                      />
                      <circle
                        id="f"
                        cx="57.05"
                        cy="88.97"
                        r="9.31"
                        fill="#ffff"
                      />
                      <circle
                        id="g"
                        cx="105.43"
                        cy="88.97"
                        r="9.31"
                        fill="#ffff"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <p className="cart_total_number">{items.length}</p>
            </div>

            <p className="title">Basket</p>
          </div>
        </div>
      </div>
    </div>
  );
}
