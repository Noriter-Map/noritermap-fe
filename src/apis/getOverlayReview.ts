import { OverlayReviewResponses } from "../types/Map.type";
import { client } from "./client";

export const getOverlayReview = async (id: number) => {
  const response = await client.get<OverlayReviewResponses>(
    `/gj/v1/facility/overlay/rating-and-review/${id}`
  );

  return response.data;
};
