import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";
import Layout from "antd/es/layout";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Menu,
  MenuTheme,
  Space,
  theme,
} from "antd";
import classNames from "classnames";
import {
  BellFilled,
  HomeOutlined,
  MoonFilled,
  ReadOutlined,
  SunFilled,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import Logo from "../components/icons/Logo";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";

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

  const { logOut } = useLogout();

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
            style={{
              //Update background color based on light theme
              paddingLeft: "16px",
              paddingRight: "16px",
              background: light === "light" ? colorBgContainer : "#001529", //
            }}
          >
            <Flex justify="end" gap="middle" align="end">
              <Space align="center" size={16}>
                <Badge dot={true}>
                  <BellFilled />
                </Badge>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => {
                          logOut();
                        },
                      },
                    ],
                  }}
                  placement="bottomRight"
                  arrow
                >
                  <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
              </Space>
            </Flex>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}

            <Outlet />
          </Content>
          <Footer
            className={classNames(
              "customFooter",
              light !== "light" ? "customFooterDark" : ""
            )}
          >
            <span className="customFooterText">Common Networking Site</span>
            {light === "light" ? (
              <MoonFilled className="customMoonFilled" onClick={switchLight} />
            ) : (
              <SunFilled className="customSunFilled" onClick={switchLight} />
            )}
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default User;
