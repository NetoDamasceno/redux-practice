import { ShoppingCart } from "lucide-react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Cart from "../cart/index";
import LoginModal from "../login-modal";
import UserDropdown from "../user-dropdown";

// Styles
import * as Styles from "./styles";

// Redux
import { selectProductsCount } from "../../redux/cart/cart.selectors";
import { login, logout } from "../../redux/user/slice";

function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);

  const timeoutRef = useRef(null);

  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

  const productsCount = useSelector(selectProductsCount);

  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCartPreviewOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCartPreviewOpen(false);
    }, 150);
  };

  const handleCartClick = () => {
    setCartIsVisible(true);
    setIsCartPreviewOpen(false);
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

        {/* CART AREA */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            id="cart-icon"
            onClick={handleCartClick}
            className="relative cursor-pointer transition-all duration-200 hover:text-orange-600 hover:scale-105"
          >
            <ShoppingCart size={24} />

            {productsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {productsCount}
              </span>
            )}
          </div>

          {/* CART PREVIEW */}
          <div
            className={`absolute right-0 mt-4 w-72 bg-white text-gray-700 text-sm rounded-md shadow-xl p-4 transition-all duration-300 z-50 ${
              isCartPreviewOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            {productsCount === 0 ? (
              <p className="text-center text-gray-500">
                Seu carrinho está vazio
              </p>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto flex flex-col gap-3">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />

                      <div className="flex flex-col text-xs">
                        <span className="font-medium text-gray-800">
                          {product.name}
                        </span>

                        <span className="text-gray-500">R${product.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCartClick}
                  className="mt-4 w-full bg-orange-500 text-white text-sm py-2 rounded hover:bg-orange-600 transition"
                >
                  Ver carrinho
                </button>
              </>
            )}
          </div>
        </div>
      </Styles.Buttons>

      <Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Styles.Container>
  );
}

export default Header;
