import styled from "styled-components";

export const StyledTabMenu = styled.ul`
  background-color: #ffffff;
  color: #9d9d9d;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  position: relative;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #d3d3d3;
  height: 44px;

  .submenu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 2);
    padding: 10px;
    font-size: 17px;
    cursor: pointer;
    transition: color 0.5s;
    position: relative;
  }

  .focused {
    background-color: #ffffff;
    color: #151414;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% / 2);
    height: 3px;
    background-color: #151414;
    transition: left 0.3s;
  }

  &.focused-tab-0::after {
    left: 0;
  }

  &.focused-tab-1::after {
    left: calc(100% / 2);
  }

  & div.desc {
    text-align: center;
  }
`;

export const StyledDesc = styled.div`
  text-align: center;
`;

export const StyledBack = styled.img`
  z-index: 1;
  width: 36px;
  height: 32px;
  cursor: pointer;
  position: absolute;
  margin-left: 6px;
  margin-top: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  
    transition: scale 0.2s ease;
    &:hover {
    scale: 1.1;
  } 
`;

export const StyledShare = styled.img`
  z-index: 1;
  width: 23px;
  height: 25px;
  color: white;
  cursor: pointer;
  position: absolute;
  margin-top: 8px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  right: 8px;
  
  transition: scale 0.2s ease;
  &:hover {
    scale: 1.05;
  } 
`

export const StyledTopWrapper = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #ffffff;
  padding-bottom: 24px;
  border-bottom: 1px solid #d3d3d3;
`;

export const StyledTopContainer = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  padding-right: 24px;
  width: 439px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledTopTitleContainer = styled.div`
  width: 439px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: fit-content;
  flex-wrap: wrap;
`;

export const StyledTopTitle = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
`;

export const StyledTopCategory = styled.div`
  color: #808080;
  font-size: 16px;
  font-weight: 400;
  align-self: flex-end;
  flex-grow: 0;
  flex-shrink: 0;
`;

export const StyledShareModalContainer = styled.div`
  z-index: 3;
  position: absolute;
  transform: translate(35%, 43%);
  width: 70%;
  height: 10%;
  background-color: #f6f8f9;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25); 
`;

export const StyledShareModalTitle = styled.div`
  font-size: 1em;
  font-weight: 700;
  display: flex;
    justify-content: center; 
    align-items: center;     
    height: 34%;       
    padding-top: 2.5%;
`;

export const StyledDeleteButton =  styled.img`
  position: absolute;
  cursor: pointer;   
  width: 14px;
  height: 14px;
  transform: translate(2200%, -200%);
`;

export const StyledUrlCopyWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 90%;
    height: 35%;
    margin: auto;
    margin-top: 2%;
    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
`;

export const StyledUrlTextBox = styled.div`
    display: flex;
    align-items: center;     /* 수직 가운데 정렬 */
    font-size: 0.8em;
    color: #1e80f0;
    margin: 0;
    width: 85%;
    height: 100%;
    padding-left: 3%;
    background-color: #ffffff;
    border-radius: 7px 0px 0px 7px;
`;

export const StyledCopyTextBox = styled.div`
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center;     /* 수직 가운데 정렬 */
    margin: 0;
    width: 15%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 0.8em;
    border-radius: 0px 7px 7px 0px;
`;