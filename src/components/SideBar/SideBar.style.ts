import styled from "styled-components";
import commonImage from "../../assets/common.png";

export const StyledExpandButton = styled.button<{ isOpen: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ isOpen }) => (isOpen ? "487px" : "0")};
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
  background-position: ${({ isOpen }) =>
    isOpen ? "-23px -261px" : "-69px -261px"};
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
    background-position: ${({ isOpen }) =>
      isOpen ? "0px -261px" : "-46px -261px"};
  }
`;

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-487px")};
  width: 487px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 9;
  overflow-y: scroll;
`;

export const StyledTopDiv = styled.div`
  background: #f3f08d;
  width: 100%;
  height: fit-content;
  padding-bottom: 22px;
  border-bottom: 1px solid #e0e0e0;
`;

export const StyledLogo = styled.img`
  width: 200px;
  position: absolute;
  margin-left: 60px;
  margin-top: 18px;
  cursor: pointer;
  scale: 1.4;
`;

export const StyledMyReginContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  margin-top: 20px;
  margin-left: 24px;
  align-items: center;
`;

export const StyledMyRegionIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const StyledMyRegionText = styled.div`
  font-size: 18px;
  transform: translateY(6%);
  font-weight: 600;
  color: #000000;
  margin-left: -3px;
`;

export const StyledLoadingContainer = styled.div`
  text-align: center;
  margin-top: 300px;
  margin-left: 150px;
`;

export const StyledNoResultContainer = styled.div`
  margin-top: 300px;
  text-align: center;
`;

export const StyledNoResultImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 18px;
`;

export const StyledNoResult = styled.div`
  font-size: 24px;
  color: #9d9d9d;
  font-weight: 500;
`;

export const StyledSearchResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledSearchResult = styled.div`
  margin-top: 18px;
  margin-left: 24px;
  margin-bottom: 16px;
  overflow: hidden;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledSearchResultWrapper = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent 3%,
      rgb(0, 0, 0, 0.25) 3%,
      rgb(0, 0, 0, 0.25) 97%,
      transparent 97%
    );
  }
`;

export const StyledFacilityTitle = styled.div`
  color: #0951b6;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

export const StyledDistLotAddrContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const StyledFacilityDist = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1c;
  margin-left: 2px;
`;

export const StyledLotNumAddr = styled.div`
  font-size: 18px;
  color: #000000;
  font-weight: 500;
`;

export const StyledRoNmAddr = styled.div`
  width: fit-content;
  font-size: 16px;
  color: #000000;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledRoNmContainer = styled.div`
  width: 425px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const StyledLoacationIcon = styled.img`
  width: 27px;
  height: 27px;
`;

export const StyledClipBoardIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 3px;
  cursor: pointer;
`;

export const StyledStarReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

export const StyledNoRating = styled.div`
  color: #f65751;
  font-size: 15px;
  font-weight: 400;
  padding-top: 3px;
`;

export const StyledStarIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const StyledRating = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #f65751;
`;

export const StyledReviewCntText = styled.div`
  margin-left: 2px;
  padding-top: 4px;
  font-size: 15px;
  color: #3b3b3b;
  font-weight: 400;
`;

export const StyledKeywordContainer = styled.div`
  margin-top: 1px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  gap: 14px;
`;

export const StyledKeyword = styled.div`
  width: fit-content;
  padding-left: 16px;
  padding-top: 6px;
  padding-right: 16px;
  padding-bottom: 7px;
  border-radius: 25px;
  border: 1px solid #9d9d9d;
  background-color: #ffffff;
  font-size: 16px;
`;

export const StyledTextLine = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  padding-top: 16px;
`;

export const StyledTextBoldStyle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #000000;
`;

export const StyledTextMediumStyle = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #000000;
`;

export const StyledLineStyle = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #d3d3d3;
  margin-left: 4px;
`;
