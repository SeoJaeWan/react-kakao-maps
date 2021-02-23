import React, { useState, useCallback } from "react";
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
  children,
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