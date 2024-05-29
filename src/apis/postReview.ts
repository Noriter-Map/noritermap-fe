import { client } from "./client";

export const postReview = async (
  facilityId: number,
  nickname: string,
  content: string,
  rating: number
) => {
  const response = await client.post("/gj/v1/review/facility", {
    facilityId: facilityId,
    nickname: nickname,
    content: content,
    rating: rating,
  });

  return response.data;
};
