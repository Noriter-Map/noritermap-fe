import { SearchOptionInfo } from "../types/SearchOption.type";

export const SearchOptions: SearchOptionInfo[] = [
  { category: "실내외", option: ["실내", "실외"] },
  {
    category: "설치장소",
    option: [
      "주택단지",
      "도시공원",
      "어린이집",
      "놀이제공영업소",
      "식품접객업소",
      "주상복합",
      "아동복지시설",
      "종교시설",
    ],
  },
  { category: "민공구분", option: ["민간", "공공"] },
];
