import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

import { callFetchDashboard } from "../../services/api";

const DashBoard = () => {
  const [dataDashboard, setDataDashboard] = useState({
    countUser: 0,
    countOrder: 0,
  });

  useEffect(() => {
    const initDashboard = async () => {
      const res = await callFetchDashboard();
      if (res && res.data) {
        setDataDashboard(res.data);
      }
    };
    initDashboard();
  }, []);

  const formatter = (value) => <CountUp end={value} seperator="," />;

  return (
    <div className="dashboard-page" style={{ width: "100vw", height: "80vh" }}>
      <Row gutter={[80, 80]}>
        <Col span={10}>
          <Card title="" bordered={false}>
            <Statistic
              title="Số lượng người dùng:"
              value={dataDashboard.countUser}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="" bordered={false}>
            <Statistic
              title="Tổng số đơn hàng:"
              value={dataDashboard.countOrder}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
