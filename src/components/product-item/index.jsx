import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { addProduct } from "../../redux/cart/slice";
import { openImage } from "../../redux/image-preview/slice";

// Components
import CustomButton from "../custom-button/index";

// Styles
import * as Styles from "./styles";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const imageRef = useRef(null);

  // 🔥 lazy loading state
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // carrega antes de aparecer
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 🛒 Adicionar ao carrinho
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

      const cart = document.getElementById("cart-icon");

      if (cart) {
        cart.classList.add("cart-bounce");

        setTimeout(() => {
          cart.classList.remove("cart-bounce");
        }, 500);
      }

      dispatch(addProduct(product));
    }, 800);
  };

  // 🔍 abrir imagem
  const handleImageClick = () => {
    dispatch(openImage(product.imageUrl));
  };

  return (
    <Styles.ProductContainer>
      <Styles.ProductImage
        ref={imageRef}
        imageUrl={isVisible ? product.imageUrl : ""} // 🔥 AQUI está o lazy load
        onClick={handleImageClick}
        style={{ cursor: "zoom-in" }}
      >
        {/* botão */}
        <div onClick={(e) => e.stopPropagation()}>
          <CustomButton startIcon={<BsCartPlus />} onClick={handleProductClick}>
            Adicionar ao carrinho
          </CustomButton>
        </div>
      </Styles.ProductImage>

      <Styles.ProductInfo>
        <p>{product.name}</p>
        <p>
          <span>R$</span>
          {product.price}
        </p>
      </Styles.ProductInfo>
    </Styles.ProductContainer>
  );
};

export default ProductItem;
