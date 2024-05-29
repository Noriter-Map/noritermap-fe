import axios from "axios";
import { MyRegionResponses } from "../types/Map.type";

export const getMyPosition = async (y: number, x: number) => {
  const response = await axios.get<MyRegionResponses>(
    `https://tsrksh1ifh.execute-api.ap-northeast-2.amazonaws.com/region/api`,
    {
      headers: {
        "x-api-key": process.env.REACT_APP_LAMBDA_API_KEY,
      },
      params: {
        y,
        x,
      },
    }
  );

  return response.data.regionNm;
};
