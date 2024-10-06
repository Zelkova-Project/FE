import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const KakaoRedirectPage = () => {

 const [searchParam] = useSearchParams();

 const authCode = searchParam.get("code");

 useEffect(() => { 
  console.log('authCode >>> ', authCode);
 }, [authCode]);

 return (
  <>
  
  </>
 )
}

export default KakaoRedirectPage;