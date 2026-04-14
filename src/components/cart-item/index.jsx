import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";

// Styles
import * as Styles from "./styles";

import { formatPrice } from "../../utils/formatPrice";

import {
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
} from "../../redux/cart/slice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Styles.CartItemContainer>
      {/* 🔥 AGORA COM LAZY LOAD */}
      <Styles.CartItemImage
        src={product.imageUrl}
        alt={product.name}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null; // evita loop
          e.target.src = "/image_fallback.png";
        }}
      />

      <Styles.CartItemInfo>
        <p>{product.name}</p>
        <p>{formatPrice(product.price)}</p>

        <Styles.CartItemQuantity>
          <AiOutlineMinus
            size={20}
            onClick={() => dispatch(decreaseProductQuantity(product.id))}
          />

          <p>{product.quantity}</p>

          <AiOutlinePlus
            size={20}
            onClick={() => dispatch(increaseProductQuantity(product.id))}
          />
        </Styles.CartItemQuantity>
      </Styles.CartItemInfo>

      <Styles.RemoveButton onClick={() => dispatch(removeProduct(product.id))}>
        <AiOutlineClose size={25} />
      </Styles.RemoveButton>
    </Styles.CartItemContainer>
  );
};

export default CartItem;
