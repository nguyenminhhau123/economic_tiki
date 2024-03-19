import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Upload } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils/utils";
import * as ProductService from "../../services/ProductService";
import Loading from "../LoadingComponent/Loading";
import { toast, Zoom } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"; // Import useQueryClient here
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import { user } from "../../redux/useSelector/userSelector";
const AdminProduct = () => {
  const dataUser = useSelector(user);

  console.log("datausser token", dataUser?.access_token);
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

  const [form] = Form.useForm();
  const [stateProduct, setStateProduct] = useState(initialState);
  const [stateProductDetails, setStateProductDetails] = useState(
    initialStateProductDetails
  );
  console.log("stateProductDetails", stateProductDetails);
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

  const fetchData = () => {
    try {
      const res = ProductService.getAllProduct();
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  });
  const { refetch, isLoading, data } = queryProduct;

  const mutation = useMutation({
    mutationFn: (data) => {
      return ProductService.createProduct(data);
    },
    onSuccess: () => {
      refetch();
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
    },
  });

  const { isPending, isSuccess } = mutation;
  const onFinish = () => {
    mutation.mutate(stateProduct, {});

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
  const {
    data: dataUpdated,
    isSpending: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const onFinishUpdateProduct = () => {
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

  const handleDetailsProduct = async () => {
    if (selectedProductId) {
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
          data?.productAll &&
          data.productAll.length > 0 && (
            <TableComponent
              data={data.productAll}
              isLoading={isLoading}
              handleDeleteProduct={handleDeleteProduct}
              handleDetailsProduct={handleDetailsProduct}
              //  onRow antd
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setSelectedProductId(record.key);
                  }, // click row
                };
              }}
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
                    required: true,
                    message: `Please input your ${label} product!`,
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct[key]}
                  onChange={handleOnChange}
                  name={key}
                />
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
