import {awsS3} from "./client";

export const getFacilitiesMarkerData = async () => {
  const response = await awsS3.get("");
  return response.data;
};
