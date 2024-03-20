import React, { useEffect, useState, useRef } from "react";
import {
  PlusOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Modal, Form, Upload, Input, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils/utils";

import Loading from "../LoadingComponent/Loading";
import * as userService from "../../services/UserService";
import { toast, Zoom } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Highlighter from "react-highlight-words";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import { user } from "../../redux/useSelector/userSelector";
const AdminUser = () => {
  const dataUser = useSelector(user);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const initialState = {
    name: "",
    email: "",
    isAdmin: "",
    address: "",
    avatar: "",
  };
  const renderIcon = (userId) => {
    return (
      <div className="gap-x-4 ">
        <DeleteOutlined
          className="text-red-500 text-[20px] mr-2 cursor-pointer"
          onClick={handleDeleteUser}
        />
        <EditOutlined
          className="text-yellow-500 text-[20px] cursor-pointer"
          // onClick={handleDetailsProduct}
        />
      </div>
    );
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [form] = Form.useForm();
  const [stateUser, setStateUser] = useState(initialState);
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps("name"),
    },
    {
      title: "IsAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (text) => <span>{text.toString()}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <img src={avatar} alt="user" />,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => renderIcon(record.key),
    },
  ];
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file && !file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser((prevState) => ({
      ...prevState,
      avatar: file.preview,
    }));
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setStateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //
  // const handleOnChangeAvtDetails = async ({ fileList }) => {
  //   const file = fileList[0];
  //   if (file && !file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   setStateProductDetails((prevState) => ({
  //     ...prevState,
  //     image: file.preview,
  //   }));
  // };
  // const handleOnChangeProductDetails = (e) => {
  //   const { name, value } = e.target;
  //   setStateProductDetails((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  //
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser(initialState);
    form.resetFields();
  };

  const fetchData = () => {
    try {
      const res = userService.getAllUser(dataUser?.access_token);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });
  const { refetch, isLoading, data } = queryUser;
  const mutationDelete = useMutation({
    mutationFn: (data) => {
      const { id, token } = data;
      return userService.deleteUser(id, token);
    },
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
  const handleDeleteUser = async () => {
    mutationDelete.mutate({
      id: selectedUserId,
      token: dataUser?.access_token,
    });
  };
  // update Product
  // const token = dataUser?.access_token;
  // const getDetailsUser = async ({id: selectedUserId, token}) => {
  //   const res = await userService.getDetailsUser({
  //     id: selectedUserId,
  //   });
  //   if (res?.data) {
  //     setStateProductDetails({});
  //   }
  // };
  // useEffect(() => {
  //   if (getDetailProduct(selectedProductId));
  // }, [selectedProductId]);
  // const mutationUpdate = useMutation({
  //   mutationFn: (data) => {
  //     const { id, token, ...rests } = data;
  //     return ProductService.updateProduct(id, rests, token);
  //   },
  //   onSuccess: () => {
  //     refetch();
  //     toast.success("Update Successful!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Zoom,
  //     });
  //   },
  // });

  // const onFinishUpdateProduct = () => {
  //   mutationUpdate.mutate({
  //     id: selectedProductId,
  //     ...stateProductDetails,
  //     token: dataUser?.access_token,
  //   });

  //   setIsOpenDrawer(false);
  // };

  // useEffect(() => {
  //   // Tạo một đối tượng mới chứa các giá trị của stateProductDetails
  //   const fieldsValues = {
  //     countInStock: stateProductDetails.countInStock,
  //     description: stateProductDetails.description,
  //     image: stateProductDetails.image,
  //     name: stateProductDetails.name,
  //     price: stateProductDetails.price,
  //     rating: stateProductDetails.rating,
  //     type: stateProductDetails.type,
  //     selled: stateProductDetails.selled,
  //     discount: stateProductDetails.discount,
  //   };
  //   // Đặt giá trị của tất cả các trường trong mẫu dữ liệu
  //   form.setFieldsValue(fieldsValues);
  // }, [form, stateProductDetails]);

  // const handleDetailsProduct = async () => {
  //   if (selectedProductId) {
  //     setIsOpenDrawer(true);
  //     await getDetailProduct(selectedProductId);
  //   }
  // };

  const formFields = [
    { label: "name", key: "name" },
    { label: "email", key: "email" },
    { label: "isAdmin", key: "isAdmin" },
    { label: "address", key: "address" },
    { label: "phone", key: "phone" },
  ];
  // const dataTable = data?.productAll.map((product) => {
  //   return {
  //     ...product,
  //     key: product._id,
  //   };
  // });
  const dataTable = data?.data.map((user) => {
    return {
      ...user,
      key: user?._id,
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
              columns={columns}
              dataTable={dataTable}
              isLoading={isLoading}
              // handleDeleteProduct={handleDeleteProduct}
              // handleDetailsProduct={handleDetailsProduct}
              //  onRow antd
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setSelectedUserId(record.key);
                  }, // click row
                };
              }}
            />
          )
        )}
      </div>

      <Modal
        title="Create User"
        forceRender
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Loading isLoading={isLoading}>
          <Form
            form={form}
            // onFinish={onFinish}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
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
                    message: `Please input your ${label} user!`,
                  },
                ]}
              >
                <InputComponent
                  value={stateUser[key]}
                  onChange={handleOnChange}
                  name={key}
                />
              </Form.Item>
            ))}
            <Form.Item
              label="Avatar"
              name="Avatar"
              rules={[{ message: "Please input your avatar user!" }]}
            >
              <div>
                <Upload onChange={handleOnChangeAvatar} maxCount={1}>
                  <Button className="w-[315px]" icon={<UploadOutlined />}>
                    Upload Avatar
                  </Button>
                </Upload>

                <div className="gap-y-3 flex justify-center items-center">
                  {stateUser?.avatar && (
                    <img
                      src={stateUser?.avatar}
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
        width="90%"
        title="User"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
      >
        <Loading>
          <Form
            form={form}
            // onFinish={onFinishUpdateProduct}
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
                  // value={stateProductDetails[key]}
                  // onChange={handleOnChangeProductDetails}
                  name={key}
                />
              </Form.Item>
            ))}
            <Form.Item
              wrapperCol={{ offset: 0, span: 24 }}
              label="Avatar"
              name="Avatar"
              rules={[{ message: "Please input your Avatar product!" }]}
            >
              {/* <div>
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
              </div> */}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button
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

export default AdminUser;
