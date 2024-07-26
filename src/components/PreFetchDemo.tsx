// src/components/PreFetchDemo.tsx
import React from "react";
import { useLocation } from "react-router-dom";
function PreFetchDemo() {
  let location = useLocation();
  return <h3>我是PreFetchDemo组件 参数为：{location.state}</h3>
}
export default PreFetchDemo