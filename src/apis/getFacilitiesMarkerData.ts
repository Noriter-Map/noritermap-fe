import { local } from "./client";

export const getFacilitiesMarkerData = async () => {
  const response = await local.get(`data/marker_data.json`);
  return response.data;
};
