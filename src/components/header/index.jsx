import { ShoppingCart } from "lucide-react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Cart from "../cart/index";

// Styles
import * as Styles from "./styles";

import LoginModal from "../login-modal";
import { login, logout } from "../../redux/user/slice";
import { selectProductsCount } from "../../redux/cart/cart.selectors";

import UserDropdown from "../user-dropdown";

function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  // eslint-disable-next-line
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

  const productsCount = useSelector(selectProductsCount);

  const dispatch = useDispatch();

  const handleCartClick = () => {
    setCartIsVisible(true);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
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
          <UserDropdown currentUser={currentUser} />
        ) : (
          <div
            onClick={handleLoginClick}
            className="cursor-pointer transition-all duration-200 hover:text-orange-600 hover:scale-105"
          >
            Login
          </div>
        )}

        <div
          id="cart-icon"
          onClick={handleCartClick}
          className="relative group cursor-pointer transition-all duration-200 hover:text-orange-600 hover:scale-105"
        >
          <ShoppingCart size={24} />

          {productsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 transition-all duration-300">
              {productsCount}
            </span>
          )}

          {productsCount === 0 && (
            <div className="absolute right-0 mt-4 w-56 bg-white text-gray-700 text-sm rounded-md shadow-lg p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
              Não há produtos ainda
            </div>
          )}
        </div>
      </Styles.Buttons>

      <Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Styles.Container>
  );
}

export default Header;
