import styled from "styled-components";

export const StyledAccordionContainer = styled.div`
  margin: 0 auto;
  width: 410px;
  height: fit-content;
  border-radius: 12px;
  background: #efefef;
  /* border: 1px solid ; */
  margin-top: 24px;
  padding-left: 1.12rem;
  padding-top: 0.69rem;
  padding-right: 1.25rem;
  padding-bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.31rem;
`;

export const StyledAccordionHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5.45rem;
  cursor: pointer;
`;

export const StyledAccordionHeaderWrapper = styled.div`
  width: 280px;
  display: flex;
  flex-direction: row;
  gap: 130px;
  margin-left: 170px;
`;

export const StyledAccordionHeader = styled.div`
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 800;
`;

interface ArrowProps {
  isAccordionOpen: boolean;
}

export const StyledArrowIcon = styled.img<ArrowProps>`
  width: 10px;
  transform: ${({ isAccordionOpen }) =>
    isAccordionOpen ? "rotate(270deg)" : "rotate(90deg)"};
  transition: transform 0.3s ease;
`;

export const StyledAccordionContent = styled.div<{ isOpen: boolean }>`
  width: 90%;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  margin-left: 0.5rem;
  word-break: keep-all;

  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;
