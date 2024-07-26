import React, { lazy, Suspense } from "react";
import LazyDemo from "@/components/LazyDemo";
import { Demo2 } from "@/components";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Demo2Child from "@/components/Demo2Child";

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
const RouteComponent: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/index"
          element={
            <Suspense fallback={<div>加载中</div>}>
              <PreFetchDemo />
            </Suspense>
          }
        />
        {/* 动态路由 */}
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<div>加载中</div>}>
              <PreloadDemo />
            </Suspense>
          }
        />
        <Route
          path="/demo1"
          element={
            <Suspense fallback={<div>加载中</div>}>
              <Demo1 />
            </Suspense>
          }
        />
        <Route path="/lazyDemoe" element={<LazyDemo />} />
        {/* 嵌套路由 */}
        <Route path="/demo2" element={<Demo2 />}>
          <Route path=":subId" element={<Demo2Child />} />
        </Route>

        {/* 兜底路由 */}
        <Route path="*" element={<Navigate to="/index" />} />
      </Routes>
    </div>
  );
};
export default RouteComponent;
