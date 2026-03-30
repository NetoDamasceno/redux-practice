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
  justify-content: space-between;
  margin-top: 5px;

  p {
    font-size: 1rem;
    font-weight: 500;
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
      width: 90%; /* 👈 só aqui fica "grosso" */
    }
  }
`;
