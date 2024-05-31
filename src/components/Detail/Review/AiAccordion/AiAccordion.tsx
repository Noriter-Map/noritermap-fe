import { useState } from "react";
import {
  StyledAccordionContainer,
  StyledAccordionContent,
  StyledAccordionHeader,
  StyledAccordionHeaderContainer,
  StyledAccordionHeaderWrapper,
  StyledArrowIcon,
} from "./AiAccordion.style";
import ArrowIcon from "../../../../assets/Right_Arrow.png";
import { FacilityInfoRight } from "../../../../types/SearchOption.type";

interface AiAccodianProps {
  isReviewData: FacilityInfoRight;
}

export const AiAccordion = ({ isReviewData }: AiAccodianProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleOpenAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <>
      <StyledAccordionContainer>
        <StyledAccordionHeaderContainer onClick={handleOpenAccordion}>
          <StyledAccordionHeaderWrapper>
            <StyledAccordionHeader>AI 최근 후기 요약</StyledAccordionHeader>
            {isAccordionOpen ? (
              <StyledArrowIcon
                src={ArrowIcon}
                isAccordionOpen={isAccordionOpen}
              />
            ) : (
              <StyledArrowIcon
                src={ArrowIcon}
                isAccordionOpen={isAccordionOpen}
              />
            )}
          </StyledAccordionHeaderWrapper>
        </StyledAccordionHeaderContainer>
        <StyledAccordionContent isOpen={isAccordionOpen}>
          {isReviewData.data.aiSummary}
        </StyledAccordionContent>
      </StyledAccordionContainer>
    </>
  );
};
