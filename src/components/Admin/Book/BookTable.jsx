import React, { useEffect, useState } from "react";
import moment from "moment/moment";

import { callDeleteBook, callFetchlistBook } from "../../../services/api";
import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import BookViewDetail from "./BookViewDetail";
import InputSearch from "../Book/BookInputSearch";
import BookModalCreate from "./BookModalCreate";
import BookModalEdit from "./BookModalEdit";
import BookExport from "./dataAction/BookExport";

const BookTable = () => {
  const thisCurrentPage = 1;
  const thisPageSize = 5;
  const maxTotal = 0;
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(thisCurrentPage);
  const [pageSize, setPageSize] = useState(thisPageSize);
  const [total, setTotal] = useState(maxTotal);
  const [count, setCount] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");

  const [dataViewDetail, setDataViewDetail] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);
  const [openModalExport, setOpenModalExport] = useState(false);

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
      sorter: true,
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
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
      align: "center",
    },
    {
      title: "Name's book",
      dataIndex: "mainText",
      sorter: true,
      align: "center",
    },
    {
      title: "Author",
      dataIndex: "author",
      sorter: true,
      align: "center",
    },
    // {
    //   title: "Price",
    //   dataIndex: "price",
    //   sorter: true,
    // },
    // {
    //   title: "Sold",
    //   dataIndex: "sold",
    //   sorter: true,
    // },
    // {
    //   title: "Quantity",
    //   dataIndex: "quantity",
    //   sorter: true,
    // },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      sorter: true,
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            <div style={{ textAlign: "center", padding: "2px 0" }}>
              <span>{moment(record?.updatedAt).format("DD-MM-YYYY")}</span>
              <br />
              <span>{moment(record?.updatedAt).format("hh:mm:ss")}</span>
            </div>
          </>
        );
      },
    },
    {
      title: "Action",
      width: 100,
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            <span className="admin-action" style={{ padding: 5 }}>
              <EditOutlined
                onClick={() => {
                  setDataUpdate(record);
                  setOpenModalEdit(true);
                }}
              />
            </span>

            <Popconfirm
              placement="bottomLeft"
              title={<h4>Confirm delele this book ? </h4>}
              okText={"Yes"}
              cancelText={"Cancel"}
              description={
                <>
                  <span>The Book "{record.mainText}" will be removed.</span>
                </>
              }
              onConfirm={() => handleDeleteBook(record._id)}
            >
              <span
                className="admin-action"
                style={{ cursor: "pointer", margin: "0 10px" }}
              >
                <DeleteOutlined twoToneColor={"#ff4d4f"} />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const onChangeEvent = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.order === undefined) {
      setSortQuery("");
    } else if (sorter && sorter.order === "ascend") {
      const q = `sort=${sorter.field}`;
      setSortQuery(q);
    } else {
      const q = `sort=-${sorter.field}`;
      setSortQuery(q);
    }
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  const handleDeleteBook = async (bookId) => {
    const res = await callDeleteBook(bookId);
    if (res && res.data) {
      message.success("Delete book successs!");
      fetchBook();
    } else {
      notification.error({
        message: "Something's wrong!",
        description: res.message,
      });
    }
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table list users: </span>
        <span style={{ display: "flex", gap: 15 }}>
          <Button
            icon={<ReloadOutlined />}
            type="primary"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            Reset
          </Button>

          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenModalCreate(true)}
          >
            Add new
          </Button>

          <Button
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => setOpenModalImport(true)}
          >
            Import
          </Button>

          <Button
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportData(listBook)}
          >
            Export
          </Button>
        </span>
      </div>
    );
  };

  const handleExportData = () => {
    setOpenModalExport(true);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
        </Col>
        <Col span={24}>
          <Table
            title={renderHeader}
            scroll={{
              x: "85vw",
            }}
            className="def"
            isLoading={isLoading}
            columns={columns}
            dataSource={listBook}
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
        </Col>
      </Row>

      <BookViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <BookModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchBook={fetchBook}
      />

      <BookModalEdit
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchBook={fetchBook}
      />

      <BookExport
        openModalExport={openModalExport}
        setOpenModalExport={setOpenModalExport}
        listBook={listBook}
      />
      {/* 
      
      
      <UserImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
      />
      */}
    </>
  );
};

export default BookTable;
