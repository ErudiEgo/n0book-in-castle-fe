import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  message,
  notification,
} from "antd";
import { useState } from "react";
import { callCreateAUser } from "../../../services/api";

const UserModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate, ...rest } = props;

  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    const dataCreate = { fullName, password, email, phone };
    setIsSubmit(true);

    const res = await callCreateAUser(dataCreate);

    if (res && res.data) {
      message.success("Tạo mới user thành công!");
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra.",
        description: res.message,
      });
    }
  };

  return (
    <>
      <Modal
        width={"60vw"}
        title="Add a new user"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        okText={"Save new"}
        cancelText={"Cancel"}
        confirmLoading={isSubmit}
        maskClosable={false}
      >
        <Divider />

        <Form
          style={{ width: "auto" }}
          form={form}
          name="create-user-form"
          onFinish={onFinish}
          autoComplecte="off"
        >
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email: "
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                span={12}
                labelCol={{ span: 24 }}
                label="Password: "
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="User's name: "
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên hiển thị!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Phone: "
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalCreate;
