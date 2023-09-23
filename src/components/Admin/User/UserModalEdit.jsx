import { Divider, Form, Input, Modal, message, notification } from "antd";
import { useEffect, useState } from "react";
import { callCreateAUser, callUpdateUser } from "../../../services/api";

const UserModalEdit = (props) => {
  const { openModalEdit, setOpenModalEdit, dataUpdate, setDataUpdate } = props;

  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { _id, fullName, phone } = values;
    const dataTransfer = { _id, fullName, phone };
    setIsSubmit(true);
    const res = await callUpdateUser(dataTransfer);

    if (res && res.data) {
      setOpenModalEdit(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra.",
        description: res.message,
      });
    }
  };

  const fillData = () => {
    form.setFieldsValue(dataUpdate);
  };

  useEffect(() => {
    if (dataUpdate._id) {
    }
  }, [dataUpdate]);

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title="Edit a user"
        open={openModalEdit}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalEdit(false)}
        okText={"Save edit"}
        cancelText={"Cancel"}
        confirmLoading={isSubmit}
        maskClosable={false}
      >
        <Form
          form={form}
          name="edit-user-form"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplecte="off"
          //initialValues={dataUpdate}
        >
          <Form.Item hidden labelCol={{ span: 24 }} label="ID: " name="_id">
            <Input />
          </Form.Item>

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
            <Input disabled={true} />
          </Form.Item>

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
        </Form>
      </Modal>
    </>
  );
};

export default UserModalEdit;
