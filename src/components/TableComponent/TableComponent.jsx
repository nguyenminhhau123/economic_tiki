import React from "react";
import { Table } from "antd";
import Loading from "../../components/LoadingComponent/Loading";
import "./css.scss";

const TableComponent = (props) => {
  const { columns = [], isLoading = false, dataTable } = props;

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Table
          className="ant-table ant-table-bordered"
          columns={columns}
          dataSource={dataTable}
          rowKey="_id"
          {...props}
        />
      </Loading>
    </div>
  );
};

export default TableComponent;
