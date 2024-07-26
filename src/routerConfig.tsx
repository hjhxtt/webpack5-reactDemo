import React from "react";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

// 懒加载：打包时打成单独的js，实现未展示时浏览器可以不加载对应的js，展示时才去加载 实现优化；需要搭配Suspense来使用
// prefetch 预加载
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /*webpackPrefetch: true*/
      "@/components/PreFetchDemo"
    )
);
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /*webpackPreload: true*/
      "@/components/PreloadDemo"
    )
);

const Demo1 = lazy(() => import("@/components/Demo1"));
const Demo2 = lazy(() => import("@/components/Demo2"));
const Demo2Child = lazy(() => import("@/components/Demo2Child"));
const LazyDemo = lazy(() => import("@/components/LazyDemo"));


const routeConfig = [
  { path: "/index", element: <PreFetchDemo /> },
  {
    path: "/product/:id",
    element: <PreloadDemo />,
  },
  {
    path: "/demo1",
    element: <Demo1 />,
  },
  {
    path: "/demo2",
    element: <Demo2 />,
    children: [{ path: ":subId", element: <Demo2Child /> }],
  },
  {
    path: "/lazyDemoe",
    element: <LazyDemo />,
  },
  
  { path: "*", element: <Navigate to="/index" replace /> },
];
export default routeConfig;
