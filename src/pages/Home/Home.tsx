import { StyledMapContainer } from "./Home.style";
import { useEffect, useState, useRef } from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import { getFacilitiesMarkerData } from "../../apis/getFacilitiesMarkerData";
import MapPin from '../../assets/Map_pin.svg';

declare global {
    interface Window {
        kakao: any;
    }
}

interface MarkerDataType {
    facility_id: string,
    lat: string,
    lot: string,
    pfct_nm: string,
    addr: string,
    instl_place_cd_nm: string,
}

export const Home = () => {
    const [markerDatas, setMarkerDatas] = useState<MarkerDataType[]>([]);
    const mapRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);

    useEffect(() => {
        let mapContainer = document.getElementById('map');
        let mapOption = {
            center: new window.kakao.maps.LatLng(37.494539, 126.959929), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
            mapTypeId: window.kakao.maps.MapTypeId.ROADMAP, // 지도종류
        }
        let mapInstance = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        let mapTypeControl = new window.kakao.maps.MapTypeControl();
        mapInstance.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT); // 지도 타입 컨트롤을 지도에 표시합니다

        // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
        let zoomControl = new window.kakao.maps.ZoomControl();
        mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        mapRef.current = mapInstance;
    }, []);

    useEffect(() => {
        const fetchMarkerData = async () => {
            try {
                const data = await getFacilitiesMarkerData();
                setMarkerDatas(data.data);
            } catch (error) {
                console.error('Error fetching marker data:', error);
            }
        };
        fetchMarkerData();
    }, []);

    useEffect(() => {
        if (markerDatas.length === 0 || !mapRef.current) return;

        // 마커가 이미 생성된 경우 추가 생성하지 않음
        if (markersRef.current.length > 0) return;

        // 새로운 마커들을 생성하고 지도에 추가
        const newMarkers = markerDatas.map(data => {
            // 마커 이미지의 이미지 크기 입니다
            const imageSize = new window.kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            const markerImage = new window.kakao.maps.MarkerImage(MapPin, imageSize);

            // 마커를 생성합니다
            const marker = new window.kakao.maps.Marker({
                map: mapRef.current, // 마커를 표시할 지도
                position: new window.kakao.maps.LatLng(parseFloat(data.lat), parseFloat(data.lot)), // 마커를 표시할 위치
                title: data.pfct_nm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지
            });

            return marker;
        });

        // 생성된 마커들을 상태로 저장
        markersRef.current = newMarkers;
    }, [markerDatas]);

    return (
        <>
            <StyledMapContainer id="map"></StyledMapContainer>
            <SideBar></SideBar>
        </>
    )
}
