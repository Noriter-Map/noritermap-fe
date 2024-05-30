import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  StyledBack,
  StyledTabMenu,
  StyledTopCategory,
  StyledTopContainer,
  StyledTopTitle,
  StyledTopTitleContainer,
  StyledTopWrapper,
} from "./Detail.style";
import Back from "../../assets/BackIcon.svg";
import { useNavigate } from "react-router-dom";
import { FacilityInfoTop, SearchFacility } from "../../types/SearchOption.type";
import { getFcInfoTop } from "../../apis/getFcInfoTop";
import KakaoRoadview from "../RoadView/RoadView";
import { PacmanLoader } from "react-spinners";
import {
  StyledClipBoardIcon,
  StyledLoacationIcon,
  StyledLoadingContainer,
  StyledRating,
  StyledReviewCntText,
  StyledRoNmAddr,
  StyledRoNmContainer,
  StyledStarIcon,
  StyledStarReviewContainer,
} from "../SideBar/SideBar.style";
import RoNmIcon from "../../assets/RoNmIcon.svg";
import ClipBoard from "../../assets/ClipBoardIcon.svg";
import StarIcon from "../../assets/StarIcon.svg";
import { DetailInfoTab } from "./DetailInfoTab/DetailInfoTab";
import { Review } from "./Review/Review";
import { toast } from "react-toastify";

interface DetailProps {
  id: number;
  setSelectedFacility?: Dispatch<SetStateAction<SearchFacility | null>>;
}

export const Detail = ({ id, setSelectedFacility }: DetailProps) => {
  const [currentTab, clickTab] = useState(0);
  const [isFcTopData, setIsFcTopData] = useState<FacilityInfoTop>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFcInfoTop(id);
        console.log(response);
        setIsFcTopData(response);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const menuArr = [
    {
      name: "놀이시설 정보",
      content: <DetailInfoTab id={id} />,
    },
    { name: "리뷰", content: <Review id={id} setIsUpdate={setIsUpdate} /> },
  ];

  const selectMenuHandler = (index: number) => {
    clickTab(index);
  };

  const handleBackButtonClick = () => {
    if (setSelectedFacility) {
      setSelectedFacility(null);
    }
    navigate(-1);
  };

  function formatToOneDecimalPlace(number: number) {
    return number.toFixed(1);
  }

  return (
    <div>
        <StyledBack src={Back} onClick={handleBackButtonClick} />
      {isFcTopData ? (
        <>
          <KakaoRoadview
            lat={parseFloat(isFcTopData.data.latCrtsVl)}
            lng={parseFloat(isFcTopData.data.lotCrtsVl)}
            pfctNm={isFcTopData.data.pfctNm}
          />
          <StyledTopWrapper>
            <StyledTopContainer>
              <StyledTopTitleContainer>
                <StyledTopTitle>{isFcTopData.data.pfctNm}</StyledTopTitle>
                <StyledTopCategory>
                  {isFcTopData.data.instlPlaceCdNm}
                </StyledTopCategory>
              </StyledTopTitleContainer>
              {isFcTopData.data.ronaAddr && (
                <StyledRoNmContainer>
                  <StyledLoacationIcon src={RoNmIcon} />
                  <StyledRoNmAddr>{isFcTopData.data.ronaAddr}</StyledRoNmAddr>
                  <StyledClipBoardIcon
                    src={ClipBoard}
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      navigator.clipboard.writeText(isFcTopData.data.ronaAddr);
                      toast("주소가 복사되었습니다. ✨");
                      toast.clearWaitingQueue();
                    }}
                  />
                </StyledRoNmContainer>
              )}
              <StyledStarReviewContainer>
                <StyledStarIcon src={StarIcon} />
                <StyledRating>
                  {formatToOneDecimalPlace(isFcTopData.data.rating)}
                </StyledRating>
                <StyledReviewCntText>
                  후기 ({isFcTopData.data.reviewCnt})
                </StyledReviewCntText>
              </StyledStarReviewContainer>
            </StyledTopContainer>
          </StyledTopWrapper>
          <StyledTabMenu className={`focused-tab-${currentTab}`}>
            {menuArr.map((el, index) => (
              <li
                key={index}
                className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {el.name}
              </li>
            ))}
          </StyledTabMenu>
          {menuArr[currentTab].content}
        </>
      ) : (
        <StyledLoadingContainer>
          <PacmanLoader
            color={"#F3F08F"}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </StyledLoadingContainer>
      )}
    </div>
  );
};
