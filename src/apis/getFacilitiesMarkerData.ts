import { client } from './client';

export const getFacilitiesMarkerData = async () => {
    const response = await client.get(`data/facilitiesMarkerData.json`);
    return response.data;
};
