import { FacilityInfoLeft } from "../types/SearchOption.type";
import { client } from "./client";

export const getFcInfoLeft = async (id: number) => {
  const response = await client.get<FacilityInfoLeft>(
    `/gj/v1/facility/info/detail/${id}`
  );

  return response.data;
};
