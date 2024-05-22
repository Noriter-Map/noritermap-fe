import styled from 'styled-components';
import commonImage from '../../assets/common.png';

export const StyledExpandButton = styled.button<{ isOpen: boolean }>`
    position: absolute;
    top: 50%;
    left: ${({ isOpen }) => (isOpen ? '400px' : '0')};
    transform: translateY(-50%);
    z-index: 10;
    overflow: hidden;
    display: inline-block;
    font-size: 1px;
    line-height: 1px;
    color: transparent;
    vertical-align: top;
    background-image: url(${commonImage});
    background-size: 413px 384px;
    background-position: ${({ isOpen }) => (isOpen ? '-23px -261px' : '-69px -261px')};
    width: 22px;
    height: 49px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0; 
    background-color: white;
    cursor: pointer;
    transition: left 0.3s ease;

    &:hover {
        background-position: ${({ isOpen }) => (isOpen ? '0px -261px' : '-46px -261px')};
    }
`;

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-400px')};
    width: 400px;
    height: 100%;
    background-color: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease;
    z-index: 9;
`;
