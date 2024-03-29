import React, { useEffect, useState, useRef } from "react";
import {
  PlusOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Modal, Form, Upload, Input, Space, Select } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../utils/utils";
import * as ProductService from "../../services/ProductService";
import Loading from "../LoadingComponent/Loading";
import { toast, Zoom } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Highlighter from "react-highlight-words";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
//
// Import useQueryClient here
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import { user } from "../../redux/useSelector/userSelector";
const AdminProduct = () => {
  const dataUser = useSelector(user);
  const [typeProduct, setTypeProduct] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const initialState = {
    countInStock: "",
    description: "",
    image: "",
    name: "",
    price: "",
    rating: "",
    type: "",
    selled: "",
    discount: "",
    newType: "",
  };
  const initialStateProductDetails = {
    countInStock: "",
    description: "",
    image: "",
    name: "",
    price: "",
    rating: "",
    type: "",
    selled: "",
    discount: "",
  };
  //
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
          onClick={() => handleDetailsProduct(productId)}
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
      render: (image) => (
        <img src={image} className="h-[50px] object-cover" alt="Product" />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => renderIcon(record.key),
    },
  ];

  const [form] = Form.useForm();
  const [stateProduct, setStateProduct] = useState(initialState);
  const [stateProductDetails, setStateProductDetails] = useState(
    initialStateProductDetails
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file && !file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProduct((prevState) => ({
      ...prevState,
      image: file.preview,
    }));
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setStateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //
  const handleOnChangeAvtDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (file && !file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProductDetails((prevState) => ({
      ...prevState,
      image: file.preview,
    }));
  };
  const handleOnChangeProductDetails = (e) => {
    const { name, value } = e.target;
    setStateProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct(initialState);
    form.resetFields();
  };

  const fetchData = async () => {
    try {
      const res = await ProductService.getAllProduct();
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  });
  const { refetch, isLoading, data } = queryProduct;
  const fetchDataTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };
  const queryProductType = useQuery({
    queryKey: ["productType"],
    queryFn: fetchDataTypeProduct,
  });
  const { data: dataProductType } = queryProductType;
  const handleSelectChange = (value) => {
    console.log("value TYPE", value);
    setStateProduct({ ...stateProduct, type: value });
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return ProductService.createProduct(data);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Create Successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    }
    if (isError) {
      toast.error(" create product is not success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    }
  }, [isSuccess, isError]);
  const onFinish = () => {
    const params = {
      countInStock: stateProduct.countInStock,
      description: stateProduct.description,
      image: stateProduct.image,
      name: stateProduct.name,
      price: stateProduct.price,
      rating: stateProduct.rating,
      type:
        stateProduct.type == "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      selled: stateProduct.selled,
      discount: stateProduct.discount,
    };
    mutation.mutate(params, {});

    handleCancel();
  };

  const mutationDelete = useMutation({
    mutationFn: (id) => {
      return ProductService.deleteProduct(id);
    },
  });

  const handleDeleteProduct = async (productId) => {
    mutationDelete.mutate(productId, {
      onSuccess: () => {
        refetch();
        toast.success("Delete Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
      },
    });
  };
  // delete many
  const mutationDeleteMany = useMutation({
    mutationFn: (data) => {
      const { id, token } = data;
      return ProductService.deleteProductMany(id, token);
    },
  });
  const handleDeleteMany = (ids) => {
    mutationDeleteMany.mutate(
      {
        id: ids,
        token: dataUser?.access_token,
      },
      {
        onSuccess: () => {
          refetch();
          toast.success("Delete Successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
        },
      }
    );
  };
  // update Product
  useEffect(() => {
    if (getDetailProduct(selectedProductId));
  }, [selectedProductId]);
  const getDetailProduct = async (id) => {
    const res = await ProductService.getDetailsProduct(id);
    if (res?.data) {
      setStateProductDetails({
        countInStock: res?.data.countInStock,
        description: res?.data.description,
        image: res?.data.image,
        name: res?.data.name,
        price: res?.data.price,
        rating: res?.data.rating,
        type: res?.data.type,
        selled: res?.data.selled,
        discount: res?.data.discount,
      });
    }
    setIsLoadingUpdate(false);
  };
  const mutationUpdate = useMutation({
    mutationFn: (data) => {
      const { id, token, ...rests } = data;

      return ProductService.updateProduct(id, rests, token);
    },
    onSuccess: () => {
      refetch();
      toast.success("Update Successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    },
  });

  const onFinishUpdateProduct = () => {
    console.log();
    mutationUpdate.mutate({
      id: selectedProductId,
      ...stateProductDetails,
      token: dataUser?.access_token,
    });

    setIsOpenDrawer(false);
  };

  useEffect(() => {
    // Tạo một đối tượng mới chứa các giá trị của stateProductDetails
    const fieldsValues = {
      countInStock: stateProductDetails.countInStock,
      description: stateProductDetails.description,
      image: stateProductDetails.image,
      name: stateProductDetails.name,
      price: stateProductDetails.price,
      rating: stateProductDetails.rating,
      type: stateProductDetails.type,
      selled: stateProductDetails.selled,
      discount: stateProductDetails.discount,
    };
    // Đặt giá trị của tất cả các trường trong mẫu dữ liệu
    form.setFieldsValue(fieldsValues);
  }, [form, stateProductDetails]);

  const handleDetailsProduct = async (id) => {
    setSelectedProductId(id);
    console.log(selectedProductId);
    if (id) {
      setIsLoadingUpdate(true);
      setIsOpenDrawer(true);
      await getDetailProduct(selectedProductId);
      setIsLoadingUpdate(false);
    }
  };

  const formFields = [
    { label: "name", key: "name" },
    { label: "type", key: "type" },
    { label: "price", key: "price" },
    { label: "description", key: "description" },
    { label: "discount", key: "discount" },
    { label: "rating", key: "rating" },
    { label: "selled", key: "selled" },
    { label: "countInStock", key: "countInStock" },
  ];
  const dataTable = data?.productAll.map((product) => {
    return {
      ...product,
      key: product._id,
    };
  });

  return (
    <div className="">
      <div className="font-thin text-[22px]">Quản lý Sản Phẩm</div>
      <Button
        className="w-36 h-36 rounded-lg"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <PlusOutlined className="text-[64px]" />
      </Button>
      <div>
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          dataTable && (
            <TableComponent
              handleDeleteMany={handleDeleteMany}
              columns={columns}
              dataTable={dataTable}
              isLoading={isLoading}
              // handleDeleteProduct={handleDeleteProduct}
              // handleDetailsProduct={handleDetailsProduct}
              //  onRow antd
              // onRow={(record, rowIndex) => {
              //   return {
              //     onClick: (event) => {
              //       setSelectedProductId(record.key);
              //     }, // click row
              //   };
              // }}
            />
          )
        )}
      </div>

      <Modal
        title="Create Product"
        forceRender
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Loading isLoading={isPending}>
          <Form
            form={form}
            onFinish={onFinish}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            // style={{ maxWidth: 600 }}
            autoComplete="off"
          >
            {formFields.map(({ label, key }) => (
              <Form.Item
                key={key}
                label={label}
                name={key}
                rules={[
                  {
                    message: `Please input your ${label.toLowerCase()} product!`,
                  },
                ]}
              >
                {key === "type" ? (
                  <div>
                    <Select
                      defaultValue={stateProduct.type}
                      onChange={(value) => handleSelectChange(value)}
                      options={renderOptions(dataProductType?.data)}
                    />
                    {stateProduct.type === "add_type" && (
                      <Form.Item
                        label="New Type"
                        name="newType"
                        className="w-[100%]"
                        rules={[
                          {
                            message: "Please input your new type product!",
                          },
                        ]}
                      >
                        <Select
                          defaultValue={stateProduct.newType}
                          options={renderOptions(dataProductType?.data)}
                        />
                      </Form.Item>
                    )}
                  </div>
                ) : (
                  <InputComponent
                    value={stateProduct[key]}
                    onChange={handleOnChange}
                    name={key}
                  />
                )}
              </Form.Item>
            ))}

            <Form.Item
              label="Image"
              name="Image"
              rules={[{ message: "Please input your Image product!" }]}
            >
              <div>
                <Upload onChange={handleOnChangeAvatar} maxCount={1}>
                  <Button className="w-[315px]" icon={<UploadOutlined />}>
                    Upload Avatar
                  </Button>
                </Upload>

                <div className="gap-y-3 flex justify-center items-center">
                  {stateProduct?.image && (
                    <img
                      src={stateProduct?.image}
                      className="w-[120px] h-[120px] rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                className="w-full bg-blue-600"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
      <DrawerComponent
        productId={selectedProductId}
        width="90%"
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            form={form}
            onFinish={onFinishUpdateProduct}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
          >
            {formFields.map(({ label, key }) => (
              <Form.Item
                key={key}
                label={label}
                name={key}
                rules={[
                  {
                    required: true,
                    message: `Please input your ${label} product!`,
                  },
                ]}
              >
                <InputComponent
                  value={stateProductDetails[key]}
                  onChange={handleOnChangeProductDetails}
                  name={key}
                />
              </Form.Item>
            ))}
            <Form.Item
              wrapperCol={{ offset: 0, span: 24 }}
              label="Image"
              name="Image"
              rules={[{ message: "Please input your Image product!" }]}
            >
              <div>
                <Upload onChange={handleOnChangeAvtDetails} maxCount={1}>
                  <Button className="w-[500px]" icon={<UploadOutlined />}>
                    Upload Avatar
                  </Button>
                </Upload>

                <div className="gap-y-3 flex justify-center items-center">
                  {stateProductDetails?.image && (
                    <img
                      src={stateProductDetails?.image}
                      className="w-[120px] h-[120px] rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                onClick={onFinishUpdateProduct}
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600"
              >
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
    </div>
  );
};

export default AdminProduct;
