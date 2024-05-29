import { FacilityInfoRight } from "../types/SearchOption.type";
import { client } from "./client";

export const getFcInfoRight = async (id: number) => {
  const response = await client.get<FacilityInfoRight>(
    `/gj/v1/facility/info/review/${id}`
  );

  return response.data;
};
