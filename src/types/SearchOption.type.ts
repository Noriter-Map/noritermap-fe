export interface SearchOptionInfo {
  category: string;
  option: string[];
}

export interface SearchOptionRequest {
  keyword?: string;
  idrodr?: string;
  category?: string;
  prvt_pblc?: string;
  curLatitude?: string;
  curLongitude?: string;
  page: number;
  size: number;
  sort?: string[];
}

export interface SearchFacilityListResponses {
  status: number;
  data: {
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    size: number;
    content: SearchFacility[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      paged: boolean;
      unpaged: boolean;
      pageNumber: number;
      pageSize: number;
    };
    numberOfElements: number;
    empty: boolean;
  };
}

export interface SearchFacility {
  facilityId: number;
  pfctNm: string;
  ronaAddr: string;
  lotnoAddr: string;
  instlPlaceCdNm: string;
  prvtPblcYnCdNm: string;
  idrodrCdNm: string;
  latCrtsVl: string;
  lotCrtsVl: string;
  rating: number;
  reviewCnt: number;
  distanceFromCur: number;
}
