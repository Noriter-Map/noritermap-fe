import styled from "styled-components";
import Right from "../../assets/Right_Arrow.png";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledSearchBarWrapper = styled.div`
  margin-top: 75px;
  position: relative;
  width: 430px;
  height: 65px;
`;

export const StyledSearchBar = styled.input`
  padding-right: 54px;
  width: 350px;
  height: 65px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #c9c9c9;
  font-size: 20px;
  color: #000000;
  line-height: 44px;
  padding-left: 24px;

  &::placeholder {
    color: rgb(156, 156, 156);
  }

  &:focus {
    outline: none;
    &::placeholder {
      color: rgb(216, 216, 216);
    }
  }
`;

export const StyledSearchIcon = styled.img`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-43%);
  width: 42px;
  height: auto;
  
  transition: scale 0.2s ease;
  &:hover {
    scale: 1.1;
  }
  cursor: pointer;
`;

export const StyledSearchOptionContainer = styled.div`
  z-index: 3;
  position: absolute;
  top: 150px;
  width: 427px;
  height: 516px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const StyledSearchOptionDeleteButton = styled.img`
  position: absolute;
  cursor: pointer;   
  width: 16px;
  height: 16px;
  right: 5%;
  top: 4.2%;
  
  transition: scale 0.1s ease;
  &:hover {
    scale: 1.1;
  }
`;

export const StyledOptionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const StyledOptionSubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 14px;
`;

export const StyledOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-top: 24px;
  margin-left: 28px;
`;

export const UnderlinedChar = styled.span`
  z-index: 0;
  position: relative;
  width: 375px;
  height: 1px;
  background-color: #bcafaf;
`;

export const StyledCheckBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1px;
`;

export const StyledCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
  align-items: center;
`;

export const StyledCheckBoxCustom = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    background: #f3f08f;
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

export const StyledLabelText = styled.label`
  padding-left: 8px;
`;

export const StyledChipContainer = styled.div`
  margin-top: 20px;
  width: 400px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  -webkit-scrollbar: no-button;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledChip = styled.div`
  width: fit-content;
  height: 14px;
  padding: 10px 10px 12px 10px;
  background-color: white;
  border-radius: 10px;
  white-space: nowrap;
  text-align: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;

export const ButtonLeft = styled.div`
  position: absolute;
  top: 160px;
  left: 0;
  height: 25px;
  width: 25px;
  background-image: url(${Right});
  background-repeat: no-repeat;
  transform: scale(-1, 1);
  background-size: contain;
  cursor: pointer;
`;

export const ButtonRight = styled.div`
  position: absolute;
  top: 160px;
  right: 0;
  height: 25px;
  width: 25px;
  background-image: url(${Right});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
`;
