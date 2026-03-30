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
  gap: 6px;
  margin-top: 10px;
  padding: 10px 5px;

  /* Nome do produto */
  p:first-child {
    font-size: 0.95rem;
    font-weight: 500;
    color: #444;
    line-height: 1.3;

    /* Limita o nome a 2 linhas */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Preço */
  p:last-child {
    font-size: 1.2rem;
    font-weight: 700;
    color: #111;

    /* deixa o R$ menor que o valor */
    span {
      font-size: 0.9rem;
      font-weight: 500;
      margin-right: 2px;
      color: #666;
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
