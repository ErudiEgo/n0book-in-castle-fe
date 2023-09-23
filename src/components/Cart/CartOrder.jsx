import "./CartOder.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { DeleteTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Image,
  InputNumber,
  Popconfirm,
  Row,
} from "antd";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  doUpdateBookAction,
  doDeleteItemCartAction,
} from "../../redux/order/orderSlice";
import Search from "antd/es/input/Search";
import CartEmpty from "./CartEmpty";

const CartOrder = (props) => {
  const { currentStep, setCurrentStep } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.order.carts);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item.detail.buyQuantity * item.detail.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [carts]);

  const handleOnChangeInput = (valueBuy, dataBook) => {
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

  const handleBuyOrder = () => {
    setCurrentStep(1);
  };

  const nonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = nonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleRedirectBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };

  return (
    <>
      <div className="cart-order-page">
        <div className="order-container">
          <Row gutter={[20, 20]}>
            <Col md={17} xs={24}>
              {carts.length === 0 && <CartEmpty />}
              {carts?.map((book, index) => {
                return (
                  <div className="order-book" key={`index-${index}`}>
                    <Row gutter={24} className="">
                      <Col span={1}>
                        <div className="order-index">
                          <b>{index + 1}</b>
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className="order-image">
                          <Image
                            style={{ width: 100, borderRadius: 15 }}
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/images/book/${book.detail.thumbnail}`}
                          />
                        </div>
                      </Col>
                      <Col span={11}>
                        <div className="order-title">
                          <a onClick={() => handleRedirectBook(book?.detail)}>
                            {book?.detail?.mainText}
                          </a>
                        </div>
                        <div className="order-price">
                          <h4>
                            Giá bán: &nbsp;
                            <span>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(book?.detail?.price)}
                            </span>
                          </h4>
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="order-quantity">
                          <InputNumber
                            size={50}
                            min={1}
                            max={book?.detail?.quantity}
                            onChange={(value) =>
                              handleOnChangeInput(value, book)
                            }
                            value={book?.buyQuantity}
                          />
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className="order-sumPrice">
                          <h4>Tổng </h4>
                          <h4 className="sumPrice">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(book?.detail?.price * book?.buyQuantity)}
                          </h4>
                        </div>
                      </Col>
                      <Col span={1}>
                        <div className="order-action">
                          <Popconfirm
                            title="Xoá mặt hàng này khỏi giỏ hàng!"
                            placement="bottom"
                            okText={"Xoá"}
                            cancelText={"Đóng"}
                            onConfirm={() => handleDelete(book?._id)}
                          >
                            <DeleteTwoTone
                              style={{ cursor: "pointer", fontSize: "140%" }}
                              twoToneColor="#eb2f96"
                            />
                          </Popconfirm>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Col>

            <Col md={7} xs={24}>
              {carts.length === 0 ? (
                <></>
              ) : (
                <>
                  <Col>
                    <div className="order-total">
                      <Divider style={{ margin: "5px 0" }} orientation="left">
                        <h4>Tạm tính: </h4>{" "}
                      </Divider>
                      <div className="order-sumBill">
                        <h3 className="sum-final">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalPrice || 0)}
                        </h3>
                      </div>
                      <Divider style={{ margin: "5px 0" }} orientation="left">
                        <h4>Khuyến mãi: </h4>{" "}
                      </Divider>
                      <div className="order-sumBill">
                        <h3 className="sum-final">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(0 || 0)}
                        </h3>
                      </div>

                      <Divider style={{ margin: "5px 0" }} orientation="left">
                        <h4> Tổng tiền: </h4>
                      </Divider>
                      <div className="order-sumBill">
                        <h3 className="sum-final">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalPrice || 0)}
                        </h3>
                      </div>
                      <Divider style={{ margin: "5px 0" }} />

                      <div className="btn-submit-order">
                        <Button
                          type="primary"
                          size={"large"}
                          onClick={() => handleBuyOrder()}
                        >
                          Mua hàng {carts?.length ?? 0}
                        </Button>
                      </div>
                    </div>
                  </Col>
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CartOrder;
