import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
  padding: 20px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
`;

export const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  display: inline-block;

  cursor: pointer;

  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  /* cor base */
  color: #111827;

  /* 🔥 hover moderno */
  &:hover {
    transform: scale(1.05);
    color: #f97316; /* laranja (teu tema) */
  }

  /* 🔥 click (feedback físico) */
  &:active {
    transform: scale(0.98);
  }

  /* 🔥 underline premium animado */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;

    width: 0%;
    height: 2px;

    background: linear-gradient(90deg, #f97316, #fb923c);

    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* 🔥 substitui margin hack */

  div {
    font-weight: 500;

    &:hover {
      cursor: pointer;
    }
  }
`;
