import {
  SearchFacilityListResponses,
  SearchOptionRequest,
} from "../types/SearchOption.type";
import { client } from "./client";

export const getFaciltySearch = async ({
  keyword,
  idrodr,
  category,
  prvt_pblc,
  curLatitude,
  curLongitude,
  page,
  size,
}: SearchOptionRequest) => {
  const response = await client.get<SearchFacilityListResponses>(
    "/gj/v1/facility/search",
    {
      params: {
        keyword,
        idrodr,
        category,
        prvt_pblc,
        curLatitude,
        curLongitude,
        page,
        size,
      },
    }
  );

  return response.data;
};
