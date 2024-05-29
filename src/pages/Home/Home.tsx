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
        clickedMarkerAndOverlayRef.current = null;
      }
    });

    mapRef.current = mapInstance;
    console.log(process.env.REACT_APP_BASEURL);
  }, []);

  useEffect(() => {
    const fetchMarkerData = async () => {
      try {
        const data = await getFacilitiesMarkerData();
        console.log(data);
        setMarkerDatas(data.data);
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    };
    fetchMarkerData();
  }, []);

  useEffect(() => {
    if (markerDatas.length === 0 || !mapRef.current) return;

    const newMarkers = markerDatas.map((data) => {
      const imageSize = new window.kakao.maps.Size(34, 35);
      const markerImage = new window.kakao.maps.MarkerImage(MapPin, imageSize);

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          parseFloat(data.lat),
          parseFloat(data.lot)
        ),
        title: data.pfct_nm,
        image: markerImage,
      });

      marker.facilityId = data.facility_id; // 마커 객체에 시설 ID를 저장

      window.kakao.maps.event.addListener(marker, "click", async () => {
        console.log("클릭은 되니?");
        if (clickedMarkerAndOverlayRef.current) {
          const curOverlay = clickedMarkerAndOverlayRef.current[1];
          curOverlay && curOverlay.setMap(null);
        }

        console.log("try 전");

        try {
          console.log("try안 getReviewData 전");
          const reviewData = await getReviewData(marker.facilityId);
          console.log("reviewData", reviewData); // 1
          const overlayProps = {
            facility_id: data.facility_id,
            pfct_nm: data.pfct_nm,
            addr: data.addr,
            zip: data.zip ? data.zip : "",
            rating: reviewData.rating,
            reviewCnt: reviewData.reviewCnt,
          };

          console.log("overlayProps : ", overlayProps); // 2
          const overlayContent = overlayComponentToString(overlayProps);

          console.log("overlayContent : ", overlayContent); // 3
          const overlay = new window.kakao.maps.CustomOverlay({
            content: overlayContent,
            position: marker.getPosition(),
            clickable: true,
          });

          console.log("overlay : ", overlay); // 4

          overlay.setMap(mapRef.current);

          console.log("overlay.setMap"); // 5
          clickedMarkerAndOverlayRef.current = [marker, overlay];
          console.log("clickedMarkerAndOverlayRef.current"); // 6
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
    console.log("isSideBarData changed:", isSideBarData); // 디버깅용 로그 추가

    if (isSideBarData && isSideBarData.data.content.length > 0) {
      const firstFacility = isSideBarData.data.content[0];
      const lat = parseFloat(firstFacility.latCrtsVl);
      const lng = parseFloat(firstFacility.lotCrtsVl);
      const position = new window.kakao.maps.LatLng(lat, lng);
      console.log("New map center position:", position);
      mapRef.current.panTo(position);
      mapRef.current.setLevel(3);

      // 해당 마커 찾기 및 보이기
      const marker = markersRef.current.find(
        (m) => m.facilityId === firstFacility.facilityId.toString()
      );
      if (marker) {
        console.log("Found marker for facilityId:", firstFacility.facilityId); // 디버깅용 로그 추가
        // 클릭된 마커 보이기
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
      />
    </>
  );
};
