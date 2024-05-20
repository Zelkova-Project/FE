import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const Login = lazy(() => import("../pages/LoginPage"))

const root = createBrowserRouter([
 {
  path: "",
  element: <Suspense fallback={Loading}><Main/></Suspense>
 },
 {
  path: "/login",
  element: <Suspense fallback={Loading}><Login/></Suspense>
 },
])

export default root;