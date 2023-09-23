import "./footer.scss";

import { Col, Divider, Row, Space } from "antd";
import {
  FacebookOutlined,
  LinkedinOutlined,
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <>
      <footer className="footer-home">
        <Row className="footer-top" gutter={24}>
          <Col span={18}>
            <div className="title-footer">
              <span>Connected on social networks</span>
            </div>
          </Col>
          <Col span={6}>
            <div className="title-other">
              <Space>
                <a
                  href="#"
                  target="_blank"
                  className="px-3 text-reset"
                  rel="noreferrer"
                >
                  <FacebookOutlined />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="px-3 text-reset"
                  rel="noreferrer"
                >
                  <InstagramOutlined />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="px-3 text-reset"
                  rel="noreferrer"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="px-3 text-reset"
                  rel="noreferrer"
                >
                  <GithubOutlined />
                </a>
              </Space>
            </div>
          </Col>
          <Divider style={{ margin: 5 }} />
        </Row>

        <div className="footer-middle">
          <Row gutter={24}>
            <Col span={10}>
              <h4 className="header-col">Corporation</h4>
              <div className="cor-info">
                <p>
                  Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng
                  vào việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum
                  đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in
                  ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn
                  văn bản với nhau để tạo thành một bản mẫu văn bản.
                </p>
              </div>
            </Col>

            <Col span={2}></Col>
            <Col span={4}>
              <h4 className="header-col">TRANG KHÁC</h4>
              <div className="site-info">
                <p>
                  <a href="#!" className="text-reset">
                    Chính sách
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Điều khoản
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Hỗ trợ
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Khác
                  </a>
                </p>
              </div>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
              <h4 className="header-col">LIÊN HỆ</h4>
              <div className="contact-info">
                <p>
                  <HomeOutlined className="me-4" />
                  &nbsp; &nbsp; TP.Hà Nội
                </p>
                <p>
                  <MailOutlined className="me-4" />
                  &nbsp; &nbsp; noman_in_castle@gmail.com
                </p>
                <p>
                  <PhoneOutlined className="me-4" />
                  &nbsp; &nbsp; 0123456789
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="footer-bottom">React &copy; by n0man-in-castle ||</div>
      </footer>
    </>
  );
};

export default Footer;
