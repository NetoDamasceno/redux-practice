import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { addProduct } from "../../redux/cart/slice";

// Components
import CustomButton from "../custom-button/index";

// Styles
import * as Styles from "./styles";

// Utilities

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const imageRef = useRef(null)

  const handleProductClick = () => {
    const cart = document.getElementById("cart-icon");

    if (!cart || !imageRef.current) {
      dispatch(addProduct(product));
      return;
    }

    const imgRect = imageRef.current.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = imageRef.current.cloneNode(true);

    flyingImg.style.position = "fixed";
    flyingImg.style.top = `${imgRect.top}px`;
    flyingImg.style.left = `${imgRect.left}px`;
    flyingImg.style.width = `${imgRect.width}px`;
    flyingImg.style.height = `${imgRect.height}px`;
    flyingImg.style.transition = "all 0.8s cubic-bezier(.17,.67,.83,.67)";
    flyingImg.style.zIndex = "9999";

    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.top = `${cartRect.top}px`;
      flyingImg.style.left = `${cartRect.left}px`;
      flyingImg.style.width = "30px";
      flyingImg.style.height = "30px";
      flyingImg.style.opacity = "0.5";
    });

    setTimeout(() => {
      flyingImg.remove();
      dispatch(addProduct(product));
    }, 800);
  };

  return (
    <Styles.ProductContainer>
      <Styles.ProductImage ref={imageRef} imageUrl={product.imageUrl}>
        <CustomButton startIcon={<BsCartPlus />} onClick={handleProductClick}>
          Adicionar ao carrinho
        </CustomButton>
      </Styles.ProductImage>

      <Styles.ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </Styles.ProductInfo>
    </Styles.ProductContainer>
  );
};

export default ProductItem;
