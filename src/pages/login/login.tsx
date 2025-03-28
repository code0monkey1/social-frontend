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
import { self, login } from "../../http/api";
import { Credentials } from "../../types";
import { useAuthStore } from "../../store";
import { usePermission } from "../../hooks/userPermission";
import { useLogout } from "../../hooks/useLogout";
import { useMutation, useQuery } from "@tanstack/react-query";

const loginUser = async (credentials: Credentials) => {
  const { data } = await login(credentials);
  return data;
};
const getSelf = async () => {
  const { data } = await self();
  return data;
};

const LoginPage = () => {

  const { isAllowed } = usePermission();

  console.log("Login Page Loaded")
  
  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf, 
    // do not trigger when component  is loaded , only when onSuccess is triggered after 
    // successful login , so set enabled true , so as to later use refetch() to get the 
    // user data using the cookies
    // obtained ones the user logs in 
    enabled: false,
  });
  
  const { setUser } = useAuthStore();
  const {logOut} = useLogout();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: loginUser, // will be send all data from when the form data is submitted
    mutationKey: ["login"],
    onSuccess: async () => { 

      // save userData to client zustand state after useQuery gets the users info from  getSelf call
      const { data } = await refetch(); 
      
      // only allow 'user' role users to log in to the frontend 
      if (!isAllowed(data)) {
        console.log(JSON.stringify(data, null, 2), "is not allowed");
        logOut();
        return;
      }

      setUser(data);
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
              onFinish={(values) => mutate(values)} // gets all the values once the form is filled and submitted 
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
