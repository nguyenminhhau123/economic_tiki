import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
export default function AdminUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  return (
    <div className="">
      <div className="font-thin text-[22px]">Quản lý người dùng</div>
      <Button
        className=" w-36 h-36 rounded-lg"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <PlusOutlined className="text-[64px] " />
      </Button>
      <div>
        <TableComponent />
      </div>
      <Modal title="Create Product" open={isModalOpen} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
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
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name product!",
              },
            ]}
          >
            <InputComponent />
          </Form.Item>
          <Form.Item
            label="price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price product!",
              },
            ]}
          >
            <InputComponent />
          </Form.Item>
          <Form.Item
            label="description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description product!",
              },
            ]}
          >
            <InputComponent />
          </Form.Item>
          <Form.Item
            label="discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input your discount product!",
              },
            ]}
          >
            <InputComponent />
          </Form.Item>
          <Form.Item
            label="price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price product!",
              },
            ]}
          >
            <InputComponent />
          </Form.Item>
          <Form.Item
            label="rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your rating product!",
              },
            ]}
          >
            <InputComponent />
          </Form.Item>
          <Form.Item
            label="sold"
            name="sold"
            rules={[
              {
                required: true,
                message: "Please input your sold product!",
              },
            ]}
          >
            <InputComponent />
          </Form.Item>
          <Form.Item
            label="countInStock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your countInStock product!",
              },
            ]}
          >
            <InputComponent />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className="text-blue-500 " type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
