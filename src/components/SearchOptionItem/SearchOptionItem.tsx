import React from "react";
import { useToggleOption } from "../../hooks/useToggleOption";
import {
  StyledCheckBox,
  StyledCheckBoxCustom,
  StyledLabelText,
} from "../Search/Search.style";

interface SearchOptionItemProps {
  category: string;
  option: string;
  categoryIndex: number;
  optionIndex: number;
}

const SearchOptionItem: React.FC<SearchOptionItemProps> = ({
  category,
  option,
  categoryIndex,
  optionIndex,
}) => {
  const [isChecked, toggleOption] = useToggleOption(category, option);

  return (
    <StyledCheckBox key={option} style={{ width: "50%" }}>
      <StyledCheckBoxCustom
        type="checkbox"
        id={`check-option-${categoryIndex}-${optionIndex}`}
        checked={isChecked}
        onChange={toggleOption}
      />
      <StyledLabelText htmlFor={`check-option-${categoryIndex}-${optionIndex}`}>
        {option}
      </StyledLabelText>
    </StyledCheckBox>
  );
};

export default SearchOptionItem;
