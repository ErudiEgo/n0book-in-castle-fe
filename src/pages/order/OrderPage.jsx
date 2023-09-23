import "./OrderPage.scss";

import { useState } from "react";

import { Button, Col, Popconfirm, Row, Space, Steps } from "antd";

import ViewOrder from "../../components/Order/ViewOrder";
import Payment from "../../components/Order/Payment";
import ResultOrder from "../../components/Order/ResultOrder";
import {
  ClearOutlined,
  HomeOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doPlaceOrderAction } from "../../redux/order/orderSlice";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.order.carts);

  const [currentStep, setCurrentStep] = useState(0);

  const customOderSteps = [
    {
      title: "Xem giỏ hàng",
      description: "",
    },
    {
      title: "Đặt hàng",
      description: "",
    },
    {
      title: "Hoàn tất đặt hàng",
      description: "",
    },
  ];

  const handleCartAction = (keyWord) => {
    if (keyWord === "GOBACK") {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      } else {
        navigate("/");
      }
    }

    if (keyWord === "GOHOME") {
      navigate("/");
    }

    if (keyWord === "CLEARCART") {
      dispatch(doPlaceOrderAction());
      setCurrentStep(0);
    }
  };

  return (
    <>
      <div className="order-page">
        <div className="order-container">
          <div className="order-steps">
            <Steps
              size="small"
              current={currentStep}
              status="finish"
              items={customOderSteps}
            ></Steps>
          </div>

          {currentStep === 0 && (
            <ViewOrder
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
            />
          )}
          {currentStep === 1 && (
            <Payment
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
            />
          )}
          {currentStep === 2 && (
            <ResultOrder
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
            />
          )}

          <div className="order-steps">
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <div className="cart-btn-action-left">
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => handleCartAction("GOHOME")}
                    >
                      <HomeOutlined /> Về trang chủ
                    </Button>

                    {currentStep !== 0 &&
                    window.location.pathname === "/order" &&
                    carts.length !== 0 ? (
                      <>
                        &nbsp; &nbsp;
                        <Button
                          type="primary"
                          ghost
                          onClick={() => handleCartAction("GOBACK")}
                        >
                          <RollbackOutlined /> Quay lại
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </Space>
                </div>
              </Col>
              <Col span={12}>
                <div className="cart-btn-action-right">
                  <Space>
                    {window.location.pathname === "/order" &&
                    carts.length === 0 ? (
                      <></>
                    ) : (
                      <>
                        <Popconfirm
                          title="Xoá trắng giỏ hàng?"
                          description="Thao tác này sẽ làm trống giỏ hàng"
                          placement="topLeft"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => handleCartAction("CLEARCART")}
                          //onCancel={cancel}
                        >
                          <Button danger ghost>
                            <ClearOutlined /> Xoá giỏ hàng
                          </Button>
                        </Popconfirm>
                      </>
                    )}
                  </Space>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
