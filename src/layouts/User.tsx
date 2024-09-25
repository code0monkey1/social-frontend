import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";
import Layout from "antd/es/layout";
import { Menu, MenuTheme, theme } from "antd";

import {
  HomeOutlined,
  MoonFilled,
  ReadOutlined,
  SunFilled,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import Logo from "../components/icons/Logo";
import { useState } from "react";

const { Sider, Header, Content, Footer } = Layout;

const items = [
  {
    key: "/user/home",
    icon: <HomeOutlined />,
    label: <NavLink to="/user/home">Home</NavLink>,
  },
  {
    key: "/user/feed",
    icon: <ReadOutlined />,
    label: <NavLink to="/user/feed">Feed</NavLink>,
  },
];
const User = () => {
  // get the user details
  // if user is not present , redirect them to auth route
  const [light, setLight] = useState<MenuTheme | undefined>("light");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  const switchLight = () => {
    if (light === "light") {
      setLight("dark");
    } else {
      setLight("light");
    }
  };

  return (
    <>
      {" "}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme={light}>
          <div className="logo">
            <Logo />
          </div>
          <Menu
            theme={light}
            defaultSelectedKeys={["/user/home"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            onClick={switchLight}
            style={{
              padding: "1rem",
              //Update background color based on light theme
              background: light === "light" ? colorBgContainer : "#001529", //
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {light === "light" ? (
              <MoonFilled style={{ fontSize: "25px" }} />
            ) : (
              <SunFilled style={{ fontSize: "25px", color: "white" }} />
            )}
          </Header>
          <Content style={{ margin: "0 16px" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}

            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Common Networking Site
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default User;
