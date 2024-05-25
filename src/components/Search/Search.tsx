// Search.tsx
import { MutableRefObject, useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/SearchIcon.svg";
import {
  ButtonLeft,
  ButtonRight,
  StyledCheckBoxContainer,
  StyledChip,
  StyledChipContainer,
  StyledContainer,
  StyledOptionSubTitle,
  StyledOptionTitle,
  StyledOptionWrapper,
  StyledSearchBar,
  StyledSearchBarWrapper,
  StyledSearchIcon,
  StyledSearchOptionContainer,
  UnderlinedChar,
} from "./Search.style";
import { SearchOptions } from "../../constants/SearchOptions";
import { SearchOptionInfo } from "../../types/SearchOption.type";
import SearchOptionItem from "../../components/SearchOptionItem/SearchOptionItem";
import { OptionState, OptionsState } from "../../recoil/OptionState";
import { useRecoilState } from "recoil";
import useIsOverflow from "../../hooks/useIsOverflow";

export const Search = () => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const searchWrap = useRef<HTMLDivElement | null>(null);
  const [searchFocus, setSearchFocus] = useState(false);
  const [optionsState, setOptionsState] = useRecoilState(OptionState);
  const chipContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState("right");

  const clickWrap = (event: MouseEvent) => {
    if (
      document.activeElement !== searchInput.current &&
      searchWrap.current &&
      !searchWrap.current.contains(event.target as Node)
    ) {
      setSearchFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickWrap);
    return () => {
      document.removeEventListener("click", clickWrap);
    };
  }, []);

  const selectedOptions = Object.entries(optionsState).flatMap(
    ([category, options]) =>
      Object.entries(options as { [key: string]: boolean })
        .filter(([option, selected]) => selected)
        .map(([option]) => ({ category, option }))
  );

  const isOverflow = useIsOverflow({ ref: chipContainerRef, selectedOptions });

  const moveRight = (moveRef: MutableRefObject<HTMLDivElement | null>) => {
    const { current } = moveRef;

    if (current) {
      current.scrollLeft = current.scrollWidth - current.clientWidth;
    }
  };

  const moveLeft = (moveRef: MutableRefObject<HTMLDivElement | null>) => {
    const { current } = moveRef;

    if (current) {
      current.scrollLeft = 0;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (chipContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          chipContainerRef.current;
        if (scrollLeft <= (scrollWidth - clientWidth) / 2) {
          setScrollState("right");
        } else {
          setScrollState("left");
        }
      }
    };

    const currentRef = chipContainerRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    handleScroll();

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [selectedOptions, isOverflow]);

  const removeOption = (category: string, option: string) => {
    setOptionsState((prevOptionsState: OptionsState) => ({
      ...prevOptionsState,
      [category]: {
        ...prevOptionsState[category],
        [option]: false,
      },
    }));
  };

  return (
    <StyledContainer>
      <StyledSearchBarWrapper ref={searchWrap}>
        <StyledSearchIcon src={SearchIcon} />
        <StyledSearchBar
          ref={searchInput}
          placeholder="놀이시설 검색"
          onFocus={() => {
            setSearchFocus(true);
          }}
        />
      </StyledSearchBarWrapper>
      {searchFocus && (
        <StyledSearchOptionContainer onClick={(e) => e.stopPropagation()}>
          <StyledOptionWrapper>
            <StyledOptionTitle>검색 옵션</StyledOptionTitle>
            <UnderlinedChar />
            {SearchOptions.map(
              (optionCategory: SearchOptionInfo, categoryIndex: number) => (
                <div key={optionCategory.category}>
                  <StyledOptionSubTitle>
                    {optionCategory.category}
                  </StyledOptionSubTitle>
                  <StyledCheckBoxContainer>
                    {optionCategory.option.map(
                      (option: string, optionIndex: number) => (
                        <SearchOptionItem
                          key={option}
                          category={optionCategory.category}
                          option={option}
                          categoryIndex={categoryIndex}
                          optionIndex={optionIndex}
                        />
                      )
                    )}
                  </StyledCheckBoxContainer>
                </div>
              )
            )}
          </StyledOptionWrapper>
        </StyledSearchOptionContainer>
      )}
      {selectedOptions.length > 0 && (
        <StyledChipContainer ref={chipContainerRef}>
          {selectedOptions.map(({ category, option }) => (
            <StyledChip
              key={`${category}-${option}`}
              onClick={() => removeOption(category, option)}
            >
              {option}
            </StyledChip>
          ))}
        </StyledChipContainer>
      )}
      {isOverflow && scrollState === "right" && (
        <ButtonRight onClick={() => moveRight(chipContainerRef)} />
      )}
      {isOverflow && scrollState === "left" && (
        <ButtonLeft onClick={() => moveLeft(chipContainerRef)} />
      )}
    </StyledContainer>
  );
};
