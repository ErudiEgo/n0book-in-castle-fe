import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { callChangePassword, callUploadAvatar } from "../../services/api";

const ChangePassword = (props) => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.account.user);
  const [isSubmit, setIsSubmit] = useState();
  const [initForm, setInitForm] = useState(null);

  useEffect(() => {
    if (user.id) {
      const init = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      };
      setInitForm(init);
      form.setFieldsValue(init);
    }
    return () => {
      form.resetFields();
    };
  }, [user]);

  const onFinish = async (values) => {
    const { email, oldpass, newpass, authNewpass } = values;

    if (newpass !== authNewpass) {
      message.error("Mật khẩu mới không trùng khớp!");
      return;
    } else {
      setIsSubmit(true);

      const res = await callChangePassword(email, oldpass, newpass);
      if (res && res.data) {
        message.success("Cập nhật mật khẩu thành công!");
        form.setFieldValue("oldpass", "");
        form.setFieldValue("newpass", "");
      } else {
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  return (
    <>
      <Row>
        <Col sm={24} md={12}>
          <Form
            form={form}
            name="form-change-info"
            onFinish={onFinish}
            labelAlign={"left"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            //autoComplecte="off"
          >
            <Form.Item label="ID" name="id" hidden>
              <Input placeholder="ID cannot change" disabled />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: "Không được để trống email." },
              ]}
              label="Email"
              name="email"
            >
              <Input placeholder="input placeholder" disabled />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Không được để trống mật khẩu hiện tại!",
                },
              ]}
              label="Mật khẩu hiện tại"
              name="oldpass"
            >
              <Input placeholder="Nhập mật khẩu hiện tại..." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Không được để trống mật khẩu",
                },
              ]}
              label="Mật khẩu mới"
              name="newpass"
            >
              <Input placeholder="Vui lòng nhập mật khẩu mới..." />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu mới",
                },
              ]}
              label="Nhập lại mật khẩu"
              name="authNewpass"
            >
              <Input placeholder="Nhập mật khẩu mới..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
