import {
    StyledSearchResultContainer,
    StyledClipBoardIcon,
    StyledDistLotAddrContainer,
    StyledFacilityDist,
    StyledFacilityTitle, StyledKeyword, StyledKeywordContainer,
    StyledLineStyle, StyledLoacationIcon,
    StyledMyRegionContainer,
    StyledMyRegionIcon,
    StyledMyRegionText,
    StyledNoRating, StyledReviewCntText, StyledRoNmAddr, StyledRoNmContainer,
    StyledSearchResult,
    StyledSearchResultWrapper,
    StyledStarIcon,
    StyledStarReviewContainer,
    StyledTextBoldStyle,
    StyledTextLine,
    StyledTextMediumStyle
} from "./FetchingCurLocation.style";

import React from "react";
import {LoadingAnimation} from "./LoadingAnimation/LoadingAnimation";

export const FetchingCurLocation = () => {
    return (
        <>
        <StyledSearchResultContainer>
            <StyledMyRegionContainer style={{ opacity: 0.5 }}>
                <StyledMyRegionIcon />
                <StyledMyRegionText>나나나나나나</StyledMyRegionText>
            </StyledMyRegionContainer>
            <StyledTextLine style={{ opacity: 0.5 }}>
                <StyledTextBoldStyle>내 주변</StyledTextBoldStyle>
                <StyledTextMediumStyle>놀이시설</StyledTextMediumStyle>
                <StyledLineStyle />
            </StyledTextLine>
            {[1, 2, 3, 4].map((facility) => (
                <StyledSearchResultWrapper key={facility} style={{ opacity: 0.5 }}>
                    <StyledSearchResult>
                        <StyledFacilityTitle>나나나나나나나나나나나나나나나나나나</StyledFacilityTitle>
                        <StyledDistLotAddrContainer>
                            <StyledFacilityDist>나나나나</StyledFacilityDist>
                            <StyledStarReviewContainer>
                                <StyledStarIcon />
                                <StyledNoRating>정보 없음</StyledNoRating>
                                <StyledReviewCntText>후기 00</StyledReviewCntText>
                            </StyledStarReviewContainer>
                        </StyledDistLotAddrContainer>
                        <StyledRoNmContainer>
                            <StyledLoacationIcon />
                            <StyledRoNmAddr>나나나나나나나나나나나나나나나나</StyledRoNmAddr>
                            <StyledClipBoardIcon />
                        </StyledRoNmContainer>
                        <StyledKeywordContainer>
                            <StyledKeyword>놀이제공영업소</StyledKeyword>
                            <StyledKeyword>실내</StyledKeyword>
                            <StyledKeyword>공공</StyledKeyword>
                        </StyledKeywordContainer>
                    </StyledSearchResult>
                </StyledSearchResultWrapper>
            ))}
            <LoadingAnimation></LoadingAnimation>
        </StyledSearchResultContainer>
        </>
    );
}