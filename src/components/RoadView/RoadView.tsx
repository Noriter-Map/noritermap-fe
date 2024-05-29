import React, { useEffect, useRef } from "react";

interface KakaoRoadviewProps {
  lat: number;
  lng: number;
  radius?: number;
}

const KakaoRoadview: React.FC<KakaoRoadviewProps> = ({
  lat,
  lng,
  radius = 300,
}) => {
  const roadviewContainerRef = useRef<HTMLDivElement>(null);

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
  }, [lat, lng, radius]);

  return (
    <div
      ref={roadviewContainerRef}
      style={{ width: "100%", height: "300px" }}
    ></div>
  );
};

export default KakaoRoadview;
