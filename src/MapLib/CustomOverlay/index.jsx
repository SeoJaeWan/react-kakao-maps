import React, {
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { KakaoMapContext } from "../KakaoMap";
import { MarkerContext } from "../Marker";
import ReactDOMServer from "react-dom/server";
import CustomOverlayContainer from "../CustomOverlayContainer";

CustomOverlay.propTypes = {
  content: PropTypes.object.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default function CustomOverlay({
  content,
  lat,
  lng,
  onClick,
  move,
  ...restOptions
}) {
  const { kakaoMapObj, map } = useContext(KakaoMapContext);
  const { marker, height: markerHeight } = useContext(MarkerContext);
  const [overlay, setOverlay] = useState(null);

  const getPosition = useCallback(
    (marker) => ({
      overlayLat: marker ? marker.getPosition().getLat() : lat,
      overlayLng: marker ? marker.getPosition().getLng() : lng,
    }),
    [marker]
  );

  const getOverlayContent = useCallback(
    (marker) =>
      marker
        ? ReactDOMServer.renderToString(
            <CustomOverlayContainer
              {...{ content }}
              bottom={`${markerHeight}px`}
              onClick={onClick}
            />
          )
        : ReactDOMServer.renderToString(content),
    [marker]
  );

  const getYAnchor = useCallback((marker) => (marker ? 1 : 0.5), [marker]);

  const overlayState = useMemo(() => {
    return {
      position: getPosition(marker),
      content: getOverlayContent(marker),
      yAnchor: getYAnchor(marker),
    };
  }, [marker]);

  useEffect(() => {
    if (!map || !overlayState) return;
    const { position, content, yAnchor } = overlayState;

    const customOverlay = new kakaoMapObj.maps.CustomOverlay({
      position: new kakaoMapObj.maps.LatLng(
        position.overlayLat,
        position.overlayLng
      ),
      content,
      yAnchor,
      ...restOptions,
    });
    customOverlay.setMap(map);
    setOverlay(customOverlay);

    return () => customOverlay.setMap(null);
  }, [map, overlayState]);

  useEffect(() => {
    if (overlay && move) {
      const moveLatLon = new kakao.maps.LatLng(move[0], move[1]);

      overlay.setPosition(moveLatLon);
    }
  }, [overlay, move]);

  return null;
}
