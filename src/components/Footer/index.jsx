import "./footer.scss";
import Logo from "../../assets/Book-Castle-Logo.png";

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
              <b>
                <img src={Logo} alt="Logo" width={25} height={17} />
                &nbsp; Book Castle
              </b>
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

        <div
          className="footer-middle"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          <Row gutter={24}>
            <Col span={11}>
              <div className="cor-info">
                <p style={{ lineHeight: 1.5, textAlign: "justify" }}>
                  &nbsp; &nbsp;Đối với những người yêu sách trên khắp cả nước,
                  thương hiệu sách Book Castle đã trở thành cái tên quen thuộc.
                  Book Castle là điểm đến yêu thích của nhiều người yêu con chữ
                  bởi nơi đây có hầu hết mọi loại sách cần thiết như sách thiếu
                  nhi, sách văn học trong và ngoài nước, sách khoa học, sách
                  giáo khoa... Chúng tôi luôn nỗ lực để tạo điểm nhấn số 1 trong
                  tâm trí khách hàng về trải nghiệm giải trí, khám phá, văn hóa
                  và lễ hội.
                </p>
              </div>
            </Col>

            <Col span={2}></Col>
            <Col span={3}>
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
                  &nbsp; &nbsp; Hà Nội, Việt Name
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
        <div className="footer-bottom">
          Copyright &copy; 2022 || Book Castle React
        </div>
      </footer>
    </>
  );
};

export default Footer;
