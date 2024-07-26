import React from "react";
import { useParams } from "react-router-dom";

function Demo2Child() {
  const params = useParams()
  console.log('Demo2Childparams',params);
  return <h3>我是demo2的子页面;参数:{params.subId}</h3>
}

export default Demo2Child