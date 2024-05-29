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

export interface FacilityInfoTop {
  status: number;
  data: {
    facilityId: number;
    pfctNm: string;
    exfcYn: string;
    instlPlaceCdNm: string;
    rating: number;
    reviewCnt: number;
    ronaAddr: string;
    latCrtsVl: string;
    lotCrtsVl: string;
  };
}

export interface FacilityInfoLeft {
  status: number;
  data: {
    facilityId: number;
    pfctSn: string;
    pfctNm: string;
    zip: string;
    ronaAddr: string;
    lotnoAddr: string;
    instlYmd: string;
    instlPlaceCdNm: string;
    prvtPblcYnCdNm: string;
    idrodrCdNm: string;
    latCrtsVl: string;
    lotCrtsVl: string;
    incld_water: string;
    cctvCnt: string;
    insurance: string;
    safetyInsp: string;
    rides: [
      {
        pfctNm: string;
        rideInstlYmd: string;
        rideStylCdNm: string;
      }
    ];
  };
}

export interface FacilityInfoRight {
  status: number;
  data: {
    ratingAvg: number;
    reviewCnt: number;
    aiSummary: string;
    reviews: [
      {
        nickname: string;
        content: string;
        rating: number;
      }
    ];
  };
}
