import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterTwoTone } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
  Spin,
  Image,
} from "antd";
import "./home.scss";
import { callFetchCategory, callFetchlistBook } from "../../services/api";
import CarouselBanner from "../Carousel/CarouselBanner";

import Banner1 from "../../assets/banner-bo-3-minmap-02-1.png";

const Home = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-sold");

  const [listCategory, setListCategory] = useState([]);
  const [listBook, setListBook] = useState([]);

  useEffect(() => {
    const initCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item, index) => {
          return {
            label: item,
            value: item,
          };
        });
        setListCategory(d);
      }
    };
    initCategory();
  }, []);

  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter, sortQuery]);

  const fetchBook = async () => {
    setIsLoading(true);

    let query = `current=${current}&pageSize=${pageSize}`;

    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    const res = await callFetchlistBook(query);

    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleChangeFilter = (changedValues, values) => {
    if (changedValues.category) {
      const cate = values.category;
      if (cate && cate.length > 0) {
        const f = cate.join(",");
        setFilter(`category=${f}`);
      } else {
        setFilter("");
      }
    }
  };
  const onFinish = (values) => {
    if (values?.range?.from >= 0 && values?.range?.to >= 0) {
      let f = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      if (values?.category?.length) {
        const cate = values?.category?.join(",");
        f += `&category=${cate}`;
      }
      setFilter(f);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.currency !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-{sorter.field}`;

      setSortQuery(q);
    }
  };

  const items = [
    {
      key: "sort=-sold",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "sort=-updatedAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

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
    <div className="homepage">
      <div className="homepage-container">
        <Row gutter={[20, 20]}>
          <Col md={4} sm={0} xs={0}>
            <div className="homepage-slide-left">
              <Divider />
              <Form
                onFinish={onFinish}
                form={form}
                onValuesChange={(changedValues, values) =>
                  handleChangeFilter(changedValues, values)
                }
              >
                <Form.Item
                  name="category"
                  label="Danh mục sản phẩm"
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group>
                    <Row>
                      {listCategory?.map((item, index) => {
                        return (
                          <Col
                            span={24}
                            key={`index-${index}`}
                            style={{ padding: "5px 10px" }}
                          >
                            <Checkbox value={item.value}>{item.label}</Checkbox>
                          </Col>
                        );
                      })}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <Divider />
                <Form.Item labelCol={{ span: 24 }} label="Khoảng giá">
                  <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    label="Từ"
                    name={["range", "from"]}
                  >
                    <InputNumber
                      addonAfter="VND"
                      name="from"
                      min={0}
                      placeholder="Giá đầu"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    label="Đến"
                    name={["range", "to"]}
                  >
                    <InputNumber
                      addonAfter="VND"
                      name="to"
                      min={0}
                      placeholder="Giá cuối"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>

                  <div>
                    <Button
                      ghost
                      type="primary"
                      onClick={() => form.submit()}
                      style={{ width: "100%" }}
                    >
                      Áp dụng
                    </Button>
                  </div>
                </Form.Item>
                <Divider />
                <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                  <div>
                    <Rate
                      value={5}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 15 }}
                    />
                    <span className="ant-rate-text"></span>
                  </div>
                </Form.Item>
              </Form>
              <Divider />
              <Button
                style={{ width: "100%", margin: "20px auto" }}
                ghost
                type="primary"
                shape="round"
                icon={<FilterTwoTone />}
                onClick={() => form.resetFields()}
              >
                Đặt lại bộ lọc
              </Button>
              <br />
            </div>
          </Col>

          <Col md={20} xs={24}>
            <div className="homepage-banner">
              <Col span={18}>
                <CarouselBanner />
              </Col>
              <Col span={6}>
                <Image preview={false} src={Banner1} />
              </Col>
            </div>
            <div className="homepage-main-center">
              <Spin spinning={isLoading} tip="Loading now..." size="large">
                <div className="">
                  <Row>
                    <Tabs
                      defaultActiveKey="sort=-sold"
                      items={items}
                      onChange={(value) => {
                        setSortQuery(value);
                      }}
                      style={{ overflowX: "auto" }}
                    />
                  </Row>
                  <Row className="customize-row">
                    {listBook?.map((item, index) => {
                      return (
                        <div
                          className="column"
                          key={`book-${index}`}
                          onClick={() => handleRedirectBook(item)}
                        >
                          <div className="wrapper">
                            <div className="thumbnail">
                              <img
                                src={`${
                                  import.meta.env.VITE_BACKEND_URL
                                }/images/book/${item.thumbnail}`}
                                alt="thumbnail book"
                              />
                            </div>
                            <div className="text" title={item.mainText}>
                              {item.mainText}
                            </div>

                            <div className="price">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price)}
                            </div>
                            <div className="rating">
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
                  </Row>
                  <Divider />
                  <Row style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                      current={current}
                      total={total}
                      pageSize={pageSize}
                      defaultCurrent={1}
                      responsive
                      onChange={(p, s) => onChange({ current: p, pageSize: s })}
                    />
                  </Row>
                </div>
              </Spin>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
