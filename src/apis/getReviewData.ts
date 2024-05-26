import { OverlayReviewResponses } from "../types/Map.type";
import { client } from "./client";

export const getReviewData = async (id: string) => {
  const response = await client.get<OverlayReviewResponses>(
    `/gj/v1/facility/overlay/rating-and-review/${id}`
  );

  return response.data.data;
};
