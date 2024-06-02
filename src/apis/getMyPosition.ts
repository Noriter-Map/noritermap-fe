import axios from "axios";
import { MyRegionResponses } from "../types/Map.type";

export const getMyPosition = async (y: number, x: number) => {
  const response = await axios.get<MyRegionResponses>(
    process.env.REACT_APP_LAMBDA_GET_CUR_LOCATION ? process.env.REACT_APP_LAMBDA_GET_CUR_LOCATION : "",
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
