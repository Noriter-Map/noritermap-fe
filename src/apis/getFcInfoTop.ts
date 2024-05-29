import { FacilityInfoTop } from "../types/SearchOption.type";
import { client } from "./client";

export const getFcInfoTop = async (id: number) => {
  const response = await client.get<FacilityInfoTop>(
    `/gj/v1/facility/info/base/${id}`
  );

  return response.data;
};
