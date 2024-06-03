// Search.tsx
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
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
  StyledSearchOptionDeleteButton,
} from "./Search.style";
import { SearchOptions } from "../../constants/SearchOptions";
import DeleteIcon from "../../assets/Delete.svg";
import {
  SearchFacilityListResponses,
  SearchOptionInfo,
} from "../../types/SearchOption.type";
import SearchOptionItem from "../../components/SearchOptionItem/SearchOptionItem";
import { OptionState, OptionsState } from "../../recoil/OptionState";
import { useRecoilState } from "recoil";
import useIsOverflow from "../../hooks/useIsOverflow";
import { transformOptionsToQueryParams } from "../../hooks/useTransformQuery";
import { getFaciltySearch } from "../../apis/getFaciltySearch";
import { useNavigate } from "react-router-dom";
import { SideBarState } from "../../recoil/SideBarState";

interface SearchProps {
  setSideBarSearchData: Dispatch<SetStateAction<any>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsDefault: Dispatch<SetStateAction<boolean>>;
  setIsSideBarData: Dispatch<
    SetStateAction<SearchFacilityListResponses | null>
  >;
  sideBarSearchData: SearchFacilityListResponses | undefined;
  pathKeyword: string | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}

export const Search = forwardRef(
  (
    {
      setSideBarSearchData,
      setIsLoading,
      setIsDefault,
      setIsSideBarData,
      sideBarSearchData,
      pathKeyword,
      setPage,
      page,
    }: SearchProps,
    ref
  ) => {
    const searchInput = useRef<HTMLInputElement | null>(null);
    const searchWrap = useRef<HTMLDivElement | null>(null);
    const [searchFocus, setSearchFocus] = useState(false);
    const [optionsState, setOptionsState] = useRecoilState(OptionState);
    const chipContainerRef = useRef<HTMLDivElement | null>(null);
    const [scrollState, setScrollState] = useState("right");
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [isCurrentLat, setIsCurrentLat] = useState<number | null>(null);
    const [isCurrentLng, setIsCurrentLng] = useState<number | null>(null);
    const [sideBarState, setSideBarState] = useRecoilState(SideBarState);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

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

    const isOverflow = useIsOverflow({
      ref: chipContainerRef,
      selectedOptions,
    });

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

    navigator.geolocation.getCurrentPosition((pos) => {
      const currentLat = pos.coords.latitude;
      const currentLng = pos.coords.longitude;
      setIsCurrentLat(currentLat);
      setIsCurrentLng(currentLng);
    });

    const handleSearch = async (resetPage: boolean) => {
      setSearchFocus(false);
      setIsLoading(true);
      setSideBarState("search");

      const keyword = searchInput.current?.value || "";
      const curLatitude = isCurrentLat;
      const curLongitude = isCurrentLng;
      const pageNumber = resetPage ? 0 : page;
      const size = 10;

      const queryParams = transformOptionsToQueryParams(
        optionsState,
        keyword,
        curLatitude?.toString() || "",
        curLongitude?.toString() || "",
        pageNumber,
        size
      );

      if (keyword.trim() !== "") {
        navigate(`/search/${keyword}`);
      }

      try {
        const response = await getFaciltySearch(queryParams);
        if (keyword !== pathKeyword && resetPage) {
          setSideBarSearchData(response);
          setIsSideBarData(response);
          setPage((prevPage) => prevPage + 1);
        } else {
          setSideBarSearchData(
            (prevData: SearchFacilityListResponses | undefined) => {
              if (prevData && pageNumber > 0) {
                const newContent = response.data.content.filter(
                  (newItem) =>
                    !prevData.data.content.some(
                      (prevItem) => prevItem.facilityId === newItem.facilityId
                    )
                );

                return {
                  ...prevData,
                  data: {
                    ...prevData.data,
                    content: [...prevData.data.content, ...newContent],
                  },
                };
              } else {
                return response;
              }
            }
          );
        }
        setIsDefault(false);
        setHasMore(!response.data.last);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      handleSearch,
    }));

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch(true);
      }
    };

    const handleSearchOptionDeleteButtonClick = () => {
      setSearchFocus(false);
    };

    useEffect(() => {
      if (pathKeyword !== undefined) {
        if (searchInput.current) {
          searchInput.current.value = pathKeyword;
          setSearchKeyword(pathKeyword);
        }
      }
    }, [pathKeyword]);

    return (
      <StyledContainer>
        <StyledSearchBarWrapper ref={searchWrap}>
          <StyledSearchIcon
            src={SearchIcon}
            onClick={() => handleSearch(true)}
          />
          <StyledSearchBar
            ref={searchInput}
            placeholder="놀이시설 검색"
            onFocus={() => {
              setSearchFocus(true);
            }}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </StyledSearchBarWrapper>
        {searchFocus && (
          <StyledSearchOptionContainer onClick={(e) => e.stopPropagation()}>
            <StyledSearchOptionDeleteButton
              src={DeleteIcon}
              onClick={handleSearchOptionDeleteButtonClick}
            ></StyledSearchOptionDeleteButton>
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
  }
);
