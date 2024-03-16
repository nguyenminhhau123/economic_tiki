import React from "react";
import { Card, Image } from "antd";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/imgs/logo_real.png";
import "./style.css";
export default function CartComponent(props) {
  const {
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

  return (
    <Card
      hoverable
      className="w-full"
      cover={
        <img
          className=" w-[20%] h-full m-0 p-0"
          alt="example"
          src="https://salt.tikicdn.com/cache/280x280/ts/product/80/dc/a5/5c07f290ea8cf3b600029c5503bb1e60.png.webp"
        />
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
            <span className="text-gray-300"> |</span> Đã bán {selled || 1000}+
          </span>
        </div>
        <div className="font-semibold text-[18px] ">
          <div>
            {price}
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
