import { Modal, Tabs } from "antd";

import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";

const ManageAccount = (props) => {
  const { openModalAccount, setOpenModalAccount } = props;

  const items = [
    {
      key: "info",
      label: "Cập nhật thông tin",
      children: <UserInfo />,
    },
    {
      key: "password",
      label: "Đổi mật khẩu",
      children: <ChangePassword />,
    },
  ];
  return (
    <>
      <Modal
        open={openModalAccount}
        footer={null}
        onCancel={() => setOpenModalAccount(false)}
        maskClosable={false}
        width={"60vw"}
      >
        <Tabs defaultActiveKey="info" items={items} />
      </Modal>
    </>
  );
};
export default ManageAccount;
