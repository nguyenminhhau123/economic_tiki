import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import HeaderComponent from "../../components/HeaderComponent/HeaderComPonent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return null;
    }
  };

  return (
    <>
      <HeaderComponent isSearch isCart />
      <div className="h-[100vh] flex border ">
        <Menu
          mode="inline"
          style={{
            width: 256,
          }}
          onClick={handleOnClick}
          selectedKeys={[keySelected]}
        >
          <Menu.Item key="user" icon={<UserOutlined />}>
            Người dùng
          </Menu.Item>
          <Menu.Item key="product" icon={<AppstoreOutlined />}>
            Sản Phẩm
          </Menu.Item>
        </Menu>
        <div className="flex-1 p-[15px]">
          {keySelected && renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
