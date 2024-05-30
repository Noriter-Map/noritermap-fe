import React, { useEffect, useState, useRef, useCallback } from "react";
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
  StyledMyRegionText,
  StyledTextLine,
  StyledTextBoldStyle,
  StyledTextMediumStyle,
  StyledLineStyle,
  StyledLogo,
  StyledNoRating,
  StyledMyReginContainer,
  StyledMyRegionIcon,
} from "./SideBar.style";
import { Search } from "../Search/Search";
import {
  SearchFacility,
  SearchFacilityListResponses,
} from "../../types/SearchOption.type";
import RoNmIcon from "../../assets/RoNmIcon.svg";
import ClipBoard from "../../assets/ClipBoardIcon.svg";
import StarIcon from "../../assets/StarIcon.svg";
import NoResult from "../../assets/NoResult.svg";
import Logo from "../../assets/Logo.svg";
import MyRegionIcon from "../../assets/MyPositionIcon.svg";
import { PacmanLoader } from "react-spinners";
import { transformOptionsToQueryParams } from "../../hooks/useTransformQuery";
import { getFaciltySearch } from "../../apis/getFaciltySearch";
import { useRecoilState } from "recoil";
import { OptionState } from "../../recoil/OptionState";
import { getMyPosition } from "../../apis/getMyPosition";
import { useNavigate } from "react-router-dom";
import { Detail } from "../Detail/Detail";
import { SideBarState } from "../../recoil/SideBarState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchingCurLocation } from "../FetchingCurLocation/FetchingCurLocation";
import {parseInt} from "lodash";

interface SideBarProps {
  keyword?: string;
  pathFacilityId?: string;
  onMarkerClick: (facilityId: number) => void;
  setIsSideBarData: React.Dispatch<React.SetStateAction<any>>;
}

