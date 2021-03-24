import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useKakaoMapLoad } from "../../hooks";
import MapContainer from "../MapContainer";
import { defaultMapOptions } from "../../constants";

KakaoMap.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export const KakaoMapContext = React.createContext({});

export default function KakaoMap({
  apiUrl,
  width,
  height,
  setLevel,
  isEvent,
  children,
  move,
  ...options
}) {
  const { kakaoMapObj } = useKakaoMapLoad({
    apiUrl,
  });

  const [map, setMap] = useState(null);

  const loadHandler = useCallback(
    (element) => {
      if (!kakaoMapObj || !element) return;
      const {
        level: defaultLevel,
        lat: defaultLat,
        lng: defaultLng,
        draggable: defalutDraggable,
        scrollwheel: defalutScrollwheel,
        doubleClick: defalutDoubleClick,
        doubleClickZoom: defalutDoubleClickZoom,
      } = defaultMapOptions;

      const {
        level = defaultLevel,
        lat = defaultLat,
        lng = defaultLng,
        draggable = defalutDraggable,
        scrollwheel = defalutScrollwheel,
        doubleClick = defalutDoubleClick,
        doubleClickZoom = defalutDoubleClickZoom,
      } = options;
      const map = new kakaoMapObj.maps.Map(element, {
        level,
        center: new kakaoMapObj.maps.LatLng(lat, lng),
        draggable: draggable,
        scrollwheel: scrollwheel,
        disableDoubleClick: doubleClick,
        disableDoubleClickZoom: doubleClickZoom,
      });

      setMap(map);
    },
    [kakaoMapObj]
  );

  useEffect(() => {
    if (map)
      map.setLevel(setLevel, isEvent ? { animate: { duration: 500 } } : null);
  }, [map, setLevel]);

  useEffect(() => {
    if (map && move) {
      const moveLatLon = new kakao.maps.LatLng(move[0], move[1]);

      map.setCenter(moveLatLon);
    }
  }, [map, move]);

  return (
    <MapContainer
      {...{
        width: width || defaultMapOptions.width,
        height: height || defaultMapOptions.height,
      }}
      ref={loadHandler}
    >
      <KakaoMapContext.Provider value={{ kakaoMapObj, map }}>
        {children}
      </KakaoMapContext.Provider>
    </MapContainer>
  );
}
