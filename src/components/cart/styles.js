import styled from "styled-components";

export const CartContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: flex-end;

  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: all 0.3s ease;
`;

export const CartEscapeArea = styled.div`
  width: 100%;
`;

export const CartContent = styled.div`
  height: 100%;
  width: 420px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 85%;
  }
`;

/* HEADER */
export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

export const CartTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #111;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
`;

/* LISTA */
export const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const EmptyCart = styled.p`
  text-align: center;
  margin-top: 50px;
  color: #777;
`;

/* FOOTER */
export const CartFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #eee;
  background: #fff;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  margin-bottom: 15px;

  strong {
    font-size: 1.3rem;
    color: #000;
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #333;
  }
`;
