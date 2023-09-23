import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";
import "./layout.scss";
import {
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  HeartTwoTone,
  BookOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message } from "antd";

import { callLogout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

const { Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: "dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: <span>Manage User</span>,
    // key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/user">List users</Link>,
        key: "crud",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: <span>Manage Book</span>,
    // key: "book",
    icon: <BookOutlined />,
    children: [
      {
        label: <Link to="/admin/book">List books</Link>,
        key: "book",
        icon: <DatabaseOutlined />,
      },
    ],
  },
  {
    label: <Link to="/admin/order">Manage Order</Link>,
    key: "order",
    icon: <DollarCircleOutlined />,
  },
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = useSelector((state) => state.account.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const itemsDropdown = [
    {
      label: <label style={{ cursor: "pointer" }}>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];

  return (
    <Layout style={{ height: "auto" }} className="layout-admin">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ height: 100, margin: 10, textAlign: "center" }}>
          Admin
        </div>
        <Menu
          defaultSelectedKeys={[activeMenu]}
          mode="inline"
          items={items}
          onClick={(e) => setActiveMenu(e.key)}
        />
      </Sider>

      <Layout>
        <div className="admin-header">
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </span>
          <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Welcome {user?.fullName}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>

        <Content className="admin-body">
          <Outlet />
        </Content>

        <Footer
          className="admin-footer"
          //style={{ padding: 0, position: "sticky", bottom: 0 }}
        >
          Ant Design ©2023 Made with <HeartTwoTone /> || React Test Fresher
          &copy; noMan-in-castle
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
