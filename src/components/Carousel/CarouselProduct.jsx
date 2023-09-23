import "./CarouselProduct.scss";

import { useEffect, useState } from "react";

import { Image, Rate, Row, Spin } from "antd";
import { callFetchlistBook } from "../../services/api";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";

const CarouselProduct = (props) => {
  const { typeFilter, isFilter, titleFil } = props;

  const navigate = useNavigate();
  const [listBook, setListBook] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");

  useEffect(() => {
    if (isFilter === true) {
      setFilter(typeFilter);
    }
    if (isFilter === false) {
      setSortQuery(typeFilter);
    }
  }, [listBook]);

  useEffect(() => {
    fetchCarousel();
  }, [current, pageSize, filter, sortQuery]);

  const fetchCarousel = async () => {
    setIsLoading(true);

    let query = `current=${current}&pageSize=${pageSize}`;

    if (sortQuery) {
      query += `${sortQuery}`;
    }

    if (filter) {
      query += `&category=${filter}`;
    }

    const res = await callFetchlistBook(query);

    if (res && res.data) {
      setListBook(res.data.result);
    }
    setIsLoading(false);
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
    setFilter(book?.category);
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}?id=${book._id}`);
  };

  return (
    <>
      <div className="carousel-product-container">
        <Spin spinning={isLoading} tip="Loading now..." size="large">
          <div className="title-carousel">
            <h3>{titleFil}</h3>
          </div>
          <Row className="customize-slider">
            <AliceCarousel
              controlsStrategy
              paddingRight={10}
              paddingLeft={10}
              keyboardNavigation={true}
              renderPrevButton={true}
              mouseTracking
              disableButtonsControls
              disableDotsControls
              disableSlideInfo
              //autoWidth
              responsive={{
                0: {
                  items: 1,
                },
                1024: {
                  items: 5,
                  itemsFit: "contain",
                },
              }}
              items={listBook?.map((item, index) => {
                return (
                  <div
                    className="column-slider"
                    key={`book-${index}`}
                    onClick={() => handleRedirectBook(item)}
                  >
                    <div className="wrapper-slider">
                      <div className="thumbnail-slider">
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/images/book/${item.thumbnail}`}
                          alt="thumbnail book"
                        />
                      </div>
                      <div className="text-slider" title={item.mainText}>
                        {item.mainText}
                      </div>

                      <div className="price-slider">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </div>
                      <div className="rating-slider">
                        <Rate
                          value={5}
                          disabled
                          style={{ color: "#ffce3d", fontSize: 10 }}
                        />
                        <span>Đã bán: {item.sold}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            />
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default CarouselProduct;
