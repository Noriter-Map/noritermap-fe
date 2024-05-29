import { OverlayReviewResponses } from "../types/Map.type";
import { client } from "./client";

export const getReviewData = async (id: string) => {
  const response = await client.get<OverlayReviewResponses>(
    `/gj/v1/facility/overlay/rating-and-review/${id}`
  );

  console.log("getReviewData 에러", response);
  return response.data.data;
};
