import "./book.scss";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Row, Col, Rate, Divider, Button, Spin, Space, Alert } from "antd";
import ImageGallery from "react-image-gallery";

import ModalGallery from "./ModalGallery";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import BookLoader from "./BookLoader";
import { doAddBookAction } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";
import CarouselProduct from "../../components/Carousel/CarouselProduct";
import Empty from "../../components/Empty-Entity/Empty";

import { useEffect } from "react";

const ViewDetail = (props) => {
  const { dataBook } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [mostChoiceFilter, setMostChoiceFilter] = useState("sort=-updatedAt");

  const refGallery = useRef(null);
  const images = dataBook?.items ?? [];

  useEffect(() => {
    setCategoryFilter(dataBook?.category);
  }, [dataBook]);

  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };

  const handleChangeButton = (type) => {
    if (type === "MINUS") {
      if (currentQuantity - 1 <= 0) return;
      setCurrentQuantity(currentQuantity - 1);
    }
    if (type === "PLUS") {
      if (currentQuantity === +dataBook.quantity) return;
      setCurrentQuantity(currentQuantity + 1);
    }
  };

  const handleChangeInput = (value) => {
    if (!isNaN(value)) {
      if (+value > 0 && +value < +dataBook.quantity) {
        setCurrentQuantity(+value);
      }
    }
  };

  const handleAddToCart = (buyQuantity, book) => {
    setIsLoading(true);
    dispatch(doAddBookAction({ buyQuantity, detail: book, _id: book._id }));
    setIsLoading(false);
  };

  return (
    <div style={{ background: "#efefef", padding: "30px 0" }}>
      <div className="view-detail-book">
        <Spin spinning={isLoading} tip="Loading now..." size="large">
          <div className="detail-book-box">
            {dataBook && dataBook._id ? (
              <Row gutter={[20, 20]}>
                <Col align="middle" md={12} sm={0} xs={0}>
                  <div className="image-left">
                    <ImageGallery
                      ref={refGallery}
                      items={images}
                      showPlayButton={false} //hide play button
                      showFullscreenButton={false} //hide fullscreen button
                      renderLeftNav={() => <></>} //left arrow === <> </>
                      renderRightNav={() => <></>} //right arrow === <> </>
                      slideOnThumbnailOver={true} //onHover => auto scroll images
                      onClick={() => handleOnClickImage()}
                    />
                  </div>
                </Col>
                <Col md={12} sm={24}>
                  <Col md={0} sm={24} xs={24}>
                    <div>
                      <ImageGallery
                        ref={refGallery}
                        items={images}
                        showPlayButton={false} //hide play button
                        showFullscreenButton={false} //hide fullscreen button
                        renderLeftNav={() => <></>} //left arrow === <> </>
                        renderRightNav={() => <></>} //right arrow === <> </>
                        showThumbnails={false}
                      />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="author">
                      Tác giả: <a href="#">{dataBook.author}</a>{" "}
                    </div>
                    <div className="title">{dataBook.mainText}</div>
                    <div className="rating">
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 12 }}
                      />
                      <span className="sold">
                        <Divider type="vertical" />
                        Đã bán: {dataBook.sold}
                      </span>
                    </div>
                    <div className="price">
                      <span className="currency">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dataBook?.price)}
                      </span>
                    </div>
                    <div className="delivery">
                      <div>
                        <span className="left-side">Vận chuyển</span>
                        <span className="right-side">Miễn phí vận chuyển</span>
                      </div>
                    </div>
                    <div className="delivery">
                      <div>
                        <span className="left-side">Có sẵn</span>
                        <span className="right-side">
                          {dataBook?.quantity} sản phẩm
                        </span>
                      </div>
                    </div>
                    <div className="quantity">
                      <span className="left-side">Số lượng</span>
                      <span className="right-side">
                        <button onClick={() => handleChangeButton("MINUS")}>
                          <MinusOutlined />
                        </button>
                        <input
                          value={currentQuantity}
                          onChange={(event) =>
                            handleChangeInput(event.target.value)
                          }
                        />
                        <button onClick={() => handleChangeButton("PLUS")}>
                          <PlusOutlined />
                        </button>
                      </span>
                    </div>
                    <div className="buy">
                      <button
                        className="cart"
                        onClick={() =>
                          handleAddToCart(currentQuantity, dataBook)
                        }
                      >
                        <BsCartPlus className="icon-cart" />
                        <span>Thêm vào giỏ hàng</span>
                      </button>
                      <button
                        className="now"
                        onClick={() => {
                          handleAddToCart(currentQuantity, dataBook);
                          navigate("/order");
                        }}
                      >
                        Mua ngay
                      </button>
                    </div>
                  </Col>
                </Col>
              </Row>
            ) : (
              <BookLoader />
            )}
          </div>
          <div className="slider-book-box">
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <Alert
                message={<h4>CHI TIẾT SẢN PHẨM: </h4>}
                description={<Empty></Empty>}
                type="info"
              />
            </Space>
          </div>
          <Divider />
          <div className="slider-book-box">
            <Row gutter={24}>
              <Col span={24}>
                <CarouselProduct
                  isFilter={true}
                  titleFil={"Sản phẩm tương tự"}
                  typeFilter={categoryFilter}
                  setTypeFilter={setCategoryFilter}
                />
              </Col>
            </Row>
          </div>

          <div className="slider-book-box">
            <Row gutter={24}>
              <Col span={24}>
                <CarouselProduct
                  isFilter={false}
                  titleFil={"Sản phẩm bán chạy"}
                  typeFilter={mostChoiceFilter}
                  setTypeFilter={setMostChoiceFilter}
                />
              </Col>
            </Row>
          </div>
          <Divider />
        </Spin>
      </div>
      <ModalGallery
        isOpen={isOpenModalGallery}
        setIsOpen={setIsOpenModalGallery}
        currentIndex={currentIndex}
        items={images}
        //title={dataBook.mainText}
      />
    </div>
  );
};

export default ViewDetail;
