import { useEffect, useState } from "react";

import { callUploadAvatar, callUploadUserInfo } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";

import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  message,
  notification,
} from "antd";

import {
  doUpdateUserInfoAction,
  doUploadAvatarAction,
} from "../../redux/account/accountSlice";

const UserInfo = (props) => {
  const user = useSelector((state) => state.account.user);

  const tempAvatar = useSelector((state) => state.account.tempAvatar);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [userAvatar, setUserAvatar] = useState(user?.avatar ?? "");
  const [isSubmit, setIsSubmit] = useState(false);
  const [initForm, setInitForm] = useState(null);

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    tempAvatar || user?.avatar
  }`;

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

  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    const res = await callUploadAvatar(file);
    if (res && res.data) {
      const newAvatar = res.data.fileUploaded;
      dispatch(doUploadAvatarAction({ avatar: newAvatar }));
      setUserAvatar(newAvatar);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload file!");
    }
  };

  const propsUpload = {
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    customRequest: handleUploadAvatar,
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success("Upload avatar thành công!");
      } else if (info.file.status === "error") {
        message.error("Upload avatar thất bại!");
      }
    },
  };

  const onFinish = async (values) => {
    const { fullName, phone, id } = values;

    setIsSubmit(true);

    const res = await callUploadUserInfo(id, phone, fullName, userAvatar);

    if (res && res.data) {
      dispatch(doUpdateUserInfoAction({ avatar: userAvatar, phone, fullName }));
      message.success("Cập nhật thông tin user thành công!");
      localStorage.removeItem("access_token");
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  return (
    <>
      <div style={{ minHeight: 400 }}>
        <Row>
          <Col sm={24} md={12}>
            <Row gutter={[30, 30]}>
              <Col span={24}>
                <Avatar
                  size={{ xs: 32, sm: 64, md: 80, lg: 256, xl: 320, xxl: 400 }}
                  icon={<AntDesignOutlined />}
                  src={urlAvatar}
                  shape="circle"
                />
              </Col>
              <Col span={24}>
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
              </Col>
            </Row>
          </Col>
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
              <Form.Item label="ID" name="id" disabled>
                <Input placeholder="ID cannot change" disabled />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input placeholder="input placeholder" disabled />
              </Form.Item>
              {/* <Form.Item
                labelCol={{ span: 24 }}
                label="email:"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
              >
                <Input />
              </Form.Item> */}
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Không được để trống tên hiển thị!",
                  },
                ]}
                label="Tên hiển thị"
                name="fullName"
              >
                <Input placeholder="Nhập tên hiển thị..." />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Không được để trống số điện thoại",
                  },
                ]}
                label="Số điện thoại"
                name="phone"
              >
                <Input placeholder="Nhập số điện thoại..." />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"

                  // onClick={(value) => onFinish(value)}
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default UserInfo;
