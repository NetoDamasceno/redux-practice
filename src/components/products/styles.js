import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: transparent;
`;

