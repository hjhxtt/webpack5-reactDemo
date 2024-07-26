import React, { Suspense } from "react";
import Class from "./components/Class";
import "./app.less";
import { Link, NavLink, useNavigate, useRoutes } from "react-router-dom";
import routes from "./routerConfig";
import RouteComponent from "@/components/RouteComponent";
import { Button, Card, Col, Row, Space } from "antd";

function App() {
  const navigate = useNavigate();
  const elements = useRoutes(routes);

  const handelClickToDemo1 = () => {
    navigate("/demo1", { state: "handelClickToDemo1" });
  };
  return (
    <>
      <Space>
        <Button onClick={handelClickToDemo1}>编程式导航demo1</Button>
        <Button>
          <Link
            to={{
              pathname: "/demo2",
              search: "?sort=date",
              hash: "#hash",
            }}
            state={"show index"}
          >
            demo2
          </Link>
        </Button>
        <Button>
          <Link
            to={{
              pathname: "/demo2/123",
            }}
            state={"show index"}
          >
            demo2嵌套组件
          </Link>
        </Button>
        <Button>
          <Link
            to={{
              pathname: "/index",
              search: "?sort=date&a=1",
              hash: "#hash",
            }}
            state={"show index"}
          >
            首页(含参数-PreFetchDemo)
          </Link>
        </Button>

        <Button>
          <NavLink to="product/123" state={"show About"}>
            产品(子路游含状态-PreloadDemo)
          </NavLink>
        </Button>

        <Button>
          <div onClick={() => navigate("/lazyDemoe")}>懒加载demo</div>
        </Button>
      </Space>

      <br />
      <p>以下为路由界面</p>
      <hr />
      <Row>
        <Col span={12}>
          <Card title="普通路由模式">
            <RouteComponent />
          </Card>{" "}
        </Col>
        <Col span={12}>
          <Card title="route配置式">
            <Suspense fallback={<div>Loading...</div>}>{elements}</Suspense>
          </Card>
        </Col>
      </Row>
      <hr />
      {/* 类组件demo */}
      <p>类组件demo</p>
      <hr />
      <Class />
    </>
  );
}
export default App;
