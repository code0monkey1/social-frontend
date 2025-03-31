import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";
import Layout from "antd/es/layout";
import classNames from "classnames";

import  {
  BellFilled,
  ContactsOutlined,
  HomeOutlined,
  MoonFilled,
  ReadOutlined,
  SunFilled,
  TeamOutlined,
  UserOutlined,
}from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import Logo from "../components/icons/Logo";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";

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
const { Sider, Header, Content, Footer } = Layout;

const items = [
  {
    key: "/",  // the key should always be unique 
    icon: <HomeOutlined />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: "/feed",
    icon: <ReadOutlined />,
    label: <NavLink to="/feed">Feed</NavLink>,
  },
  {
    key: "/friends",
    icon: <TeamOutlined />,
    label: <NavLink to="/friends">Friends</NavLink>,
  },
  {
    key: "/people",
    icon: <ContactsOutlined />,
    label: <NavLink to="/people">People</NavLink>,
  },
];

const DashBoard = () => {

  // used to dynamically switch the theme
  const [light, setLight] = useState<MenuTheme | undefined>("light");
  const { logOut } = useLogout();
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const { user } = useAuthStore();
  
  // get the user details from zustand store
  // if user is not present , redirect them to auth/login route (Login Page )

  if (user==null) {
    return <Navigate to="/auth/login" replace={true} />;
  }
 // theme switcher 
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
            defaultSelectedKeys={["/"]}
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
          <Content style={{ margin: "24px" }}>
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

export default DashBoard;
