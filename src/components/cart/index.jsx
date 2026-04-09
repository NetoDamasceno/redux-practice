import { useSelector } from "react-redux";

// Styles
import * as Styles from "./styles";

import CartItem from "../cart-item/index";
import { selectProductsTotalPrice } from "../../redux/cart/cart.selectors";

import { formatPrice } from "../../utils/formatPrice";

const Cart = ({ isVisible, setIsVisible }) => {
  const handleEscapeAreaClick = () => setIsVisible(false);

  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);
  const productsTotalPrice = useSelector(selectProductsTotalPrice);

  return (
    <Styles.CartContainer isVisible={isVisible}>
      <Styles.CartEscapeArea onClick={handleEscapeAreaClick} />

      <Styles.CartContent>
        {/* HEADER */}
        <Styles.CartHeader>
          <Styles.CartTitle>Seu carrinho</Styles.CartTitle>
          <Styles.CloseButton onClick={() => setIsVisible(false)}>
            ✕
          </Styles.CloseButton>
        </Styles.CartHeader>

        {/* LISTA */}
        <Styles.CartItems>
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <Styles.EmptyCart>
              Seu carrinho está vazio 🛒
            </Styles.EmptyCart>
          )}
        </Styles.CartItems>

        {/* TOTAL FIXO */}
        <Styles.CartFooter>
          <Styles.TotalRow>
            <span>Total</span>
            <strong>{formatPrice(productsTotalPrice)}</strong>
          </Styles.TotalRow>

          <Styles.CheckoutButton>
            Finalizar compra
          </Styles.CheckoutButton>
        </Styles.CartFooter>
      </Styles.CartContent>
    </Styles.CartContainer>
  );
};

export default Cart;
