import LockFilled from "@ant-design/icons/lib/icons/LockFilled";
import { Card, Layout, Space } from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
const layoutStyle = {
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};
const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};
const LoginPage = () => {
  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          <Card
            title={
              <div
                style={{
                  fontSize: "20px",
                  paddingInline: "10px",
                }}
              >
                <Space>
                  <LockFilled />
                  Login Page
                </Space>
              </div>
            }
            style={{
              width: 300,
              height: 300,
              backgroundColor: "skyblue",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                <Space>
                  <span style={{ marginRight: "10px" }}>Username</span>
                  <input
                    type="text"
                    placeholder="Username"
                    style={{ padding: "5px" }}
                  />
                </Space>
              </div>
              <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                <Space>
                  <span style={{ marginRight: "10px" }}>Password</span>
                  <input
                    type="text"
                    placeholder="password"
                    style={{ padding: "5px" }}
                  />
                </Space>
              </div>
            </div>
          </Card>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </>
  );
};

export default LoginPage;