export const SideBar = ({
  keyword,
  pathFacilityId,
  onMarkerClick,
  setIsSideBarData,
}: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [sideBarData, setSideBarData] = useState<
    SearchFacilityListResponses | undefined
  >(undefined);
  const [sideBarSearchData, setSideBarSearchData] = useState<
    SearchFacilityListResponses | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCurrentLat, setIsCurrentLat] = useState<number | null>(null);
  const [isCurrentLng, setIsCurrentLng] = useState<number | null>(null);
  const [optionsState, setOptionsState] = useRecoilState(OptionState);
  const [isDefault, setIsDefault] = useState(true);
  const [isMyRegion, setIsMyRegion] = useState("");
  const [sideBarState, setSideBarState] = useRecoilState(SideBarState);
  const [selectedFacility, setSelectedFacility] =
    useState<SearchFacility | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const searchRef = useRef<{ handleSearch: (resetPage: boolean) => void }>(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleFacilityClick = (facility: SearchFacility) => {
    setSideBarState("detail");
    setSelectedFacility(facility);
    navigate(`/p/place/${facility.facilityId}`);
    onMarkerClick(facility.facilityId);
  };

  function formatDistance(distance: number): string {
    if (distance < 1000) {
      return `${Math.round(distance * 10) / 10} m`;
    } else {
      const kmDistance = distance / 1000;
      return `${Math.round(kmDistance * 100) / 100} km`;
    }
  }

  // 처음 나오는 데이터(나랑 제일 가까운 순으로)
  const fetchSideBarData = async (
    lat: number,
    lng: number,
    pageNumber: number,
    pathKeyword: string | undefined,
  ) => {
    const keyword = pathKeyword === undefined ? "" : pathKeyword;
    const curLatitude = lat.toString();
    const curLongitude = lng.toString();
    const size = 10;

    const queryParams = transformOptionsToQueryParams(
      optionsState,
      keyword,
      curLatitude,
      curLongitude,
      pageNumber,
      size
    );

    setLoading(true);
    setError(null);
    try {
      const response = await getFaciltySearch(queryParams);
      const myposition = await getMyPosition(lat, lng);
      setIsMyRegion(myposition);

      setSideBarData((prevData) => {
        if (prevData && pageNumber > 0) {
          return {
            ...response,
            data: {
              ...response.data,
              content: [...prevData.data.content, ...response.data.content],
            },
          };
        } else {
          return response;
        }
      });
      setIsSideBarData(response);
      setHasMore(!response.data.last);
    } catch (error) {
      console.error("Search Error:", error);
      setError("데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGeolocationSuccess = (pos: GeolocationPosition) => {
      const currentLat = pos.coords.latitude;
      const currentLng = pos.coords.longitude;
      setIsCurrentLat(currentLat);
      setIsCurrentLng(currentLng);
      fetchSideBarData(currentLat, currentLng, 0, keyword);
      setSideBarState("");
    };

    const handleGeolocationError = (err: GeolocationPositionError) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      const defaultLat = 35.160048;
      const defaultLng = 126.851309;
      setIsCurrentLat(defaultLat);
      setIsCurrentLng(defaultLng);
      fetchSideBarData(defaultLat, defaultLng, 0, keyword);
      setSideBarState("");
    };

    if (pathFacilityId === undefined && isOpen) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    }
  }, [isOpen]);

  const handleClickLogo = () => {
    if (isCurrentLat !== null && isCurrentLng !== null) {
      const initializeOptionsState = () => {
        setOptionsState({
          실내외구분: {},
          설치장소: {},
          민공구분: {},
        });
      };

      initializeOptionsState();

      fetchSideBarData(isCurrentLat, isCurrentLng, 0, keyword);
      setSideBarState("");
      navigate("/");
    }
  };

  function formatToOneDecimalPlace(number: number) {
    return number.toFixed(1);
  }

  const currentSideBarData =
    sideBarState === "search" ? sideBarSearchData : sideBarData;

  const lastFacilityElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (sideBarState === "search" && page > 0 && searchRef.current && pathFacilityId === undefined) {
      searchRef.current.handleSearch(false);
    }
  }, [page, sideBarState]);

  useEffect(() => {
    if (
      sideBarState !== "search" &&
      isCurrentLat !== null &&
      isCurrentLng !== null &&
        pathFacilityId === undefined
    ) {
      fetchSideBarData(isCurrentLat, isCurrentLng, page, keyword);
    }
  }, [page, sideBarState, isCurrentLat, isCurrentLng]);

  useEffect(() => {
    if (pathFacilityId !== undefined){
      setSelectedFacility({
        facilityId: parseInt(pathFacilityId),
        pfctNm: '',
        ronaAddr: '',
        lotnoAddr: '',
        instlPlaceCdNm: '',
        prvtPblcYnCdNm: '',
        idrodrCdNm: '',
        latCrtsVl: '',
        lotCrtsVl: '',
        rating: 0.0,
        reviewCnt: 0.0,
        distanceFromCur: 0.0,
      });
      setSideBarState("detail");

      if (isOpen === false){
        handleButtonClick();
      }
    }
  }, [pathFacilityId]);

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <StyledTopDiv>
          <StyledLogo src={Logo} onClick={handleClickLogo} />
          <Search
            setSideBarSearchData={setSideBarSearchData}
            setIsLoading={setLoading}
            setIsDefault={setIsDefault}
            setIsSideBarData={setIsSideBarData}
            ref={searchRef}
            pathKeyword={keyword}
          />
        </StyledTopDiv>
        {selectedFacility && sideBarState === "detail" ? (
          <Detail
            id={selectedFacility.facilityId}
            setSelectedFacility={setSelectedFacility}
          />
        ) : loading && page === 0 ? (
          <StyledLoadingContainer>
            <PacmanLoader
              color={"#F3F08F"}
              loading={loading}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </StyledLoadingContainer>
        ) : error ? (
          <StyledNoResultContainer>
            <StyledNoResult>{error}</StyledNoResult>
          </StyledNoResultContainer>
        ) : currentSideBarData &&
          currentSideBarData.data.content.length === 0 ? (
          <StyledNoResultContainer>
            <StyledNoResultImg src={NoResult} />
            <StyledNoResult>검색된 시설이 없습니다.</StyledNoResult>
          </StyledNoResultContainer>
        ) : (
          <StyledSearchResultContainer>
            {isDefault && (
              <StyledMyReginContainer>
                {currentSideBarData && (
                  <>
                    <StyledMyRegionIcon src={MyRegionIcon} />{" "}
                    <StyledMyRegionText>
                      현재 내 위치 : {isMyRegion}
                    </StyledMyRegionText>
                  </>
                )}
              </StyledMyReginContainer>
            )}
            {currentSideBarData && (
              <StyledTextLine>
                <StyledTextBoldStyle>내 주변</StyledTextBoldStyle>
                <StyledTextMediumStyle>놀이시설</StyledTextMediumStyle>
                <StyledLineStyle />
              </StyledTextLine>
            )}
            {currentSideBarData ? (
              currentSideBarData.data.content.map((facility, index) => {
                if (currentSideBarData.data.content.length === index + 1) {
                  const isLastElement =
                    currentSideBarData.data.content.length === index + 1;
                  const key = `${facility.pfctNm}-${index}`;
                  return (
                    <StyledSearchResultWrapper
                      ref={
                        isLastElement &&
                        currentSideBarData.data.content.length >= 10
                          ? lastFacilityElementRef
                          : null
                      }
                      key={key}
                    >
                      <StyledSearchResult>
                        <StyledFacilityTitle
                          onClick={() => handleFacilityClick(facility)}
                        >
                          {facility.pfctNm}
                        </StyledFacilityTitle>
                        <StyledDistLotAddrContainer>
                          <StyledFacilityDist>
                            {formatDistance(facility.distanceFromCur)}
                          </StyledFacilityDist>
                          <StyledStarReviewContainer>
                            <StyledStarIcon src={StarIcon} />
                            {facility.rating === 0 ? (
                              <StyledNoRating>정보 없음</StyledNoRating>
                            ) : (
                              <StyledRating>
                                {formatToOneDecimalPlace(facility.rating)}
                              </StyledRating>
                            )}
                            <StyledReviewCntText>
                              후기 ({facility.reviewCnt})
                            </StyledReviewCntText>
                          </StyledStarReviewContainer>
                        </StyledDistLotAddrContainer>
                        {facility.ronaAddr && (
                          <StyledRoNmContainer>
                            <StyledLoacationIcon src={RoNmIcon} />
                            <StyledRoNmAddr>{facility.ronaAddr}</StyledRoNmAddr>
                            <StyledClipBoardIcon
                              src={ClipBoard}
                              onClick={(event: React.MouseEvent) => {
                                event.stopPropagation();
                                navigator.clipboard.writeText(
                                  facility.ronaAddr
                                );
                                toast("주소가 복사되었습니다. ✨");
                                toast.clearWaitingQueue();
                              }}
                            />
                          </StyledRoNmContainer>
                        )}
                        <StyledKeywordContainer>
                          {facility.idrodrCdNm !== "undefined" && (
                            <StyledKeyword>{facility.idrodrCdNm}</StyledKeyword>
                          )}
                          <StyledKeyword>
                            {facility.instlPlaceCdNm}
                          </StyledKeyword>
                          <StyledKeyword>
                            {facility.prvtPblcYnCdNm}
                          </StyledKeyword>
                        </StyledKeywordContainer>
                      </StyledSearchResult>
                    </StyledSearchResultWrapper>
                  );
                } else {
                  return (
                    <StyledSearchResultWrapper key={facility.facilityId}>
                      <StyledSearchResult>
                        <StyledFacilityTitle
                          onClick={() => handleFacilityClick(facility)}
                        >
                          {facility.pfctNm}
                        </StyledFacilityTitle>
                        <StyledDistLotAddrContainer>
                          <StyledFacilityDist>
                            {formatDistance(facility.distanceFromCur)}
                          </StyledFacilityDist>
                          <StyledStarReviewContainer>
                            <StyledStarIcon src={StarIcon} />
                            {facility.rating === 0 ? (
                              <StyledNoRating>정보 없음</StyledNoRating>
                            ) : (
                              <StyledRating>
                                {formatToOneDecimalPlace(facility.rating)}
                              </StyledRating>
                            )}
                            <StyledReviewCntText>
                              후기 ({facility.reviewCnt})
                            </StyledReviewCntText>
                          </StyledStarReviewContainer>
                        </StyledDistLotAddrContainer>
                        {facility.ronaAddr && (
                          <StyledRoNmContainer>
                            <StyledLoacationIcon src={RoNmIcon} />
                            <StyledRoNmAddr>{facility.ronaAddr}</StyledRoNmAddr>
                            <StyledClipBoardIcon
                              src={ClipBoard}
                              onClick={(event: React.MouseEvent) => {
                                event.stopPropagation();
                                navigator.clipboard.writeText(
                                  facility.ronaAddr
                                );
                                toast("주소가 복사되었습니다. ✨");
                                toast.clearWaitingQueue();
                              }}
                            />
                          </StyledRoNmContainer>
                        )}
                        <StyledKeywordContainer>
                          {facility.idrodrCdNm !== "undefined" && (
                            <StyledKeyword>{facility.idrodrCdNm}</StyledKeyword>
                          )}
                          <StyledKeyword>
                            {facility.instlPlaceCdNm}
                          </StyledKeyword>
                          <StyledKeyword>
                            {facility.prvtPblcYnCdNm}
                          </StyledKeyword>
                        </StyledKeywordContainer>
                      </StyledSearchResult>
                    </StyledSearchResultWrapper>
                  );
                }
              })
            ) : (
              <FetchingCurLocation></FetchingCurLocation>
            )}
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
