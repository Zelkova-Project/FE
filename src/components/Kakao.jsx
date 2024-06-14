import {useEffect, useState} from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
const { kakao } = window;

const Kakao = () => {
  const [state, setState] = useState (
      {center: {lat : 37.547450833697894, lng : 127.20462375027948}}
  );
  return (
      <>
        <Map center={state.center} style={{width: '1000px', height: '400px'}} level={3}>
          <MapMarker position={{lat: 37.547450833697894, lng: 127.20462375027948}} clickable={false}
                     image={{src: '/marker.png', size: {width: 40, height: 44}}}>
          </MapMarker>
        </Map>
      </>
  )
};

export default Kakao;
