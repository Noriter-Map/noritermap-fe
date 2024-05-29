import {
  StyledAddrText,
  StyledContainer,
  StyledContentText,
  StyledDetailContentContainer,
  StyledDetailInfoContainer,
  StyledDetailTableContainer,
  StyledDetailTitleText,
  StyledFcNmText,
  StyledIcon,
  StyledIconText,
  StyledIconTextPlay,
  StyledLoadingContainer,
  StyledPenIcon,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
  StyledTitle,
  StyledTitleWrapper,
  StyledUpdateIcon,
  StyledUpdateText,
} from "./DetailInfoTab.style";

import InstallIcon from "../../../assets/Install.png";
import PlayFcIcon from "../../../assets/PlayFc.png";
import PoolIcon from "../../../assets/Pool.png";
import CCTVIcon from "../../../assets/CCTV.png";
import InsuranceIcon from "../../../assets/Insurance.png";
import SafeIcon from "../../../assets/Safe.png";
import PenIcon from "../../../assets/Pen.svg";
import { FacilityInfoLeft } from "../../../types/SearchOption.type";
import { useEffect, useState } from "react";
import { getFcInfoLeft } from "../../../apis/getFcInfoLeft";
import { BeatLoader } from "react-spinners";

interface DetailLeftInfoProps {
  id: number;
}

export const DetailInfoTab = ({ id }: DetailLeftInfoProps) => {
  const [isDetailData, setIsDetailData] = useState<FacilityInfoLeft>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFcInfoLeft(id);
        console.log(response);
        setIsDetailData(response);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    if (dateString.length !== 8) return dateString;

    const year = dateString.substring(0, 4);
    const month = parseInt(dateString.substring(4, 6), 10);
    const day = parseInt(dateString.substring(6, 8), 10);

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <StyledContainer>
      {isDetailData ? (
        <>
          <StyledTitleWrapper>
            <StyledTitle>
              <StyledAddrText>{isDetailData?.data.ronaAddr}</StyledAddrText>
              <StyledFcNmText>{isDetailData?.data.pfctNm}</StyledFcNmText>
            </StyledTitle>
          </StyledTitleWrapper>
          <StyledDetailInfoContainer>
            <StyledDetailContentContainer>
              <StyledIconText>
                <StyledIcon src={InstallIcon} />
                <StyledDetailTitleText>설치일자</StyledDetailTitleText>
              </StyledIconText>
              <StyledContentText>
                {isDetailData?.data.instlYmd}
              </StyledContentText>
            </StyledDetailContentContainer>
          </StyledDetailInfoContainer>
          <StyledDetailInfoContainer>
            <StyledDetailContentContainer>
              <StyledIconTextPlay>
                <StyledIcon src={PlayFcIcon} />
                <StyledDetailTableContainer>
                  <StyledDetailTitleText>
                    시설 내 놀이기구
                  </StyledDetailTitleText>
                  {isDetailData ? (
                    <StyledTable>
                      <StyledTableHead>
                        <tr>
                          <StyledTableHeader>놀이기구 유형</StyledTableHeader>
                          <StyledTableHeader>설치일자</StyledTableHeader>
                        </tr>
                      </StyledTableHead>
                      <StyledTableBody>
                        {isDetailData.data.rides.map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              {item.rideStylCdNm}
                            </StyledTableCell>
                            <StyledTableCell>
                              {formatDate(item.rideInstlYmd)}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </StyledTableBody>
                    </StyledTable>
                  ) : (
                    <StyledContentText>정보 없음</StyledContentText>
                  )}
                </StyledDetailTableContainer>
              </StyledIconTextPlay>
            </StyledDetailContentContainer>
          </StyledDetailInfoContainer>
          <StyledDetailInfoContainer>
            <StyledDetailContentContainer>
              <StyledIconText>
                <StyledIcon src={PoolIcon} />
                <StyledDetailTitleText>물놀이형 놀이시설</StyledDetailTitleText>
              </StyledIconText>
              <StyledContentText>
                {isDetailData?.data.incld_water}
              </StyledContentText>
            </StyledDetailContentContainer>
          </StyledDetailInfoContainer>
          <StyledDetailInfoContainer>
            <StyledDetailContentContainer>
              <StyledIconText>
                <StyledIcon src={CCTVIcon} />
                <StyledDetailTitleText>CCTV 개수</StyledDetailTitleText>
              </StyledIconText>
              <StyledContentText>
                {isDetailData?.data.cctvCnt}
              </StyledContentText>
            </StyledDetailContentContainer>
          </StyledDetailInfoContainer>
          <StyledDetailInfoContainer>
            <StyledDetailContentContainer>
              <StyledIconText>
                <StyledIcon src={InsuranceIcon} />
                <StyledDetailTitleText>보험가입 여부</StyledDetailTitleText>
              </StyledIconText>
              <StyledContentText>
                {isDetailData?.data.insurance}
              </StyledContentText>
            </StyledDetailContentContainer>
          </StyledDetailInfoContainer>
          <StyledDetailInfoContainer>
            <StyledDetailContentContainer>
              <StyledIconText>
                <StyledIcon src={SafeIcon} />
                <StyledDetailTitleText>안전검사 여부</StyledDetailTitleText>
              </StyledIconText>
              <StyledContentText>
                {isDetailData?.data.safetyInsp}
              </StyledContentText>
            </StyledDetailContentContainer>
          </StyledDetailInfoContainer>
          <StyledUpdateIcon>
            <StyledPenIcon src={PenIcon} />
            <StyledUpdateText onClick={() => alert("열심히 준비 중이에요!")}>
              정보 수정 제안하기
            </StyledUpdateText>
          </StyledUpdateIcon>
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
