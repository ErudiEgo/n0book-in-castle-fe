import "./HistoryOrder.scss";

import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import ReactJson from "react-json-view";

import { Col, Row, Spin, Table, Tag } from "antd";
import { callOrderHistory } from "../../services/api";
import DetailOrder from "./DetailOrder";

const HistoryDeliver = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [listOrder, setListOrder] = useState([]);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);

  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");

  const [dataViewDetail, setDataViewDetail] = useState({});
  const [openViewDetail, setOpenViewDetail] = useState(false);

  useEffect(() => {
    fetchDeliver();
  }, [current, pageSize, sortQuery]);

  const fetchDeliver = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;

    const res = await callOrderHistory(query);

    //console.log("Check res => ", res);
    if (res && res.data) {
      setListOrder(res.data);
      //setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const onChangeEvent = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const columns = [
    {
      title: " ",
      dataIndex: "",
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            <span>{(count - 1) * pageSize + index + 1}</span>
          </>
        );
      },
    },

    {
      title: "ID",
      dataIndex: "_id",
      columnKey: "_id",
      align: "center",
      render: (text, record, index) => {
        return (
          <a
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    // {
    //   title: "Người nhận",
    //   columnKey: "name",
    //   dataIndex: "name",
    // },
    // {
    //   title: "Địa chỉ",
    //   columnKey: "address",
    //   dataIndex: "address",
    // },

    // {
    //   title: "Điện thoại",
    //   columnKey: "phone",
    //   dataIndex: "phone",
    // },

    {
      title: "Tổng giá trị",
      columnKey: "totalPrice",
      dataIndex: "totalPrice",
      align: "center",
      render: (text, record, index) => {
        return (
          <b>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(record?.totalPrice)}
          </b>
        );
      },
    },

    {
      title: "Trạng thái",
      columnKey: "status",
      dataIndex: "status",
      align: "center",
      render: (text, record, index) => {
        return (
          <Tag color="green">
            <b>Thành công</b>
          </Tag>
        );
      },
    },
    {
      title: "Ngày tạo",
      width: 120,
      columnKey: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            <div style={{ textAlign: "center" }}>
              <span>{moment(record?.createdAt).format("DD-MM-YYYY")}</span>
              <br />
              <br />
              <span>{moment(record?.createdAt).format("hh:mm:ss")}</span>
            </div>
          </>
        );
      },
    },
    // {
    //   title: "Cập nhật",
    //   columnKey: "updatedAt",
    //   dataIndex: "updatedAt",
    //   render: (text, record, index) => {
    //     return (
    //       <>
    //         <div style={{ textAlign: "center", padding: "2px 0" }}>
    //           <span>{moment(record?.updatedAt).format("DD-MM-YYYY")}</span>
    //           <br />
    //           <span>{moment(record?.updatedAt).format("hh:mm:ss")}</span>
    //         </div>
    //       </>
    //     );
    //   },
    // },
    {
      title: "Chi tiết đơn hàng",
      columnKey: "detail",
      dataIndex: "detail",
      render: (text, record, index) => {
        return (
          <>
            <ReactJson
              name="Chi tiết đơn hàng"
              displayArrayKey={false}
              quotesOnKeys={false}
              onSelect={false}
              defaultValue={false}
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={false}
              src={record.detail}
            />
            ;
          </>
        );
      },
    },
  ];

  const renderHeader = () => {
    return (
      <>
        <h3>LỊCH SỬ MUA HÀNG</h3>
      </>
    );
  };

  return (
    <>
      <div className="history-deliver-page">
        <Row>
          <Col span={20}>
            <Spin spinning={isLoading} tip="Loading now..." size="large">
              <div className="deliver-table">
                <Table
                  className="table-deliver-show"
                  title={renderHeader}
                  scroll={{
                    x: "60vw",
                  }}
                  isLoading={isLoading}
                  columns={columns}
                  dataSource={listOrder}
                  onChange={onChangeEvent}
                  rowKey="_id"
                  pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    onChange(current) {
                      setCount(current);
                    },
                    showTotal: (total, range) => {
                      return (
                        <div>
                          {range[0]} - {range[1]} / {total} rows{" "}
                        </div>
                      );
                    },
                  }}
                />
              </div>
            </Spin>
          </Col>

          <Col span={4}>
            <div className="deliver-action"></div>
          </Col>
        </Row>
      </div>
      <DetailOrder
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
    </>
  );
};

export default HistoryDeliver;
