import React, { useEffect, useState } from "react";
import {
  CustomOverlay,
  Title,
  Rating,
  RatingValue,
  ReviewCount,
  Address,
  Details,
  HiddenId,
  CustomOverlayContainer,
  StyledStarContainer,
  Star,
  StyledGoDetail,
} from "./Overlay.style";
import { getReviewData } from "../../apis/getReviewData";
import { OverlayReviewResponses } from "../../types/Map.type";

interface OverlayProps {
  facility_id: string;
  pfct_nm: string;
  rating: number;
  reviewCnt: number;
  addr: string;
  zip: string;
  onDetailClick: (facility_id: string) => void;
}

export const Overlay = ({
  facility_id,
  pfct_nm,
  rating,
  reviewCnt,
  addr,
  zip,
  onDetailClick,
}: OverlayProps) => {
  const [OverlayData, setOverlayData] = useState<{
    facilityId: number;
    rating: number;
    reviewCnt: number;
  }>();

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const reviewData = await getReviewData(facility_id);
        setOverlayData(reviewData);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, [facility_id]);

  return (
    <CustomOverlayContainer>
      {OverlayData && (
        <CustomOverlay>
          <HiddenId>{facility_id}</HiddenId>
          <Title>{pfct_nm}</Title>
          <Rating>
            <RatingValue>{OverlayData.rating}</RatingValue>
            <StyledStarContainer>
              {[...Array(5)].map((_, starIndex) => (
                <Star key={starIndex} filled={starIndex < OverlayData.rating} />
              ))}
            </StyledStarContainer>
            <ReviewCount>({OverlayData.reviewCnt}건)</ReviewCount>
          </Rating>
          <Address>{addr}</Address>
          <Details>
            <StyledGoDetail onClick={() => onDetailClick(facility_id)}>
              상세보기
            </StyledGoDetail>
            <StyledGoDetail> · </StyledGoDetail>
            <StyledGoDetail
              onClick={() => {
                alert("열심히 준비 중이에요!");
              }}
            >
              정보 수정 제안
            </StyledGoDetail>
          </Details>
        </CustomOverlay>
      )}
    </CustomOverlayContainer>
  );
};
