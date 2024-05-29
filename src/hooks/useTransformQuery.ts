import { OptionsState } from "../recoil/OptionState";
import { SearchOptionRequest } from "../types/SearchOption.type";

export const transformOptionsToQueryParams = (
  optionsState: OptionsState,
  keyword: string,
  curLatitude: string,
  curLongitude: string,
  page: number,
  size: number,
  sort?: string[]
): SearchOptionRequest => {
  let idrodr = "";

  if (optionsState["실내외구분"]) {
    if (optionsState["실내외구분"]["실내"]) {
      idrodr = "indoor";
    }
    if (optionsState["실내외구분"]["실외"]) {
      if (idrodr) {
        idrodr += ",outdoor";
      } else {
        idrodr = "outdoor";
      }
    }
  }

  const category: string[] = [];
  const installationLocations = [
    "주택단지",
    "도시공원",
    "어린이집",
    "놀이제공영업소",
    "식품접객업소",
    "주상복합",
    "아동복지시설",
    "종교시설",
  ];
  installationLocations.forEach((location, index) => {
    if (optionsState["설치장소"] && optionsState["설치장소"][location]) {
      category.push(`C${index + 1}`);
    }
  });

  const prvt_pblc: string[] = [];
  if (optionsState["민공구분"]) {
    if (optionsState["민공구분"]["민간"]) {
      prvt_pblc.push("PRIVATE");
    }
    if (optionsState["민공구분"]["공공"]) {
      prvt_pblc.push("PUBLIC");
    }
  }

  return {
    keyword,
    idrodr: idrodr || undefined,
    category: category.length > 0 ? category.join(",") : undefined,
    prvt_pblc: prvt_pblc.length > 0 ? prvt_pblc.join(",") : undefined,
    curLatitude,
    curLongitude,
    page,
    size,
  };
};
