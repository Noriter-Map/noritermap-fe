import React, { useState } from 'react';
import { StyledExpandButton, SidebarContainer } from './SideBar.style';

export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <SidebarContainer isOpen={isOpen}>
                {/* 메뉴 내용은 나중에 채울 것입니다 */}
            </SidebarContainer>
            <StyledExpandButton isOpen={isOpen} onClick={handleButtonClick}></StyledExpandButton>
        </>
    );
}
