import styled from "styled-components";

export const StyledMapContainer = styled.div`
  width: 100%;
  height: 120vh;
  position: relative;
  overflow: hidden;
`;

export const StyledGoCurrentImg = styled.img`
  position: absolute;
  z-index: 9990;
  right: 4px;
  top: 230px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const StyledGettingCurLocationContainer = styled.div`
  position: fixed; /* 화면 전체를 기준으로 절대 위치 */
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
  text-align: center; 
`;

export const StyledGettingCurLocationBox = styled.img`
  width: 10%;
  height: auto;
`;

export const StyledGettingCurLocationText = styled.div`
  font-size: 1.5em;
  font-weight: 450;
`;