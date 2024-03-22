import React from "react";
import { Table, Button } from "antd";
import Loading from "../../components/LoadingComponent/Loading";
import "./css.scss";
import { useState, useEffect, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
const TableComponent = (props) => {
  const tableRef = useRef(null);
  const {
    columns = [],
    isLoading = false,
    dataTable,
    handleDeleteMany,
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
    handleDeleteMany(selectedRowKeys);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <Loading isLoading={isLoading}>
        <div>
          <div
            style={{
              marginBottom: 16,
            }}
          >
            <Button
              className="mt-3"
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Delete All
            </Button>
            <span
              style={{
                marginLeft: 8,
              }}
            >
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <button> Export excel </button>
          </DownloadTableExcel>
          <Table
            ref={tableRef}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataTable}
          />
        </div>
      </Loading>
    </div>
  );
};

export default TableComponent;
