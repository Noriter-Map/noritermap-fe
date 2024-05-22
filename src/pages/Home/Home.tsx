import {StyledMapContainer} from "./Home.style";
import {useEffect} from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

export const Home = () => {
    useEffect(() => {
        let mapContainer = document.getElementById(`map`);
        let mapOption = {
            center: new window.kakao.maps.LatLng(37.494539, 126.959929), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
            mapTypeId: window.kakao.maps.MapTypeId.ROADMAP, // 지도종류
        }
        let map = new window.kakao.maps.Map(mapContainer, mapOption);   // 지도를 생성

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        let mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT); // 지도 타입 컨트롤을 지도에 표시합니다

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        let zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        //-->  기본 맵 container, options, map 설정

    }, []);


    return (
        <StyledMapContainer id="map">

        </StyledMapContainer>
    )
}