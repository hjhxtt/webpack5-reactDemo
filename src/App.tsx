import React, { lazy, Suspense, useState } from 'react'
import smallImg from './assets/imgs/5kb.png'
import bigImg from './assets/imgs/22kb.png'
import Class from './components/Class'
import './app.less'
import { Demo1, Demo2} from './components'


// 懒加载：打包时打成单独的js，实现未展示时浏览器可以不加载对应的js，展示时才去加载 实现优化
// prefetch 预加载
const PreFetchDemo = lazy(() => import(
  /* webpackChunkName: "PreFetchDemo" */
  /*webpackPrefetch: true*/
  '@/components/PreFetchDemo'
))
// preload
const PreloadDemo = lazy(() => import(
  /* webpackChunkName: "PreloadDemo" */
  /*webpackPreload: true*/
  '@/components/PreloadDemo'
 ))

function App() {
  const [ show, setShow ] = useState(false)

  const onClickSSSSSSS = () => {
    setShow(true)
  }
  return (
    <>
      <h2 onClick={onClickSSSSSSS}>展示123</h2>
      <Class />
      {/* show为true时加载组件 */}
      { show && (
        <>
          <img src={smallImg} alt="小于10kb的图片" />
          <img src={bigImg} alt="大于于10kb的图片" />
          <div className='smallImg'></div> {/* 小图片背景容器 */}
          <div className='bigImg'></div> {/* 大图片背景容器 */}
          <Suspense fallback={null}><PreFetchDemo /></Suspense>
          <Suspense fallback={null}><PreloadDemo /></Suspense>
          <Demo1 />
        </>
      ) }
    </>
  )
}
export default App