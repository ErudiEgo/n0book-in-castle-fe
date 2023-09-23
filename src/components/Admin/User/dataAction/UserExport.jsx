import * as XLSX from "xlsx";
import moment from "moment/moment";
import { useState } from "react";
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { SettingOutlined, SnippetsOutlined } from "@ant-design/icons";

const UserExport = (props) => {
  const { openModalExport, setOpenModalExport, listUser } = props;

  const [typeExport, setTypeExport] = useState(".csv");
  const [count, setCount] = useState(1);
  const [tableShow, setTableShow] = useState(5);

  const dataSource = [];

  const columns = [
    {
      title: " ",
      dataIndex: "",
      render: (text, record, index) => {
        return (
          <>
            <span>{(count - 1) * tableShow + index + 1}</span>
          </>
        );
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: (text, record, index) => {
        return (
          <>
            {record.isActive === false ? <span>False</span> : <span>True</span>}
          </>
        );
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",

      render: (text, record, index) => {
        return (
          <span>{moment(record?.updatedAt).format("DD-MM-YYYY hh:mm:ss")}</span>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",

      render: (text, record, index) => {
        return (
          <span>{moment(record?.updatedAt).format("DD-MM-YYYY hh:mm:ss")}</span>
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

  const handleExportData = (listUser) => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, `ExportUser${typeExport}`);
    }
  };
  return (
    <>
      <Modal
        title="Import data user"
        width={1300}
        scroll={{
          x: 1000,
        }}
        open={openModalExport}
        onOk={() => handleExportData(listUser)}
        onCancel={() => {
          setOpenModalExport(false);
        }}
        okText="Export file"
        okButtonProps={{
          disabled: listUser.length < 1,
        }}
        maskClosable={false}
      >
        <Divider />
        <Form>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Number of rows displayed: ">
                <InputNumber
                  style={{ width: "auto" }}
                  defaultValue={tableShow}
                  min={1}
                  max={listUser.length}
                  onChange={(value) => setTableShow(value)}
                  addonAfter={<SnippetsOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Select format file to export: ">
                <Select
                  showSearch
                  defaultValue={optionExport[0]}
                  onChange={(value) => handleChangeTypeExport(value)}
                  options={optionExport}
                />
              </Form.Item>
            </Col>
          </Row>

          <Table
            dataSource={listUser}
            columns={columns}
            pagination={{
              pageSize: tableShow,
              onChange(current) {
                setCount(current);
              },
            }}
          ></Table>
        </Form>
      </Modal>
    </>
  );
};

export default UserExport;
