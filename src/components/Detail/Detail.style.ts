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
  z-index: 9999;
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  margin-left: 10px;
  margin-top: 10px;
`;

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
