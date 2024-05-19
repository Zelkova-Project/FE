import {useEffect} from 'react';

const {kakao} = window;

const Kakao = () => {
 useEffect(() => {
   const container = document.getElementById('map');
   const options = {
     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
     level:3
   };
   
   const map = new kakao.maps.Map(container,options);
  }, [])

  return (
   <div id="map" style={{width: '1080px', height: '400px'}}>

   </div>
  )
}


export default Kakao
