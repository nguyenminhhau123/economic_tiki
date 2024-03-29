import React from "react";
import { Card, Image } from "antd";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/imgs/logo_real.png";
import "./style.css";
import { useNavigate } from "react-router-dom";
export default function CartComponent(props) {
  const navigate = useNavigate();
  const {
    id,
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
  } = props;

  const handleDetailProduct = () => {
    navigate(`/product-details/${id}`);
  };
  return (
    <Card
      onClick={handleDetailProduct}
      hoverable
      className="w-full"
      cover={
        <img className=" w-[20%] h-full m-0 p-0" alt="example" src={image} />
      }
    >
      <div className="w-[68px] h-[14px]">
        <Image src={logo} />
      </div>
      <div className="p-2 ">
        <div className="font-medium text-[14px] leading-4 ">{name}</div>
        <div className="flex mt-2">
          <span className="text-[11px] flex items-center">
            {rating} <StarFilled className="text-[10px] text-yellow-400 ml-1" />
          </span>
          <span className="text-[11px]">
            <span className="text-gray-300"> |</span> Đã bán{" "}
            {selled.toLocaleString() || 1000}+
          </span>
        </div>
        <div className="font-semibold text-[18px] ">
          <div>
            {price.toLocaleString()}
            <span className="text-[18px] ">đ</span>
            <span className="bg-slate-200 border rounded-xl ml-2">
              {discount || 30}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
