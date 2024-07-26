// src/components/PreloadDemo.tsx
import React from "react";
import { useParams } from "react-router-dom";
function PreloadDemo() {
  const params = useParams()
  console.log('params',params);
  
  return <h3>我是PreloadDemo组件</h3>
}
export default PreloadDemo