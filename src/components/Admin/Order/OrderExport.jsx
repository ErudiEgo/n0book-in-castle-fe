import * as XLSX from "xlsx";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import {
  CloseOutlined,
  RedoOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

const OrderExport = (props) => {
  const { openModalExport, setOpenModalExport, listOrder } = props;

  const [typeExport, setTypeExport] = useState(".csv");
  const [tempList, setTempList] = useState(listOrder);

  const [pageSize, setPageSize] = useState(5);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setTempList(listOrder);
  }, [listOrder]);

  useEffect(() => {
    setPageSize(+tempList.length);
  }, [tempList]);

  const handleExcludeExport = (data) => {
    const cloneTempList = tempList.filter((item) => item._id !== data._id);
    setTempList(cloneTempList);
    setPageSize(+tempList.length);
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
    {
      title: "Name",
      dataIndex: "name",
      //align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      //align: "center",
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      //align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      //align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
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
      title: "Created At",
      dataIndex: "createdAt",
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
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              placement="bottom"
              title={<h4>Don't want to export this record ?</h4>}
              okText={"Yes"}
              cancelText={"Cancel"}
              onConfirm={() => handleExcludeExport(record)}
            >
              <span
                className="admin-action"
                style={{ cursor: "pointer", margin: "0 10px" }}
              >
                <CloseOutlined />
              </span>
            </Popconfirm>

            <Checkbox
            // checked={checked}
            // disabled={disabled}
            // onChange={onChange}
            ></Checkbox>
          </>
        );
      },
    },
  ];

  const optionExport = [
    { value: ".csv", label: "Export to .csv" },
    { value: ".xlsx", label: "Export to .xlsx (Excel 2007)" },
    { value: ".xls", label: "Export to .xls (Excel 2003)" },
  ];

  const handleChangeTypeExport = (value) => {
    setTypeExport(value);
  };

  const handleExportData = (dataExport) => {
    if (dataExport.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(dataExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, `ExportBook${typeExport}`);
    }
  };

  return (
    <>
      <Modal
        title="Import data book"
        width={"80vw"}
        open={openModalExport}
        onOk={() => handleExportData(tempList)}
        onCancel={() => {
          setOpenModalExport(false);
          setTempList(listOrder);
          //setPageSize(tempList.length);
        }}
        okText="Export file"
        okButtonProps={{
          disabled: tempList.length < 1,
        }}
        maskClosable={false}
      >
        <Divider />
        <Form>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item label="Format export: ">
                <Select
                  showSearch
                  defaultValue={optionExport[0]}
                  onChange={(value) => handleChangeTypeExport(value)}
                  options={optionExport}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Max rows displayed: ">
                <InputNumber
                  style={{ width: "auto" }}
                  //defaultValue={pageSize}
                  value={pageSize}
                  min={1}
                  max={tempList.length}
                  onChange={(value) => setPageSize(value)}
                  addonAfter={<SnippetsOutlined />}
                />
              </Form.Item>
            </Col>

            <Col span={6} style={{ textAlign: "right" }}>
              <Button
                style={{ margin: "0 8px" }}
                onClick={() => {
                  setTempList(listOrder);
                  setPageSize(tempList.length);
                }}
              >
                Reset
                <RedoOutlined />
              </Button>
              <Button style={{ margin: "0 8px" }} onClick={() => {}}>
                Eraser
                <RedoOutlined twoToneColor="#eb2f96" />
              </Button>
            </Col>
          </Row>

          <Table
            scroll={{
              x: "120%",
            }}
            dataSource={tempList}
            columns={columns}
            //onChange={() => onChangeEvent()}
            pagination={{
              pageSize: pageSize,
              //current: current,
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
          ></Table>
        </Form>
      </Modal>
    </>
  );
};

export default OrderExport;
