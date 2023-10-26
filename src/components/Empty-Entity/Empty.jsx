import { useNavigate } from "react-router-dom";
import { Empty } from "antd";

const EmptyNow = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          height: "20vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    </>
  );
};

export default EmptyNow;
