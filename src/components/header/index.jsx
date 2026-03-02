import { ShoppingCart } from "lucide-react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Cart from "../cart/index";

// Styles
import * as Styles from "./styles";

import { loginUser, logoutUser } from "../../redux/user/actions";
import { selectProductsCount } from "../../redux/cart/cart.selectors";

function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  // eslint-disable-next-line
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

  const productsCount = useSelector(selectProductsCount);

  const dispatch = useDispatch();

  const handleCartClick = () => {
    setCartIsVisible(true);
  };

  const handleLoginClick = () => {
    dispatch(loginUser({ name: "Neto", email: "neto@damasceno.com" }));
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  const handleLogoClick = () => {
    setCartIsVisible(false);

    const isAtTop = window.scrollY === 0;

    if (isAtTop) {
      window.location.reload();
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Styles.Container>
      <Styles.Logo onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        Redux Shopping
      </Styles.Logo>
      <Styles.Buttons>
        {currentUser ? (
          <div
            onClick={handleLogoutClick}
            className="cursor-pointer transition-all duration-200 hover:text-orange-600 hover:scale-105"
          >
            Sair
          </div>
        ) : (
          <div
            onClick={handleLoginClick}
            className="cursor-pointer transition-all duration-200 hover:text-orange-600 hover:scale-105"
          >
            Login
          </div>
        )}
        <div
          onClick={handleCartClick}
          className="relative cursor-pointer transition-all duration-200 hover:text-orange-600 hover:scale-105"
        >
          <ShoppingCart size={24} />

          {productsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 transition-all duration-300">
              {productsCount}
            </span>
          )}
        </div>
      </Styles.Buttons>

      <Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />
    </Styles.Container>
  );
}

export default Header;
