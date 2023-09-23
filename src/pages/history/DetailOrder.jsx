import { v4 as uuidv4 } from "uuid";
import { Badge, Descriptions, Divider, Drawer, Image, Tag } from "antd";
import moment from "moment/moment";

import { useEffect, useState } from "react";
import { callFetchBookById } from "../../services/api";

const DetailOrder = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

  const [fileList, setFileList] = useState([]);
  const [buildData, setBuildData] = useState(null);
  const [listProduct, setListProduct] = useState(null);

  useEffect(() => {
    if (dataViewDetail) {
      setListProduct(dataViewDetail.detail);
    }
  }, [dataViewDetail]);

  useEffect(() => {
    let imgArr = [];

    listProduct?.map(async (item, index) => {
      if (item._id) {
        let resBook = await callFetchBookById(item._id);

        if (resBook && resBook.data) {
          imgArr.push({
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
              resBook.data.thumbnail
            }`,
            price: resBook.data.price,
          });
        }
      }
      setFileList([...imgArr]);
    });
  }, [listProduct]);

  useEffect(() => {
    let listTemp = [];
    listProduct?.map((item, index) => {
      listTemp.push({ data: item, dataX: fileList[index] });
    });
    setBuildData(listTemp);
  }, [fileList]);

  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };
  return (
    <>
      <Drawer
        title="Detail order"
        width={"60vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Id" span={2}>
            {dataViewDetail?._id}
          </Descriptions.Item>

          <Descriptions.Item label="Tài khoản đặt hàng" span={2}>
            {dataViewDetail?.userId}
          </Descriptions.Item>

          <Descriptions.Item label="Email đặt hàng" span={2}>
            {dataViewDetail?.email}
          </Descriptions.Item>

          <Descriptions.Item label="Người nhận" span={2}>
            {dataViewDetail?.name}
          </Descriptions.Item>

          <Descriptions.Item label="Hình thức vận chuyển">
            <Tag color="volcano">
              <Badge status="processing" text={"COD"} />
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Tổng thanh toán">
            <Badge
              status="processing"
              text={new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataViewDetail?.totalPrice)}
            />
          </Descriptions.Item>

          <Descriptions.Item label="Ngày tạo đơn">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Danh sách sản phẩm</Divider>

        {buildData?.map((item, index) => {
          return (
            <div key={`item-${index}`}>
              <Descriptions bordered column={4}>
                <Descriptions.Item contentStyle={{ width: 120 }}>
                  <Image width={120} src={item.dataX?.url} />
                </Descriptions.Item>
                <Descriptions.Item contentStyle={{ width: 430 }} span={1}>
                  {item.data.bookName}
                </Descriptions.Item>
                <Descriptions.Item contentStyle={{ width: 80 }} span={1}>
                  {item.data.quantity}
                </Descriptions.Item>
                <Descriptions.Item span={1}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.dataX?.price)}
                </Descriptions.Item>
              </Descriptions>
            </div>
          );
        })}
      </Drawer>
    </>
  );
};

export default DetailOrder;
