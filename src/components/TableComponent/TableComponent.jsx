import React, { useEffect } from "react";
import { Table, Space, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Loading from "../../components/LoadingComponent/Loading";
import "./css.scss";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductService";
// import { Toast } from "react-toastify/dist/components";
const TableComponent = ({ data = [], isLoading = false, queryProduct }) => {
  const renderIcon = (productId) => {
    return (
      <div
        className="gap-x-4 "
        onClick={() => {
          handleDeleteProduct(productId);
        }}
      >
        <DeleteOutlined className="text-red-500 text-[20px] mr-2 cursor-pointer" />
        <EditOutlined className="text-yellow-500 text-[20px] cursor-pointer" />
      </div>
    );
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Product" />,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
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
      title: "Action",
      dataIndex: "action",
      render: (_, record) => renderIcon(record.key),
      // key: "renderIcon",
    },
  ];
  const mutation = useMutationHooks((id) => {
    ProductService.deleteProduct(id);
  });
  const { isSuccess } = mutation;

  const handleDeleteProduct = (productId) => {
    mutation.mutate(productId, {
      onSettled: () => {
        queryProduct();
      },
    });
  };
  useEffect(() => {
    ProductService.getAllProduct();
  }, [isSuccess]);
  return (
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
      />
    </Loading>
  );
};

export default TableComponent;
