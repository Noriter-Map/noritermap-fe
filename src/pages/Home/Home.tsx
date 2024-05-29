import { StyledGoCurrentImg, StyledMapContainer } from "./Home.style";
import { useEffect, useState, useRef } from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import { getFacilitiesMarkerData } from "../../apis/getFacilitiesMarkerData";
import MapPin from "../../assets/marker.svg";
import { renderToStaticMarkup } from "react-dom/server";
import { Overlay } from "../../components/Overlay/Overlay";
import { useNavigate, useParams } from "react-router-dom";
import { MarkerDataType, OverlayProps } from "../../types/Map.type";
import GoCurrent from "../../assets/GoCurrent.svg";
import CurrentIcon from "../../assets/CurrentMarker.svg";
import { getReviewData } from "../../apis/getReviewData";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

declare global {
  interface Window {
    kakao: any;
  }
}

const renderOverlay = (overlayProps: OverlayProps, container: HTMLElement) => {
  const root = createRoot(container);
  root.render(<Overlay {...overlayProps} />);
};

export const Home = () => {
  const { keyword, facilityId } = useParams();
  const [markerDatas, setMarkerDatas] = useState<MarkerDataType[]>([]);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const clickedMarkerAndOverlayRef = useRef<[any, any] | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const currentMarkerRef = useRef<any>(null);
  const [FocusPosition, setFocusPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const MarkerRef = useRef<any>(null);
  const navigate = useNavigate();
  const [isSideBarData, setIsSideBarData] = useState<any>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<
    string | undefined
  >(facilityId);

  useEffect(() => {
    let mapContainer = document.getElementById("map");
    let mapOption = {
      center: new window.kakao.maps.LatLng(35.160048, 126.851309),
      level: 3,
      mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
    };
    let mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);

    let mapTypeControl = new window.kakao.maps.MapTypeControl();
    mapInstance.addControl(
      mapTypeControl,
      window.kakao.maps.ControlPosition.TOPRIGHT
    );

    let zoomControl = new window.kakao.maps.ZoomControl();
    mapInstance.addControl(
      zoomControl,
      window.kakao.maps.ControlPosition.RIGHT
    );

    window.kakao.maps.event.addListener(mapInstance, "click", () => {
      if (clickedMarkerAndOverlayRef.current) {
        const curOverlay = clickedMarkerAndOverlayRef.current[1];
        curOverlay.setMap(null);
        clickedMarkerAndOverlayRef.current[0].setImage(normalImage);
        clickedMarkerAndOverlayRef.current = null;
      }
    });

    mapRef.current = mapInstance;
  }, []);

  useEffect(() => {
    const fetchMarkerData = async () => {
      try {
        const data = await getFacilitiesMarkerData();
        setMarkerDatas(data.data);
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    };
    fetchMarkerData();
  }, []);

  const normalSize = new window.kakao.maps.Size(42, 54);
  const overSize = new window.kakao.maps.Size(52, 68);
  const normalOffset = new window.kakao.maps.Point(20, 54);
  const overOffset = new window.kakao.maps.Point(22, 68);
  const spriteImageSize = new window.kakao.maps.Size(138, 68);

  const normalImage = new window.kakao.maps.MarkerImage(MapPin, normalSize, {
    offset: normalOffset, // 마커 이미지에서의 기준좌표
    spriteOrigin: new window.kakao.maps.Point(0, 0), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    spriteSize: spriteImageSize, // 스프라이트 이미지의 크기
  });
  const overImage = new window.kakao.maps.MarkerImage(MapPin, overSize, {
    offset: overOffset,
    spriteOrigin: new window.kakao.maps.Point(86, 0),
    spriteSize: spriteImageSize,
  });
  const clickImage = new window.kakao.maps.MarkerImage(MapPin, normalSize, {
    offset: normalOffset,
    spriteOrigin: new window.kakao.maps.Point(43, 0),
    spriteSize: spriteImageSize,
  });

  useEffect(() => {
    if (markerDatas.length === 0 || !mapRef.current) return;

    const newMarkers = markerDatas.map((data) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          parseFloat(data.lat),
          parseFloat(data.lot)
        ),
        title: data.pfct_nm,
        image: normalImage,
      });

      marker.facilityId = data.facility_id; // 마커 객체에 시설 ID를 저장

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 오버 이미지로 변경합니다
        if (!clickedMarkerAndOverlayRef.current || clickedMarkerAndOverlayRef.current[0] !== marker) {
          marker.setImage(overImage);
        }
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 기본 이미지로 변경합니다
        if (!clickedMarkerAndOverlayRef.current || clickedMarkerAndOverlayRef.current[0] !== marker
        ) {
          marker.setImage(normalImage);
        }
      });

      window.kakao.maps.event.addListener(marker, "click", async () => {
        // 클릭된 마커가 있고, 그것이 클릭한 마커와 같다면, 기본 이미지로 변경한다.
        if (clickedMarkerAndOverlayRef.current && clickedMarkerAndOverlayRef.current[0] === marker) {
          marker.setImage(normalImage);

          // 만약 오버레이가 띄워져 있다면, 제거하고 그 아래 로직은 수행하지 않는다.
          if (clickedMarkerAndOverlayRef.current[1]){
            clickedMarkerAndOverlayRef.current[1].setMap(null);
            clickedMarkerAndOverlayRef.current = null;
            return;
          }
        }

        // 클릭된 마커가 없거나, click 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 클릭 이미지로 변경합니다
        if (!clickedMarkerAndOverlayRef.current || clickedMarkerAndOverlayRef.current[0] !== marker) {
          // 클릭된 마커 객체가 null이 아니면
          // 클릭된 마커의 이미지를 기본 이미지로 변경하고
          !!clickedMarkerAndOverlayRef.current && clickedMarkerAndOverlayRef.current[0].setImage(normalImage);

          if (clickedMarkerAndOverlayRef.current) {
            clickedMarkerAndOverlayRef.current[0] = marker;
          }

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          marker.setImage(clickImage);
        }

        if (clickedMarkerAndOverlayRef.current) {
          const curOverlay = clickedMarkerAndOverlayRef.current[1];
          curOverlay && curOverlay.setMap(null);
        }

        try {
          const reviewData = await getReviewData(marker.facilityId);
          const overlayProps = {
            facility_id: data.facility_id,
            pfct_nm: data.pfct_nm,
            addr: data.addr,
            zip: data.zip ? data.zip : "",
            rating: reviewData.rating,
            reviewCnt: reviewData.reviewCnt,
            onDetailClick: handleDetailClick,
          };

          const container = document.createElement("div");
          renderOverlay(overlayProps, container);

          const overlay = new window.kakao.maps.CustomOverlay({
            content: container,
            position: marker.getPosition(),
            clickable: true,
          });

          overlay.setMap(mapRef.current);

          clickedMarkerAndOverlayRef.current = [marker, overlay];
        } catch (error) {
          console.error("Error fetching review data:", error);
        }
      });

      marker.setMap(mapRef.current);
      return marker;
    });

    markersRef.current = newMarkers; // 마커를 ref에 저장

    // 클러스터러 초기화 및 마커 추가
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: mapRef.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 5, // 클러스터 할 최소 지도 레벨
    });

    clusterer.addMarkers(newMarkers);
  }, [markerDatas]);

  useEffect(() => {
    if (isSideBarData && isSideBarData.data.content.length > 0) {
      const firstFacility = isSideBarData.data.content[0];
      const lat = parseFloat(firstFacility.latCrtsVl);
      const lng = parseFloat(firstFacility.lotCrtsVl);
      const position = new window.kakao.maps.LatLng(lat, lng);
      mapRef.current.panTo(position);
      mapRef.current.setLevel(3);

      // 해당 마커 찾기 및 보이기
      const marker = markersRef.current.find(
        (m) => m.facilityId === firstFacility.facilityId.toString()
      );
      if (marker) {
        marker.setMap(mapRef.current);
        window.kakao.maps.event.trigger(marker, "click");
      } else {
        console.error(
          `Marker not found for facilityId: ${firstFacility.facilityId}`
        );
      }
    }
  }, [isSideBarData]);

  const onNavigateFacility = (facilityId: number) => {
    navigate(`/p/place/${facilityId}`);
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const currentLat = pos.coords.latitude;
      const currentLng = pos.coords.longitude;
      const currentPos = new window.kakao.maps.LatLng(currentLat, currentLng);
      setCurrentPosition({ lat: currentLat, lng: currentLng });

      mapRef.current.setLevel(2);

      if (currentMarkerRef.current) {
        currentMarkerRef.current.setPosition(currentPos);
      } else {
        const imageSize = new window.kakao.maps.Size(48, 70);
        const markerImage = new window.kakao.maps.MarkerImage(
          CurrentIcon,
          imageSize
        );
        const marker = new window.kakao.maps.Marker({
          position: currentPos,
          image: markerImage,
        });
        marker.setMap(mapRef.current);
        currentMarkerRef.current = marker;
      }

      mapRef.current.panTo(currentPos);
    });
  };

  const handleMarkerClick = (facilityId: number) => {
    const markerData = markerDatas.find(
      (marker) => marker.facility_id === facilityId.toString()
    );

    if (markerData) {
      const lat = parseFloat(markerData.lat);
      const lng = parseFloat(markerData.lot);
      setFocusPosition({ lat, lng });
      const position = new window.kakao.maps.LatLng(lat, lng);
      mapRef.current.panTo(position);
      mapRef.current.setLevel(2);

      // 해당 마커를 찾고 클릭 이벤트 트리거
      const marker = markersRef.current.find(
        (m) => m.facilityId === facilityId.toString()
      );
      if (marker) {
        // 클릭된 마커 보이기
        marker.setMap(mapRef.current);
        window.kakao.maps.event.trigger(marker, "click");
      } else {
        console.error(`Marker not found for facilityId: ${facilityId}`);
      }
    } else {
      console.error(`Marker data not found for facilityId: ${facilityId}`);
    }
  };

  const handleDetailClick = (facilityId: string) => {
    setSelectedFacilityId(facilityId);
  };

  return (
    <>
      <StyledMapContainer id="map">
        <StyledGoCurrentImg src={GoCurrent} onClick={handleCurrentLocation} />
      </StyledMapContainer>
      <SideBar
        keyword={keyword}
        facilityId={facilityId}
        onMarkerClick={handleMarkerClick}
        setIsSideBarData={setIsSideBarData}
        selectedFacilityId={selectedFacilityId}
      />
    </>
  );
};
