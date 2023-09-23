import { v4 as uuidv4 } from "uuid";
import { Badge, Descriptions, Divider, Drawer } from "antd";
import Modal from "antd/es/modal/Modal";
import Upload from "antd/es/upload/Upload";
import moment from "moment/moment";

import { useEffect, useState } from "react";

const BookViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (dataViewDetail) {
      let imgThumbnail = {},
        imgSlider = [];
      if (dataViewDetail.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: dataViewDetail.thumbnail,
          status: "done",
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            dataViewDetail.thumbnail
          }`,
        };
      }
      if (dataViewDetail.slider && dataViewDetail.slider.length > 0) {
        dataViewDetail.slider.map((item) => {
          imgSlider.push({
            uid: uuidv4(),
            name: item,
            status: "done",
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          });
        });
      }
      setFileList([imgThumbnail, ...imgSlider]);
    }
  }, [dataViewDetail]);

  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <Drawer
        title="Detail view book"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="Book's information:" bordered column={2}>
          <Descriptions.Item label="Id" span={2}>
            {dataViewDetail?._id}
          </Descriptions.Item>

          <Descriptions.Item label="Name's book" span={2}>
            {dataViewDetail?.mainText}
          </Descriptions.Item>

          <Descriptions.Item label="Author" span={2}>
            {dataViewDetail?.author}
          </Descriptions.Item>

          <Descriptions.Item label="Category" span={2}>
            <Badge status="processing" text={dataViewDetail?.category} />
          </Descriptions.Item>

          <Descriptions.Item label="Price" span={2}>
            <Badge
              status="processing"
              text={new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataViewDetail?.price)}
            />
          </Descriptions.Item>

          <Descriptions.Item label="Quantity">
            {dataViewDetail?.quantity}
          </Descriptions.Item>

          <Descriptions.Item label="Sold">
            {dataViewDetail?.sold}
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Book's Images</Divider>

        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          showUploadList={{ showRemoveIcon: false }}
        ></Upload>
        <Modal
          title={previewTitle}
          open={previewOpen}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
              height: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </Drawer>
    </>
  );
};

export default BookViewDetail;
