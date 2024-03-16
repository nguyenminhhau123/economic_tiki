import React, { useEffect, useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Upload } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils/utils";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductService";
import Loading from "../LoadingComponent/Loading";
import { toast, Zoom } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const AdminProduct = () => {
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
  const [form] = Form.useForm();
  const [stateProduct, setStateProduct] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file && !file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct(initialState);
    form.resetFields();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setStateProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const mutation = useMutationHooks((data) => {
    ProductService.createProduct(data);
  });

  const { isPending, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      handleCancel();
      setStateProduct(initialState);
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
  }, [isSuccess]);

  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };
  const fetchData = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  });
  const { isLoading, data, refetch: queryProductRefetch } = queryProduct;
  console.log("data", data);
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
        className=" w-36 h-36 rounded-lg"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <PlusOutlined className="text-[64px] " />
      </Button>
      <div>
        {data?.productAll && data.productAll.length && (
          <TableComponent
            data={data?.productAll}
            isLoading={isLoading}
            queryProduct={queryProductRefetch}
          />
        )}
      </div>

      {/*  */}
      <Modal
        title="Create Product"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Loading isLoading={isPending}>
          <Form
            form={form}
            onFinish={onFinish}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
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
              rules={[
                { required: true, message: "Please input your Image product!" },
              ]}
            >
              <div>
                <Upload onChange={handleOnChangeAvatar} maxCount={1}>
                  <Button className="" icon={<UploadOutlined />}>
                    Upload Avatar
                  </Button>
                </Upload>

                <div className="gap-y-3 flex justify-center items-center">
                  {stateProduct?.image && (
                    <img
                      src={stateProduct?.image}
                      className=" w-[120px] h-[120px] rounded-full object-cover "
                    />
                  )}
                </div>
              </div>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                className="text-blue-500 "
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default AdminProduct;
