import "./header.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlice";

import { FaReact } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscSearchFuzzy } from "react-icons/vsc";

import {
  Divider,
  Badge,
  Drawer,
  message,
  Avatar,
  Popconfirm,
  Popover,
  Button,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

import { callLogout } from "../../services/api";

import CartPreview from "../Cart/CartPreview";
import UserInfo from "../AccountUser/UserInfo";
import ManageAccount from "../AccountUser/ManageAccount";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const carts = useSelector((state) => state.order.carts);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openCartPreview, setOpenCartPreview] = useState(false);
  const [openModalAccount, setOpenModalAccount] = useState(false);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  let items = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => setOpenModalAccount(true)}
        >
          Quản lý tài khoản
        </label>
      ),
      key: "account",
    },
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/history")}
        >
          Lịch sử mua hàng
        </label>
      ),
      key: "history",
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
  if (user?.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    user?.avatar
  }`;

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo" onClick={() => goBackHome()}>
                <FaReact className="rotate icon-react" /> noMan-in-castle
                <VscSearchFuzzy className="icon-search" />
              </span>
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
            </div>
          </div>
          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Popover
                  placement="bottom"
                  content={
                    <CartPreview
                      openCartPreview={openCartPreview}
                      setOpenCartPreview={setOpenCartPreview}
                    />
                  }
                >
                  <Badge count={carts?.length ?? 0} size={"small"} showZero>
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")}>Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {user?.fullName}
                        <Avatar src={urlAvatar} />
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p>Lịch sử mua hàng</p>
        <Divider />

        <p>Đăng xuất</p>
        <Divider />
      </Drawer>

      <ManageAccount
        user={user}
        openModalAccount={openModalAccount}
        setOpenModalAccount={setOpenModalAccount}
      />
    </>
  );
};

export default Header;
