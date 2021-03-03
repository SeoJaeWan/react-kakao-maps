# react-full-kakao-maps

Base Source : https://github.com/fed-gren/react-kakao-maps

## Supported features

---

- Map
- Marker
- Custom Overlay

<br/>

## Installation

---

```sh
npm install --save react-full-kakao-maps #or
yarn add react-full-kakao-maps
```

## Custom

Kakao Map(Props)

draggable (default : false) <br />
scrollwheel (default : false) <br />
doubleClick (default : false) <br />
doubleClickZoom (default : false) <br />

<br/>

## Example

```
import { KakaoMap, Marker } from "react-full-kakao-maps";

...

<KakaoMap
    apiUrl={`//dapi.kakao.com/v2/maps/sdk.js?appkey=your App key&autoload=false`}
    width={`100%`}
    height={`100%`}
    draggable
    scrollwheel
    doubleClick
    doubleClickZoom
    level={6}
    lat={lat}
    lng={lng}
>
    <Marker lat={lat} lng={lng}></Marker>
</KakaoMap>
```
