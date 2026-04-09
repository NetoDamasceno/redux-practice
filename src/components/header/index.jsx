import { ShoppingCart, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Cart from "../cart/index";
import LoginModal from "../login-modal";
import UserDropdown from "../user-dropdown";
import SearchDropdown from "../search-dropdown";

// Styles
import * as Styles from "./styles";

// Redux
import { selectProductsCount } from "../../redux/cart/cart.selectors";
import { removeProduct, clearCart } from "../../redux/cart/slice";
import { setSearchTerm } from "../../redux/search/slice";

// Data
import allProducts from "../../data/products";

function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const timeoutRef = useRef(null);
  const searchRef = useRef(null);

  const { currentUser } = useSelector((state) => state.userReducer);
  const { products } = useSelector((state) => state.cartReducer);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const productsCount = useSelector(selectProductsCount);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setIsSearchOpen(true);
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSearchOpen(false);
    }
  };

  useState(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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

  const handleLogoClick = () => {
    setCartIsVisible(false);

    if (window.scrollY === 0) {
      window.location.reload();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 🔥 abrir modal
  const handleClearCartClick = () => {
    setIsConfirmModalOpen(true);
  };

  // 🔥 confirmar com animação
  const handleConfirmClearCart = () => {
    setIsClearing(true);

    setTimeout(() => {
      dispatch(clearCart());
      setIsClearing(false);
      setIsConfirmModalOpen(false);
      setIsCartPreviewOpen(false);
    }, 400); // tempo da animação
  };

  const previewProducts = products.slice(0, 3);
  const remainingProducts = products.length - 3;

  return (
    <Styles.Container>
      <Styles.Logo onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        Redux Shopping
      </Styles.Logo>

      {/* 🔍 SEARCH */}
      <div className="relative w-72 max-w-[50vw] mr-6 sm:mr-10" ref={searchRef}>
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchOpen(true)}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black outline-none border border-transparent transition-all duration-200 placeholder-gray-500 hover:bg-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:shadow-sm"
        />

        {isSearchOpen && (
          <SearchDropdown
            searchTerm={searchTerm}
            products={allProducts}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
      </div>

      <Styles.Buttons>
        {currentUser ? (
          <UserDropdown currentUser={currentUser} />
        ) : (
          <div
            onClick={() => setIsLoginOpen(true)}
            className="cursor-pointer transition-all duration-200 hover:text-orange-600 hover:scale-105"
          >
            Login
          </div>
        )}

        {/* CART */}
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

          {/* PREVIEW */}
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
                <div
                  className={`max-h-60 overflow-y-auto flex flex-col gap-2 pr-1 transition-all duration-300 ${
                    isClearing ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  {previewProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />

                      <div className="flex flex-col flex-1 min-w-0 text-xs">
                        <span className="font-medium text-gray-800 truncate">
                          {product.name}
                        </span>
                        <span className="text-gray-500">R${product.price}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeProduct(product.id));
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={handleCartClick}
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                  >
                    Ver carrinho
                  </button>

                  <button
                    onClick={handleClearCartClick}
                    className="w-full py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                  >
                    Esvaziar carrinho
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Styles.Buttons>

      {/* MODAL */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsConfirmModalOpen(false)}
          />

          <div className="relative bg-white rounded-xl p-6 w-80 shadow-2xl animate-[fadeIn_0.2s_ease]">
            <h2 className="text-lg font-semibold mb-2">Esvaziar carrinho?</h2>

            <p className="text-sm text-gray-500 mb-4">
              Essa ação removerá todos os produtos do seu carrinho.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={handleConfirmClearCart}
                className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                {isClearing ? "Esvaziando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Styles.Container>
  );
}

export default Header;
