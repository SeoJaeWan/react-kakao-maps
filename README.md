# react-full-kakao-maps

Base Source : https://github.com/fed-gren/react-kakao-maps

## Supported features

---

- Map
- Marker
- Custom Overlay &nbsp;X&nbsp; -&nbsp;(Test &nbsp;: &nbsp;not &nbsp;Work!!)

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
<br/>
<br/>

```
<KakaoMap
    apiUrl={`//dapi.kakao.com/v2/maps/sdk.js?appkey=434be05b9efb9664b63c52aa8e2210a7&autoload=false`}
    width={`100%`}
    height={`100%`}
    draggable
    scrollwheel
    doubleClick
    doubleClickZoom
    level={6}
    lat={35.171016}
    lng={126.855762}
>
    <Marker lat={35.171016} lng={126.855762}></Marker>
</KakaoMap>
```
