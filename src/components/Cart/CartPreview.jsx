import "./CartPreview.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Col,
  Divider,
  Image,
  InputNumber,
  Popconfirm,
  Row,
  Spin,
  Table,
} from "antd";
import {
  doDeleteItemCartAction,
  doUpdateBookAction,
} from "../../redux/order/orderSlice";
import { DeleteTwoTone } from "@ant-design/icons";
import CartEmpty from "../../components/Cart/CartEmpty";

const CartPreview = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.order.carts);

  const [pageSize, setPageSize] = useState(3);
  const [count, setCount] = useState(1);

  const [dataPreview, setDataPreview] = useState([]);
  const [totalCartPreview, setTotalCartPreview] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    buildDataPreviewCart();
  }, [carts]);

  const buildDataPreviewCart = () => {
    setIsLoading(true);

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

    setIsLoading(false);
  };

  const resizeTable = {
    sizeOrdinal: 45,
    sizeImage: 80,
    sizeName: 200,
    sizeBuyQuantity: 90,
    sizePrice: 120,
    sizeSumPrice: 120,
  };

  const tableCarts = [
    {
      title: "STT",
      width: resizeTable.sizeOrdinal,
      dataIndex: "",
      render: (text, record, index) => {
        return <>{<span>{(count - 1) * pageSize + index + 1}</span>}</>;
      },
    },

    {
      title: "Ảnh",
      width: resizeTable.sizeImage,
      dataIndex: "mainText",
      render: (text, record, index) => {
        return (
          <>
            <Image
              width={60}
              height={60}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                record.thumbnail
              }`}
              alt="thumbnail book"
            />
          </>
        );
      },
    },

    {
      title: "Tên sản phẩm",
      width: resizeTable.sizeName,
      dataIndex: "mainText",
    },

    {
      title: "Số lượng",
      width: resizeTable.sizeBuyQuantity,
      dataIndex: "buyQuantity",
      render: (text, record, index) => {
        return (
          <>
            <InputNumber
              style={{ width: "65x" }}
              min={1}
              max={record.quantity}
              value={record.buyQuantity}
              onChange={(value) => handleChangeBuyQuantity(value, record)}
            />
          </>
        );
      },
    },
    {
      title: "Giá tiền",
      width: resizeTable.sizePrice,
      dataIndex: "price",
      render: (text, record, index) => {
        return (
          <>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(record?.price)}
            </span>
          </>
        );
      },
    },
    {
      title: "Thành tiền",
      width: resizeTable.sizeSumPrice,
      dataIndex: "sumPrice",
      render: (text, record, index) => {
        return (
          <>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(record?.buyQuantity * record?.price)}
            </span>
          </>
        );
      },
    },
    {
      width: resizeTable.sizeOrdinal,
      dataIndex: "action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              title="Xoá mặt hàng này"
              placement="bottom"
              okText={"Xoá"}
              cancelText={"Đóng"}
              onConfirm={() => handleDelete(record?._id)}
            >
              <DeleteTwoTone
                style={{ cursor: "pointer" }}
                twoToneColor="#eb2f96"
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const renderFooter = () => {
    return (
      <>
        <Row gutter={24}>
          <Col span={18}>
            <h4>Tổng giá trị: </h4>
          </Col>
          <Col span={6}>
            <h4 style={{ color: "#ee4d2d" }}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalCartPreview)}
            </h4>
          </Col>
        </Row>
      </>
    );
  };

  const renderHeader = () => {
    return <></>;
  };

  const handleChangeBuyQuantity = (valueBuy, dataBook) => {
    if (!valueBuy || valueBuy < 1) {
      return;
    }

    if (!isNaN(valueBuy)) {
      let dataInput = {
        buyQuantity: valueBuy,
        _id: dataBook._id,
        detail: dataBook,
      };
      dispatch(doUpdateBookAction(dataInput));
    }
  };

  const handleDelete = (idBook) => {
    dispatch(doDeleteItemCartAction({ _id: idBook }));
  };
  return (
    <>
      <div className="btn-go-view-order">
        <Divider orientation={"right"}>
          <Button
            className="btn-go-cart-order"
            type="primary"
            loading={isLoading}
            onClick={() => navigate("/order")}
          >
            Quản lý giỏ hàng!
          </Button>
        </Divider>
      </div>
      <Row gutter={24}>
        <Col>
          <Spin spinning={isLoading} tip="Loading now..." size="large">
            <div className="custom-table-cart">
              {carts.length === 0 ? (
                <CartEmpty />
              ) : (
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
              )}
            </div>
          </Spin>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default CartPreview;
