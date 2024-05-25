import React, { useState } from "react";
import {
  StyledExpandButton,
  SidebarContainer,
  StyledTopDiv,
} from "./SideBar.style";
import { Search } from "../Search/Search";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <StyledTopDiv>
          <Search />
        </StyledTopDiv>
      </SidebarContainer>
      <StyledExpandButton
        isOpen={isOpen}
        onClick={handleButtonClick}
      ></StyledExpandButton>
    </>
  );
};
