import styled from "styled-components";

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px) scale(1.05);
    z-index: 2;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  padding: 0 4px 6px;

  /* 🏷️ Nome do produto */
  p:first-child {
    font-size: 1.05rem;
    font-weight: 600;
    color: #111; /* preto forte */
    line-height: 1.4;
    letter-spacing: -0.2px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* 💰 Preço */
  p:last-child {
    font-size: 1.3rem;
    font-weight: 800;
    color: #000; /* destaque máximo */
    letter-spacing: -0.5px;

    display: flex;
    align-items: baseline;
    gap: 4px;

    span {
      font-size: 0.95rem;
      font-weight: 600;
      color: #000; /* NÃO apagado mais */
    }
  }
`;

export const ProductImage = styled.div`
  background-image: ${(props) => `url('${props.imageUrl}')`};
  height: 380px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: flex-end;
  justify-content: center;

  transition: all 0.35s ease;

  cursor: pointer; /* ✅ cursor pointer */
  overflow: hidden; /* ✅ impede vazamento */

  button {
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s ease;
    margin: 20px;
    max-width: 90%;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    background-blend-mode: color;

    button {
      visibility: visible;
      opacity: 1;
    }
  }

  /* 📱 MOBILE GERAL */
  @media (max-width: 768px) {
    height: 300px;

    button {
      visibility: visible;
      opacity: 1;
      margin: 10px;
      width: auto; /* 👈 volta ao normal */
    }
  }

  /* 📱📱 TELAS MÉDIAS (onde geralmente tem 2 colunas) */
  @media (max-width: 768px) and (min-width: 480px) {
    button {
      width: clamp(140px, 80%, 220px);
    }
  }
`;
