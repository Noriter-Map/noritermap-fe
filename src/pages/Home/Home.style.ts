import styled from "styled-components";

export const StyledMapContainer = styled.div`
  width: 100%;
  height: 120vh;
  position: relative;
  overflow: hidden;
`;

export const StyledGoCurrentImg = styled.img`
  position: absolute;
  z-index: 9999;
  right: 4px;
  top: 230px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;
