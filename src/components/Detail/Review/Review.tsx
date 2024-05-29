import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FacilityInfoRight } from "../../../types/SearchOption.type";
import StarRating from "../../StarRating/StarRating";
import {
  StyledContainer,
  StyledGoWriteReviewContainer,
  StyledGoWriteReviewText,
  StyledPenIcon,
  StyledTotalContainer,
  StyledTotalRatingStarContainer,
  StyledTotalReview,
  StyledTotalText,
  StyledReviewContainer,
  StyledStarContainer,
  Star,
  StyledNickname,
  StyledReviewFlex,
  StyledStarCommentContainer,
  StyledReviewComment,
  StyledWriteWrapper,
  StyledWriteFlex,
  StyledWriteBoldText,
  StyledNicknameInput,
  StyledTextArea,
  StyledSubmutBtn,
} from "./Review.style";
import { getFcInfoRight } from "../../../apis/getFcInfoRight";
import { StyledLoadingContainer } from "../DetailInfoTab/DetailInfoTab.style";
import { BeatLoader } from "react-spinners";
import PenIcon from "../../../assets/Pen.svg";
import ViewIcon from "../../../assets/ViewIcon.svg";
import { AiAccordion } from "./AiAccordion/AiAccordion";
import { postReview } from "../../../apis/postReview";

interface DetailRightInfoProps {
  id: number;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
}

export const Review = ({ id, setIsUpdate }: DetailRightInfoProps) => {
  const [isReviewData, setIsReviewData] = useState<FacilityInfoRight>();
  const [loading, setLoading] = useState(true);
  const [isWrite, setIsWrite] = useState(true);
  const [score, setScore] = useState(1);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setIsUpdate(false);
    const fetchData = async () => {
      try {
        const response = await getFcInfoRight(id);
        console.log(response);
        setIsReviewData(response);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleClickGoReview = () => {
    setIsWrite(!isWrite);
  };

  const handleStarClick = (rating: number) => {
    setScore(rating);
  };

  const isSubmitDisabled = !nickname || !content;

  const handleSubmit = async () => {
    try {
      await postReview(id, nickname, content, score);
      setNickname("");
      setContent("");
      setScore(1);
      setIsWrite(true);
      const fetchData = async () => {
        try {
          const response = await getFcInfoRight(id);
          console.log(response);
          setIsReviewData(response);
          setIsUpdate(true);
        } catch (error) {
          console.error("Search Error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      alert("소중한 의견 감사합니다.");
    } catch (error) {
      console.error("리뷰 제출 실패:", error);
      alert("리뷰 제출에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <StyledContainer>
      {isReviewData ? (
        <>
          <StyledGoWriteReviewContainer onClick={handleClickGoReview}>
            <StyledPenIcon src={isWrite ? PenIcon : ViewIcon} />
            <StyledGoWriteReviewText>
              {isWrite ? "리뷰 쓰기" : "리뷰 보기"}
            </StyledGoWriteReviewText>
          </StyledGoWriteReviewContainer>
          {isWrite ? (
            <>
              <StyledTotalRatingStarContainer>
                <StyledTotalContainer>
                  <StyledTotalText>전체</StyledTotalText>
                  <StyledTotalReview>
                    {isReviewData.data.reviewCnt}
                  </StyledTotalReview>
                </StyledTotalContainer>
                <StarRating ratingAvg={isReviewData.data.ratingAvg} />
              </StyledTotalRatingStarContainer>
              <AiAccordion isReviewData={isReviewData} />
              {isReviewData.data.reviews.map((review, index) => (
                <StyledReviewContainer key={index}>
                  <StyledReviewFlex>
                    <StyledNickname>{review.nickname}</StyledNickname>
                    <StyledStarCommentContainer>
                      <StyledStarContainer>
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            filled={starIndex < review.rating}
                          />
                        ))}
                      </StyledStarContainer>
                      <StyledReviewComment>
                        {review.content}
                      </StyledReviewComment>
                    </StyledStarCommentContainer>
                  </StyledReviewFlex>
                </StyledReviewContainer>
              ))}
            </>
          ) : (
            <StyledWriteWrapper>
              <StyledWriteFlex>
                <StyledWriteBoldText>닉네임</StyledWriteBoldText>
                <StyledNicknameInput
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </StyledWriteFlex>
              <StyledWriteFlex>
                <StyledWriteBoldText>별점</StyledWriteBoldText>
                <StyledStarContainer>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      filled={index < score}
                      isPost={true}
                      onClick={() => handleStarClick(index + 1)}
                    />
                  ))}
                </StyledStarContainer>
              </StyledWriteFlex>
              <StyledWriteFlex>
                <StyledWriteBoldText>한 마디</StyledWriteBoldText>
                <StyledTextArea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </StyledWriteFlex>
              <StyledSubmutBtn
                disabled={isSubmitDisabled}
                onClick={handleSubmit}
              >
                제출하기
              </StyledSubmutBtn>
            </StyledWriteWrapper>
          )}
        </>
      ) : (
        <StyledLoadingContainer>
          <BeatLoader
            color={"#FFDD00"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </StyledLoadingContainer>
      )}
    </StyledContainer>
  );
};

export default Review;
