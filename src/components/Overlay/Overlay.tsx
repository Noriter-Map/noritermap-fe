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
  const stars = "★★★★★".slice(0, Math.round(rating));

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
          <div>상세보기</div> · <div>정보 수정 제안</div>
        </Details>
      </CustomOverlay>
    </CustomOverlayContainer>
  );
};
