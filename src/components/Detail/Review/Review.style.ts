import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom: 50px;
`;

export const StyledTotalRatingStarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 24px;
  margin-top: 24px;
`;

export const StyledTotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const StyledTotalText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #101010;
`;

export const StyledTotalReview = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2d69af;
`;

export const StyledGoWriteReviewContainer = styled.div`
  position: absolute;
  right: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;

export const StyledPenIcon = styled.img`
  width: 24px;
`;

export const StyledGoWriteReviewText = styled.div`
  color: #2d69af;
  font-size: 16px;
  font-weight: 800;
`;

export const StyledReviewContainer = styled.div`
  margin-top: 24px;
  border-top: 0.2px solid #d9d9d9;
`;

export const StyledReviewWrapper = styled.div`
  width: 100%;
  border-bottom: 0.2px solid #d9d9d9;
  background-color: #ffffff;
`;

export const StyledReviewFlex = styled.div`
  margin-left: 24px;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

export const StyledNickname = styled.div`
  width: 80px;
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  word-break: break-all;
`;

export const StyledStarCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface StarProps {
  filled: boolean;
  isPost?: boolean;
}

export const StyledStarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
`;

export const Star = styled.div<StarProps>`
  width: ${(props) => (props.isPost ? "24px" : "18px")};
  height: ${(props) => (props.isPost ? "24px" : "18px")};
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
  cursor: pointer;
`;

export const StyledReviewComment = styled.div`
  width: 300px;
  height: fit-content;
  color: #000000;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  word-break: break-all;
`;

export const StyledWriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  margin-top: 64px;
  margin-left: 24px;
`;

export const StyledWriteBoldText = styled.div`
  width: 60px;
  font-size: 18px;
  font-weight: 700;
  color: #000000;
`;

export const StyledNicknameInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #b6b6b6;

  &:focus {
    outline: none;
  }
`;

export const StyledWriteFlex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 26px;
`;

export const StyledTextArea = styled.textarea`
  width: 315px;
  height: 115px;
  border-radius: 5px;
  border: 1px solid #b6b6b6;
  resize: none;
  &:focus {
    outline: none;
  }
  padding: 20px;
  font-size: 16px;
`;

export const StyledSubmutBtn = styled.button`
  margin-left: 84px;
  width: 317px;
  height: 45px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  color: #000000;
  background-color: #f3f08d;
  cursor: pointer;

  &:disabled {
    color: #ffffff;
    background-color: #cecece;
    cursor: not-allowed;
  }
`;
