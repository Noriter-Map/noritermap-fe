import React, { useEffect, useRef } from "react";

import MapPin from "../../assets/marker.svg";

interface KakaoRoadviewProps {
  lat: number;
  lng: number;
  radius?: number;
  pfctNm: string;
}

const KakaoRoadview: React.FC<KakaoRoadviewProps> = ({
  lat,
  lng,
  radius = 300,
    pfctNm,
}) => {
  const roadviewContainerRef = useRef<HTMLDivElement>(null);

  const normalSize = new window.kakao.maps.Size(42, 54);
  const normalOffset = new window.kakao.maps.Point(20, 54);
  const spriteImageSize = new window.kakao.maps.Size(138, 68);

  const markerImage = new window.kakao.maps.MarkerImage(MapPin, normalSize, {
    offset: normalOffset,
    spriteOrigin: new window.kakao.maps.Point(43, 0),
    spriteSize: spriteImageSize,
  });

  useEffect(() => {
    const { kakao } = window;

    if (!kakao || !kakao.maps) {
      console.error("Kakao maps script is not loaded.");
      return;
    }

    const roadviewContainer = roadviewContainerRef.current;
    if (!roadviewContainer) return;

    const roadview = new kakao.maps.Roadview(roadviewContainer);
    const roadviewClient = new kakao.maps.RoadviewClient();
    const position = new kakao.maps.LatLng(lat, lng);

    roadviewClient.getNearestPanoId(
      position,
      radius,
      function (panoId: number) {
        roadview.setPanoId(panoId, position);
      }
    );

    // 로드뷰 초기화 이벤트
    kakao.maps.event.addListener(roadview, 'init', () => {
      // 로드뷰에 올릴 마커를 생성합니다.
      const rMarker = new kakao.maps.Marker({
        image: markerImage,
        position: position,
        map: roadview     // map 대신 로드뷰 객체로 설정하면 로드뷰에 올라간다.
      });

      // 로드뷰에 올릴 장소명 인포윈도우를 생성한다.
      const rLabel = new kakao.maps.InfoWindow({
        position: position,
        content: pfctNm
      });
      rLabel.open(roadview, rMarker);

      // 로드뷰 마커가 중앙에 오도록 로드뷰의 viewpoint 를 조정한다.
      const projection = roadview.getProjection();    // viewpoint 값을 추출할 수 있는 projection 객체를 가져온다.

      // 마커의 position 과 altitude 값을 통해 viewpoint 값(화면좌표)을 추출한다.
      const viewpoint = projection.viewpointFromCoords(rMarker.getPosition(), rMarker.getAltitude());
      roadview.setViewpoint(viewpoint);   // 로드뷰에 뷰포인트를 설정한다.

      // 각 뷰포인트 값 초기화를 위해 저장해 놓는다.
      // TODO

    });
  }, [lat, lng, radius]);

  return (
    <div
      ref={roadviewContainerRef}
      style={{ width: "100%", height: "300px" }}
    ></div>
  );
};

export default KakaoRoadview;
