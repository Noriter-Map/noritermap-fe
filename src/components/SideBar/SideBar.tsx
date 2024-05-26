import React, { useState } from "react";
import {
  StyledExpandButton,
  SidebarContainer,
  StyledTopDiv,
  StyledSearchResultContainer,
  StyledSearchResult,
  StyledFacilityTitle,
  StyledDistLotAddrContainer,
  StyledFacilityDist,
  StyledRoNmContainer,
  StyledRoNmAddr,
  StyledLoacationIcon,
  StyledClipBoardIcon,
  StyledStarReviewContainer,
  StyledStarIcon,
  StyledRating,
  StyledReviewCntText,
  StyledKeywordContainer,
  StyledKeyword,
  StyledSearchResultWrapper,
  StyledNoResult,
  StyledNoResultContainer,
  StyledNoResultImg,
  StyledLoadingContainer,
} from "./SideBar.style";
import { Search } from "../Search/Search";
import { SearchFacilityListResponses } from "../../types/SearchOption.type";
import RoNmIcon from "../../assets/RoNmIcon.svg";
import ClipBoard from "../../assets/ClipBoardIcon.svg";
import StarIcon from "../../assets/StarIcon.svg";
import NoResult from "../../assets/NoResult.svg";
import { PacmanLoader } from "react-spinners";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sideBarData, setSideBarData] = useState<
    SearchFacilityListResponses | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  function formatDistance(distance: number): string {
    if (distance < 1000) {
      return `${Math.round(distance * 10) / 10} m`;
    } else {
      const kmDistance = distance / 1000;
      return `${Math.round(kmDistance * 100) / 100} km`;
    }
  }

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <StyledTopDiv>
          <Search setSideBarData={setSideBarData} setIsLoading={setLoading} />
        </StyledTopDiv>
        {loading ? (
          <StyledLoadingContainer>
            <PacmanLoader
              color={"#FFDD00"}
              loading={loading}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </StyledLoadingContainer>
        ) : sideBarData && sideBarData.data.content.length === 0 ? (
          <StyledNoResultContainer>
            <StyledNoResultImg src={NoResult} />
            <StyledNoResult>검색된 시설이 없습니다.</StyledNoResult>
          </StyledNoResultContainer>
        ) : (
          <StyledSearchResultContainer>
            {sideBarData?.data.content.map((facility) => (
              <StyledSearchResultWrapper>
                <StyledSearchResult key={facility.facilityId}>
                  <StyledFacilityTitle>{facility.pfctNm}</StyledFacilityTitle>
                  <StyledDistLotAddrContainer>
                    <StyledFacilityDist>
                      {formatDistance(facility.distanceFromCur)}
                    </StyledFacilityDist>
                    <StyledStarReviewContainer>
                      <StyledStarIcon src={StarIcon} />
                      <StyledRating>{facility.rating}</StyledRating>
                      <StyledReviewCntText>
                        후기 ({facility.reviewCnt})
                      </StyledReviewCntText>
                    </StyledStarReviewContainer>
                  </StyledDistLotAddrContainer>
                  {facility.ronaAddr && (
                    <StyledRoNmContainer>
                      <StyledLoacationIcon src={RoNmIcon} />
                      <StyledRoNmAddr>{facility.ronaAddr}</StyledRoNmAddr>
                      <StyledClipBoardIcon src={ClipBoard} />
                    </StyledRoNmContainer>
                  )}
                  <StyledKeywordContainer>
                    {facility.idrodrCdNm !== "undefined" && (
                      <StyledKeyword>{facility.idrodrCdNm}</StyledKeyword>
                    )}
                    <StyledKeyword>{facility.instlPlaceCdNm}</StyledKeyword>
                    <StyledKeyword>{facility.prvtPblcYnCdNm}</StyledKeyword>
                  </StyledKeywordContainer>
                </StyledSearchResult>
              </StyledSearchResultWrapper>
            ))}
          </StyledSearchResultContainer>
        )}
      </SidebarContainer>
      <StyledExpandButton
        isOpen={isOpen}
        onClick={handleButtonClick}
      ></StyledExpandButton>
    </>
  );
};
