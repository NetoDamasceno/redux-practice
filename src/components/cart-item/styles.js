import styled from "styled-components";

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  p,
  svg {
    color: #222222;
  }
`;

export const CartItemImage = styled.img`
  height: 120px;
  width: 90px;
  object-fit: cover;
  border-radius: 10px;

  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  flex: 1;

  p:nth-child(1) {
    font-weight: 600;
    margin-bottom: 5px;
  }

  p:nth-child(2) {
    font-weight: 500;
  }
`;

export const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  p {
    margin: 0 10px;
  }

  svg {
    cursor: pointer;
    transition: 0.2s;
  }

  svg:hover {
    transform: scale(1.2);
  }
`;

export const RemoveButton = styled.div`
  margin-right: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: red;
    transform: scale(1.2);
  }
`;
