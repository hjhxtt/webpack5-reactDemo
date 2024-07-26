import React from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

function Demo2() {
  // 动态路由参数
  let location = useLocation();
  console.log('location',location);
  // ?后的参数
  const [searchParams, setSearchParams] = useSearchParams();
  console.log('searchParams',[...searchParams.values()]);
  
  return <>
    <h3>我是Demo2组件;参数为：{location.state}</h3>
    <p>下面这个为demo2嵌套组建</p>
    <Outlet />
  </>
}

export default Demo2