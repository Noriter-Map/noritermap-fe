import { StyledGoCurrentImg, StyledMapContainer } from "./Home.style";
import { useEffect, useState, useRef } from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import { getFacilitiesMarkerData } from "../../apis/getFacilitiesMarkerData";
import MapPin from "../../assets/Map_pin.svg";
import { renderToStaticMarkup } from "react-dom/server";
import { Overlay } from "../../components/Overlay/Overlay";
import { useNavigate, useParams } from "react-router-dom";
import { MarkerDataType, OverlayProps } from "../../types/Map.type";
import GoCurrent from "../../assets/GoCurrent.svg";
import CurrentIcon from "../../assets/CurrentMarker.svg";
import { getReviewData } from "../../apis/getReviewData";

declare global {
  interface Window {
    kakao: any;
  }
}

const overlayComponentToString = (props: OverlayProps) => {
  return renderToStaticMarkup(
    <Overlay
      facility_id={props.facility_id}
      pfct_nm={props.pfct_nm}
      rating={props.rating}
      reviewCnt={props.reviewCnt}
      addr={props.addr}
      zip={props.zip}
    />
  );
};

export const Home = () => {
  const { paramFacilityId } = useParams(); // 없으면 null이 아니라 undefined이다.
  const [markerDatas, setMarkerDatas] = useState<MarkerDataType[]>([]);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const clickedMarkerAndOverlayRef = useRef<[any, any] | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const currentMarkerRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mapContainer = document.getElementById("map");
    let mapOption = {
      center: new window.kakao.maps.LatLng(35.160048, 126.851309), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
      mapTypeId: window.kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };
    let mapInstance = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    let mapTypeControl = new window.kakao.maps.MapTypeControl();
    mapInstance.addControl(
      mapTypeControl,
      window.kakao.maps.ControlPosition.TOPRIGHT
    ); // 지도 타입 컨트롤을 지도에 표시합니다

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
    let zoomControl = new window.kakao.maps.ZoomControl();
    mapInstance.addControl(
      zoomControl,
      window.kakao.maps.ControlPosition.RIGHT
    );

    // 지도를 클릭하면 현재 활성화된 인포윈도우를 닫고, 상태를 초기화하는 이벤트 리스너 추가
    window.kakao.maps.event.addListener(mapInstance, "click", () => {
      if (clickedMarkerAndOverlayRef.current) {
        const curOverlay = clickedMarkerAndOverlayRef.current[1];
        curOverlay.setMap(null);
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

  useEffect(() => {
    if (markerDatas.length === 0 || !mapRef.current) return;

    // 새로운 마커들을 생성하고 지도에 추가
    const newMarkers = markerDatas.map((data) => {
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new window.kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(MapPin, imageSize);

      // 마커를 생성합니다
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          parseFloat(data.lat),
          parseFloat(data.lot)
        ), // 마커를 표시할 위치
        title: data.pfct_nm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      marker.facilityId = data.facility_id; // 마커 객체에 시설 ID를 저장합니다.

      const overlayProps: OverlayProps = {
        facility_id: data.facility_id,
        pfct_nm: data.pfct_nm,
        addr: data.addr,
        zip: data.zip,
        rating: 0, // 초기값
        reviewCnt: 0, // 초기값
      };

      // 마커에 클릭 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "click", async () => {
        if (clickedMarkerAndOverlayRef.current) {
          const curOverlay = clickedMarkerAndOverlayRef.current[1];
          curOverlay && curOverlay.setMap(null);
        }

        try {
          const reviewData = await getReviewData(marker.facilityId);
          overlayProps.rating = reviewData.rating;
          overlayProps.reviewCnt = reviewData.reviewCnt;
        } catch (error) {
          console.error("Error fetching review data:", error);
        }

        const overlayContent = overlayComponentToString(overlayProps);
        const overlay = new window.kakao.maps.CustomOverlay({
          content: overlayContent,
          position: marker.getPosition(),
          clickable: true,
        });

        overlay.setMap(mapRef.current);
        clickedMarkerAndOverlayRef.current = [marker, overlay];

        onNavigateFacility(marker.facilityId); // 마커를 클릭하면 주소가 바뀝니다.
      });

      marker.setMap(mapRef.current); // 마커를 지도에 추가합니다

      return marker;
    });

    // 생성된 마커들을 상태로 저장
    markersRef.current = newMarkers;
  }, [markerDatas]);

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

  return (
    <>
      <StyledMapContainer id="map">
        <StyledGoCurrentImg src={GoCurrent} onClick={handleCurrentLocation} />
      </StyledMapContainer>
      <SideBar />
    </>
  );
};
