import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const Login = lazy(() => import("../pages/LoginPage"))
const Oauth = lazy(() => import("../pages/OauthPage"))
const Join = lazy(() => import("../pages/JoinPage"))
const Guide = lazy(() => import("../pages/GuidePage"))
const Notice = lazy(() => import("../pages/NoticePage"))
const Hire = lazy(() => import("../pages/HirePage"))
const Write = lazy(() => import("../pages/WritePage"))

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
 {
  path: "/guide",
  element: <Suspense fallback={Loading}><Guide/></Suspense>
 },
 {
  path: "/notice",
  element: <Suspense fallback={Loading}><Notice/></Suspense>
 },
 {
  path: "/hire",
  element: <Suspense fallback={Loading}><Hire/></Suspense>
 },
 {
  path: "/write",
  element: <Suspense fallback={Loading}><Write/></Suspense>
 },
])

export default root;