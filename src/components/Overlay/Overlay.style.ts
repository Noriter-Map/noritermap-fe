import styled from "styled-components";

export const CustomOverlayContainer = styled.div`
  position: relative;
  pointer-events: none;
`;

export const CustomOverlay = styled.div`
  width: 280px;
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-family: "Pretendard Variable", Pretendard, Arial, sans-serif;
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: auto;
  cursor: pointer;
`;

export const Title = styled.div`
  display: block;
  line-height: 1.5;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Rating = styled.div`
  font-size: 14px;
  color: #ff6863;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px;
`;

export const RatingValue = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export const Stars = styled.span`
  color: #ff6863;
  margin-right: 5px;
`;

export const ReviewCount = styled.span`
  color: #666;
  padding-left: 4px;
`;

export const Address = styled.div`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PhoneNumber = styled.div`
  font-size: 14px;
  color: #008000;
  margin-bottom: 10px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const HiddenId = styled.div`
  display: none;
`;

export const StyledStarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface StarProps {
  filled: boolean;
}

export const Star = styled.div<StarProps>`
  width: 16px;
  height: 16px;
  background: ${({ filled }) => (filled ? "#ff6863" : "#e0e0e0")};
  clip-path: polygon(
    50% 0%,
    63% 38%,
    100% 38%,
    69% 59%,
    82% 100%,
    50% 75%,
    18% 100%,
    31% 59%,
    0% 38%,
    37% 38%
  );
  margin-right: 2px;
`;

export const StyledGoDetail = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #213b76;
  pointer-events: auto;
`;
