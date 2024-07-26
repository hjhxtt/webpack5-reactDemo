import React from "react";
import { useLocation } from "react-router-dom";

function Demo1() {
  let location = useLocation();
  return <h3>我是Demo1组件;参数为：{location.state}</h3>
}

export default Demo1