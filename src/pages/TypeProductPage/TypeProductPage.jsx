import React from "react";
import { Row, Col, Pagination } from "antd";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CartComponent from "../../components/CartComponent/CartComponent";

export default function TypeProductPage() {
  const handleOnchangePagination = () => {};

  return (
    <div className="w-full bg-[#efefef]">
      <div className="px-12 m-0 items-center justify-center sm:p-0 md:px-0">
        <Row className="flex-col md:flex-row pt-10">
          <Col className="md:bg-bgColor w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  items-center flex-1 gap-3  ">
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
            <CartComponent />
          </Col>
          {/* NavbarComponent */}
          <div className="md:w-auto bg-bgColor md:mt-0 md:ml-2 sm:mt-2 p-10 rounded-md md:block">
            <NavbarComponent />
          </div>
        </Row>
        <div className=" flex items-center justify-center mt-10">
          <Pagination
            defaultCurrent={5}
            total={60}
            onChange={handleOnchangePagination}
          />
        </div>
      </div>
    </div>
  );
}
