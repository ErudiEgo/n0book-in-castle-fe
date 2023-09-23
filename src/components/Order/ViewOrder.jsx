import { Divider } from "antd";
import CartOrder from "../Cart/CartOrder";

const ViewOrder = (props) => {
  const { currentStep, setCurrentStep } = props;
  return (
    <>
      <div>
        <CartOrder setCurrentStep={(currentStep, setCurrentStep)} />
        <Divider />
      </div>
    </>
  );
};

export default ViewOrder;
