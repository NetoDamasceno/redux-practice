import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { addProduct } from "../../redux/cart/slice";
import { openImage } from "../../redux/image-preview/slice";

// Components
import CustomButton from "../custom-button/index";

// Styles
import * as Styles from "./styles";

import { formatPrice } from "../../utils/formatPrice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const imageRef = useRef(null);

  // 🔥 lazy loading
  const [isVisible, setIsVisible] = useState(false);

  // ❌ erro na imagem
  const [imageError, setImageError] = useState(false);

  // ✨ fade suave
  const [isLoaded, setIsLoaded] = useState(false);

  // 👁️ observer (lazy load)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 🧠 detectar erro OU sucesso da imagem
  useEffect(() => {
    if (!isVisible || !product.imageUrl) return;

    const img = new Image();
    img.src = product.imageUrl;

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setImageError(true);
      setIsLoaded(true); // 🔥 importante pro fade funcionar também no fallback
    };
  }, [isVisible, product.imageUrl]);

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
        imageUrl={
          isVisible
            ? imageError
              ? "/image_fallback.png"
              : product.imageUrl
            : ""
        }
        onClick={handleImageClick}
        style={{
          cursor: "zoom-in",
          opacity: isLoaded ? 1 : 0, // ✨ fade
          transition: "opacity 0.4s ease",
        }}
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
        <p>{formatPrice(product.price)}</p>
      </Styles.ProductInfo>
    </Styles.ProductContainer>
  );
};

export default ProductItem;
