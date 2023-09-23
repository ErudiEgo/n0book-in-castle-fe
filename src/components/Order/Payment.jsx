import "./Payment.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Radio,
  Row,
  Space,
  Table,
  message,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import { DeleteTwoTone, LoadingOutlined } from "@ant-design/icons";

import { callPlaceOrder } from "../../services/api";
import { doPlaceOrderAction } from "../../redux/order/orderSlice";
import Search from "antd/es/input/Search";

const Payment = (props) => {
  const { setCurrentStep } = props;

  const [form] = Form.useForm();
  const carts = useSelector((state) => state.order.carts);
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [count, setCount] = useState(1);
  const [dataPreview, setDataPreview] = useState([]);
  const [totalCartPreview, setTotalCartPreview] = useState(0);

  const [value, setValue] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    buildDataPreviewCart();
  }, [carts]);

  const buildDataPreviewCart = () => {
    let arr = [];
    let total = 0;
    setDataPreview([]);
    if (carts && carts.length > 0) {
      carts.map((item, index) => {
        let obj = item.detail;
        let priceCheck = item.detail.buyQuantity * item.detail.price;
        arr.push(obj);
        total += priceCheck;
      });
    }
    setDataPreview(arr);
    setTotalCartPreview(total);
  };

  const tableCarts = [
    {
      title: "STT",
      align: "center",
      key: "index-col",

      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "center" }}>
            <span>{(count - 1) * pageSize + index + 1}</span>
          </div>
        );
      },
    },

    {
      title: "Ảnh",
      align: "center",
      key: "thumbnail-col",
      dataIndex: "thumbnail",
      render: (text, record, index) => {
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <Image
                width={100}
                height={120}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                  record.thumbnail
                }`}
                alt="thumbnail book"
              />
            </div>
          </>
        );
      },
    },

    {
      title: "Tên sản phẩm",
      width: 300,
      align: "center",
      key: "maintext-col",
      dataIndex: "mainText",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            <span>{record.mainText}</span>
          </div>
        );
      },
    },

    {
      title: "Số lượng",
      align: "center",
      key: "buyQuantity-col",
      dataIndex: "buyQuantity",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "center" }}>
            <span>{record.buyQuantity}</span>
          </div>
        );
      },
    },
    {
      title: "Giá tiền",
      align: "center",
      key: "price-col",
      dataIndex: "price",
      render: (text, record, index) => {
        return (
          <>
            <div style={{ textAlign: "right", margin: "auto 5px" }}>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(record?.price)}
              </span>
            </div>
          </>
        );
      },
    },
    {
      title: "Thành tiền",
      align: "center",
      key: "sumPrice-col",
      dataIndex: "sumPrice",
      render: (text, record, index) => {
        return (
          <>
            <div style={{ textAlign: "right", margin: "auto 5px" }}>
              <b>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(record?.buyQuantity * record?.price)}
              </b>
            </div>
          </>
        );
      },
    },
  ];

  const renderFooter = () => {
    return (
      <>
        <div className="footer-table">
          <Row gutter={24}>
            <Col span={18}>
              <div className="footer-table-left">Tổng giá trị: </div>
            </Col>
            <Col span={6}>
              <div className="footer-table-right">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalCartPreview)}
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  const renderHeader = () => {
    return <></>;
  };

  const handleCheckDeliver = () => {};

  const onFinish = async (values) => {
    setIsSubmit(true);
    const detailOrder = carts.map((item, index) => {
      return {
        bookName: item.detail.mainText,
        quantity: item.buyQuantity,
        _id: item._id,
      };
    });
    const data = {
      name: values.name,
      address: values.address,
      phone: values.phone,
      totalPrice: totalPrice,
      detail: detailOrder,
    };

    const res = await callPlaceOrder(data);

    //console.log("Check res: ", res);
    if (res && res.data) {
      message.success("Đặt hàng thành công!");
      dispatch(doPlaceOrderAction());
      props.setCurrentStep(2);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra.",
        description: res.message,
      });
    }
  };

  return (
    <>
      <div className="payment-page">
        <div className="payment-container">
          <Row>
            <Col span={15}>
              <div className="table-show-deliver">
                <Divider style={{ margin: 10 }} orientation="left">
                  <h3>THÔNG TIN ĐƠN HÀNG</h3>
                </Divider>

                <Table
                  size={"small"}
                  title={renderHeader}
                  footer={renderFooter}
                  columns={tableCarts}
                  dataSource={dataPreview}
                  pagination={{
                    pageSize: pageSize,
                    onChange(current) {
                      setCount(current);
                    },
                    showTotal: (total, range) => {
                      return (
                        <div>
                          {range[0]} - {range[1]} / {total} trang
                        </div>
                      );
                    },
                  }}
                />
              </div>
            </Col>

            <Col span={9}>
              <Col span={24}>
                <div className="payment-infor-voucher">
                  <Divider style={{ margin: 10 }} orientation="left">
                    <h3>MÃ GIẢM GIÁ</h3>
                  </Divider>
                  <div className="order-sumBill">
                    <Search
                      placeholder="Vourcher..."
                      allowClear
                      enterButton="Tìm kiếm"
                      size="middle"
                      //onSearch={onSearch}
                    />
                  </div>
                  <Divider />
                  <div className="btn-submit-order">
                    <Button type="primary" size={"middle"}>
                      Áp dụng
                    </Button>
                  </div>
                </div>
              </Col>

              <Col span={24}>
                <div className="payment-infor-deliver">
                  <Divider style={{ margin: 10 }} orientation="left">
                    <h3>THÔNG TIN VẬN CHUYỂN</h3>
                  </Divider>

                  <Form
                    labelCol={{
                      span: 9,
                    }}
                    wrapperCol={{
                      span: 15,
                    }}
                    form={form}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Tên người nhận:"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Tên người nhận không được để trống!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Địa chỉ giao hàng:"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Địa chỉ giao hàng không được để trống!",
                        },
                      ]}
                    >
                      <TextArea rows={2} />
                    </Form.Item>
                    <Form.Item
                      label="Số điện thoại:"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Số điện thoại không được để trống!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item label="Ghi chú:">
                      <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item label="Giá trị đơn hàng:">
                      <Input
                        disabled
                        name="totalPrice"
                        value={new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalCartPreview)}
                      />
                    </Form.Item>

                    <Form.Item label="Hình thức thanh toán:">
                      <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                          <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                          <Radio value={2} disabled>
                            Thanh toán VNPAY
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>

                    <Divider />
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      onClick={() => {
                        handleCheckDeliver();
                        form.submit();
                      }}
                      disabled={isSubmit}
                    >
                      {isSubmit && (
                        <span>
                          <LoadingOutlined /> &nbsp;
                        </span>
                      )}
                      Thanh toán ngay
                    </Button>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Payment;
