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

        //-->  기본 맵 container, options, map 설정

    }, []);


    return (
        <StyledMapContainer id="map">

        </StyledMapContainer>
    )
}