import { LockOutlined, UserOutlined } from "@ant-design/icons";
import LockFilled from "@ant-design/icons/lib/icons/LockFilled";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  Space,
} from "antd";
import Logo from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { self, login } from "../../http/api";
import { Credentials } from "../../types";

const loginUser = async (credentials: Credentials) => {
  const { data } = await login(credentials);
  return data;
};

const getSelf = async () => {
  const { data } = await self();
  return data;
};
const LoginPage = () => {
  const { data: selfData, refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
    // only execute when onSuccess function is reached in useMutation
  });

  const { mutate, isError, isPending } = useMutation({
    mutationFn: loginUser,
    mutationKey: ["login"],
    onSuccess: async () => {
      // save userData to client state
      refetch();

      console.log("The user data is", JSON.stringify(selfData, null, 2));
    },
  });

  return (
    <>
      <Layout
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Space size="large" direction="vertical">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            style={{
              width: 300,
            }}
            title={
              <Space
                style={{
                  fontSize: 16,
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <LockFilled />
                Login Page
              </Space>
            }
          >
            <Form
              onFinish={(values) => mutate(values)}
              initialValues={{ email: "your@email", password: "password" }}
            >
              {isError && (
                <Alert
                  style={{ marginBottom: 20, textAlign: "center" }}
                  message="Error Text"
                  type="error"
                />
              )}
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item valuePropName="checked">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <a href="">Forgot Password</a>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  loading={isPending}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
