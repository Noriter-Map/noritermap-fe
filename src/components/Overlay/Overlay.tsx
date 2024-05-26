import React from "react";
import {
  CustomOverlay,
  Title,
  Rating,
  RatingValue,
  Stars,
  ReviewCount,
  Address,
  Details,
  HiddenId,
  CustomOverlayContainer,
} from "./Overlay.style";

interface OverlayProps {
  facility_id: string;
  pfct_nm: string;
  rating: number;
  reviewCnt: number;
  addr: string;
  zip: string;
}

export const Overlay = ({
  facility_id,
  pfct_nm,
  rating,
  reviewCnt,
  addr,
  zip,
}: OverlayProps) => {
  const stars = "★★★★★".slice(0, Math.round(rating)); // 별점 개수 계산

  return (
    <CustomOverlayContainer>
      <CustomOverlay>
        <HiddenId>{facility_id}</HiddenId>
        <Title>{pfct_nm}</Title>
        <Rating>
          <RatingValue>{rating}</RatingValue>
          <Stars>{stars}</Stars>
          <ReviewCount>({reviewCnt}건)</ReviewCount>
        </Rating>
        <Address>
          {addr}
          <br />
          (우) {zip}
        </Address>
        <Details>
          <a href="#">상세보기</a> · <a href="#">정보 수정 제안</a>
        </Details>
      </CustomOverlay>
    </CustomOverlayContainer>
  );
};
