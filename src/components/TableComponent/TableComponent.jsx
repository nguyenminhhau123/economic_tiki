import React, { useState, useRef } from "react";
import { Table, Input, Space, Button } from "antd";
import Highlighter from "react-highlight-words";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Loading from "../../components/LoadingComponent/Loading";
import "./css.scss";

const TableComponent = (props) => {
  const {
    data = [],
    isLoading = false,
    handleDeleteProduct,
    handleDetailsProduct,
  } = props;
  const renderIcon = (productId) => {
    return (
      <div className="gap-x-4 ">
        <DeleteOutlined
          className="text-red-500 text-[20px] mr-2 cursor-pointer"
          onClick={() => {
            handleDeleteProduct(productId);
          }}
        />
        <EditOutlined
          className="text-yellow-500 text-[20px] cursor-pointer"
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="w-[90px] bg-blue-600"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sắp xếp theo tên
      ...getColumnSearchProps("name"),
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      filters: [
        {
          text: "phone",
          value: "phone",
        },
        {
          text: "air",
          value: "air",
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      sorter: (a, b) => a.type.length - b.type.length,
      sortDirections: ["descend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: "<=300",
          value: "<=300",
        },
        {
          text: ">300",
          value: ">300",
        },
      ],
      onFilter: (value, record) => {
        if (value === "<=300") {
          return record.price <= 300;
        } else if (value === ">300") {
          return record.price > 300;
        }
        return false;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: "<3",
          value: "<3",
        },
        {
          text: ">=3",
          value: ">=3",
        },
      ],
      onFilter: (value, record) => {
        if (value === "<3") {
          return record.rating < 3;
        } else if (value === ">=3") {
          return record.rating >= 3;
        }
        return false;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "CountInStock",
      dataIndex: "countInStock",
      key: "countInStock",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Product" />,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => renderIcon(record.key),
    },
  ];

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Table
          className="ant-table ant-table-bordered"
          columns={columns}
          dataSource={data?.map((product) => ({
            key: product._id,
            name: product.name,
            image: product.image,
            type: product.type,
            price: product.price,
            rating: product.rating,
            description: product.description,
            countInStock: product.countInStock,
          }))}
          rowKey="_id"
          {...props}
        />
      </Loading>
    </div>
  );
};

export default TableComponent;
