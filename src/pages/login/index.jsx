import LogoWeb from "../../assets/Book-Castle-Logo.png";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  message,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import "./login.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Check isAuthenticated trong if: ", isAuthenticated);
    if (user && isAuthenticated === true) {
      //navigate("/");
      // toast.success("Login succeed~");
    }
  }, [user]);

  const onFinish = async (values) => {
    const { username, password } = values;
    const dataTransfer = { username, password, delay: 1000 };
    setIsSubmit(true);
    const res = await callLogin(dataTransfer);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Đăng nhập tài khoản thành công!");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="login-page">
      <main className="main">
        <div className="container" style={{ width: "100vw" }}>
          <section className="wrapper">
            <Row>
              <Col span={12}>
                <div className="heading">
                  <h2
                    className="text text-large"
                    style={{ textAlign: "center" }}
                  >
                    Đăng nhập
                  </h2>
                  <Divider />
                </div>
                <Form
                  name="basic"
                  style={{ maxWidth: 600, margin: "0 auto" }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    label="Email"
                    name="username"
                    rules={[
                      { required: true, message: "Email không được để trống!" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Your email here...."
                    />
                  </Form.Item>

                  <Form.Item
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Mật khẩu không được để trống!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Your password here...."
                    />
                  </Form.Item>

                  <Form.Item
                    className="btn-login-btn"
                    // wrapperCol={{ offset: 6, span: 16 }}
                  >
                    <Button
                      size="large"
                      type="primary"
                      style={{ width: "100%" }}
                      htmlType="submit"
                      loading={isSubmit}
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                  <Divider>Or</Divider>
                  <p className="text text-normal">
                    Chưa có tài khoản ?
                    <span>
                      <Link to="/register"> Đăng ký </Link>
                    </span>
                    hoặc
                    <span>
                      <Link to="/"> Trở lại trang chủ </Link>
                    </span>
                  </p>
                </Form>
              </Col>
              <Col className="container-logo" span={12}>
                <img src={LogoWeb} className="img-logo" alt="logo"></img>
              </Col>
            </Row>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
