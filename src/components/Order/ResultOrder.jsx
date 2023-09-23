import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ResultOrder = (props) => {
  const { setCurrentStep } = props;

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  const handleGoCart = () => {
    setCurrentStep(0);
    navigate("/order");
  };

  const extraResult = (
    <>
      <div>
        <Button
          size="middle"
          type="primary"
          key="go-back-home"
          shape="round"
          onClick={() => handleGoHome()}
        >
          Tiếp tục mua hàng
        </Button>
        &nbsp; &nbsp;
        <Button
          size="middle"
          key="go-cart"
          shape="round"
          onClick={() => handleGoCart()}
        >
          Quay lại giỏ hàng
        </Button>
      </div>
      <div></div>
    </>
  );
  return (
    <>
      <div style={{ minHeight: 500 }}>
        <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={extraResult}
        />
      </div>
    </>
  );
};

export default ResultOrder;
