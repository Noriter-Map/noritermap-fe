import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const StyledRatingText = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #f65751;
`;

export const StyledStarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
`;

interface StarProps {
  filled: boolean;
}

export const Star = styled.div<StarProps>`
  width: 24px;
  height: 24px;
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

export const HalfStar = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(to right, #ff6863 50%, #e0e0e0 50%);
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
