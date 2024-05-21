import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const Login = lazy(() => import("../pages/LoginPage"))
const Oauth = lazy(() => import("../pages/OauthPage"))
const Join = lazy(() => import("../pages/JoinPage"))

const root = createBrowserRouter([
 {
  path: "",
  element: <Suspense fallback={Loading}><Main/></Suspense>
 },
 {
  path: "/login",
  element: <Suspense fallback={Loading}><Login/></Suspense>
 },
 {
  path: "/oauth",
  element: <Suspense fallback={Loading}><Oauth/></Suspense>
 },
 {
  path: "/join",
  element: <Suspense fallback={Loading}><Join/></Suspense>
 },
])

export default root;