import React, { useMemo } from "react";
import { Table, Button } from "antd";
import Loading from "../../components/LoadingComponent/Loading";
import "./css.scss";
import { Excel } from "antd-table-saveas-excel";
import { useState } from "react";
const TableComponent = (props) => {
  const {
    columns = [],
    isLoading = false,
    dataTable,
    handleDeleteMany,
  } = props;
  console.log("dataTable,", dataTable);
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
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const newColumns = useMemo(() => {
    return columns.filter(
      (col) =>
        col.dataIndex !== "action" &&
        col.dataIndex !== "image" &&
        col.dataIndex !== "avatar"
    );
  }, [columns]);

  console.log("newColumns", newColumns);
  const handlePrint = () => {
    const excel = new Excel();
    excel
      .addSheet("product")
      .addColumns(newColumns)
      .addDataSource(dataTable, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

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

          <button onClick={handlePrint}> Export excel </button>

          <Table
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
