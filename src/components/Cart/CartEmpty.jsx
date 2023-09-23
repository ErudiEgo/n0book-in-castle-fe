import "./CartEmpty.scss";

import { useNavigate } from "react-router-dom";

import { Button, Divider, Empty } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const CartEmpty = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="cart-empty-container">
        <Divider />
        <Empty
          className="empty-box-entity"
          description={
            <>
              <div className="empty-box-content">
                <h3>
                  Oops... <a href="/"> Your cart is empty now! </a>
                </h3>
                <br />
              </div>
            </>
          }
        >
          <Divider orientation>
            <Button type="primary" onClick={() => handleGoHome()}>
              <ShoppingCartOutlined />
              Buy now!
            </Button>
          </Divider>
        </Empty>
      </div>
    </>
  );
};

export default CartEmpty;
