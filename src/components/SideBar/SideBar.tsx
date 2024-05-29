import React, { useEffect, useState } from "react";
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

interface SideBarProps {
  keyword?: string;
  facilityId?: string;
  onMarkerClick: (facilityId: number) => void;
  setIsSideBarData: React.Dispatch<React.SetStateAction<any>>;
}

export const SideBar = ({
  keyword,
  facilityId,
  onMarkerClick,
  setIsSideBarData,
}: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [sideBarData, setSideBarData] = useState<
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
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleFacilityClick = (facility: SearchFacility) => {
    setSelectedFacility(facility);
    navigate(`/p/place/${facility.facilityId}`);
    setSideBarState("detail");
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

  const fetchSideBarData = async (lat: number, lng: number) => {
    const keyword = "";
    const curLatitude = lat.toString();
    const curLongitude = lng.toString();
    const page = 0;
    const size = 10;

    const queryParams = transformOptionsToQueryParams(
      optionsState,
      keyword,
      curLatitude,
      curLongitude,
      page,
      size
    );

    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await getFaciltySearch(queryParams);
      const myposition = await getMyPosition(lat, lng);
      setIsMyRegion(myposition);
      console.log(response);
      setSideBarData(response);
      setIsSideBarData(response);
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
      fetchSideBarData(currentLat, currentLng);
    };

    const handleGeolocationError = (err: GeolocationPositionError) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      const defaultLat = 35.160048;
      const defaultLng = 126.851309;
      setIsCurrentLat(defaultLat);
      setIsCurrentLng(defaultLng);
      fetchSideBarData(defaultLat, defaultLng);
    };

    if (isOpen) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;

      if (currentPath.includes("/p/place/")) {
        const id = currentPath.split("/").pop();
        if (id) {
          setSelectedFacility({
            ...selectedFacility,
            facilityId: Number(id),
          } as SearchFacility);
          setSideBarState("detail");
        }
      } else if (currentPath.includes("/search/")) {
        setSideBarState("");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedFacility]);

  const handleClickLogo = () => {
    if (isCurrentLat !== null && isCurrentLng !== null) {
      const initializeOptionsState = () => {
        setOptionsState({
          실내외: {},
          설치장소: {},
          민공구분: {},
        });
      };

      initializeOptionsState();

      fetchSideBarData(isCurrentLat, isCurrentLng);
      setSideBarState("");
    }
  };

  function formatToOneDecimalPlace(number: number) {
    return number.toFixed(1);
  }

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <StyledTopDiv>
          <StyledLogo src={Logo} onClick={handleClickLogo} />
          <Search
            setSideBarData={setSideBarData}
            setIsLoading={setLoading}
            setIsDefault={setIsDefault}
            setIsSideBarData={setIsSideBarData}
          />
        </StyledTopDiv>
        {selectedFacility && sideBarState === "detail" ? (
          <Detail
            id={selectedFacility.facilityId}
            setSelectedFacility={setSelectedFacility}
          />
        ) : loading ? (
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
        ) : sideBarData && sideBarData.data.content.length === 0 ? (
          <StyledNoResultContainer>
            <StyledNoResultImg src={NoResult} />
            <StyledNoResult>검색된 시설이 없습니다.</StyledNoResult>
          </StyledNoResultContainer>
        ) : (
          <StyledSearchResultContainer>
            {isDefault && <StyledMyRegionText>{isMyRegion}</StyledMyRegionText>}
            {sideBarData && (
              <StyledTextLine>
                <StyledTextBoldStyle>내 주변</StyledTextBoldStyle>
                <StyledTextMediumStyle>놀이시설</StyledTextMediumStyle>
                <StyledLineStyle />
              </StyledTextLine>
            )}
            {sideBarData ? (
              sideBarData.data.content.map((facility) => (
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
                            navigator.clipboard.writeText(facility.ronaAddr);
                            toast("주소가 복사되었습니다. ✨");
                            toast.clearWaitingQueue();
                            console.log("?");
                          }}
                        />
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
              ))
            ) : (
              <div>위치 불러오는 중... 잠시만 기다려주세요</div>
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
