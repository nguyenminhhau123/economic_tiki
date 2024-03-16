import React from "react";
import "./style.css";

import { Image, Col, Row, InputNumber } from "antd";
import imageProduct from "../../assets/imgs/imtest.webp";
import imageSmall from "../../assets/imgs/imsmall.webp";
import imageSmall2 from "../../assets/imgs/imsmall2.webp";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
export default function ProductDetailsComponent() {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2 mt-3 lg:px-[120px] md:px-18 sm:px-3">
        <div className="bg-white lg:pr-3 md:flex-row w-full lg:grid-cols-1">
          <Image src={imageProduct} alt="image-product" preview={false} />
          <div className="w-full flex items-center gap-x-6 justify-center">
            <div className="w-19%">
              <Image src={imageSmall} preview={false} />
            </div>
            <div className="w-19%">
              <Image src={imageSmall2} preview={false} />
            </div>
            <div className="w-19%">
              <Image src={imageSmall} preview={false} />
            </div>
            <div className="w-19%">
              <Image src={imageSmall2} preview={false} />
            </div>
            <div className="w-19%">
              <Image src={imageSmall2} preview={false} />
            </div>
          </div>
        </div>
        <div className="border md:flex-row lg:flex-col lg:grid-cols-1 lg:w-auto bg-white w-full">
          <h1 className="text-xl font-medium ">
            Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S
            Pen - Hàng Chính Hãng
          </h1>
          <div className="gap-3">
            <StarFilled className="text-[10px] text-yellow-400 ml-1" />
            <StarFilled className="text-[10px] text-yellow-400 ml-1" />
            <StarFilled className="text-[10px] text-yellow-400 ml-1" />
            <span>
              <span className="text-gray-300"> |</span> Đã bán 1000+
            </span>
            <div className="text-2xl font-medium mb-2">200.000 đ</div>

            <div className="text-xs">
              <span className=" mr-2"> Giao đến:</span>
              <span className="text-xl mr-2 leading-3 underline text-blue-500">
                Tuy An-Phu Yen
              </span>
              <span className="text-xs text-blue-500 underline">
                đổi địa chỉ
              </span>
            </div>
            <div className="mt-2">
              <div className="text-[16px]">số lượng</div>

              <div className="flex gap-1 mt-2 ">
                <button className="text-[#000] text-[20px] border border-gray-100 rounded-md px-1 cursor-pointer">
                  <MinusOutlined size="small" />
                </button>
                <InputNumber defaultValue={3} />
                <button className="text-[#000] text-[20px] border border-gray-100 rounded-md px-1 cursor-pointer">
                  <PlusOutlined />
                </button>
              </div>
              <div className="flex gap-3 mt-3">
                <ButtonComponent
                  border={false}
                  className="text-2xl w-[20%] h[20%]"
                  textButton="Mua Ngay"
                  styleButton={{
                    background: "rgb(255, 57, 69)",
                    border: "none",
                    height: "100%",
                    width: "100%",
                    borderRadius: "4px",
                  }}
                ></ButtonComponent>
                <ButtonComponent
                  border={false}
                  className="text-2xl w-[20%] h[20%]"
                  textButton="Mua trước trả sau"
                  styleButton={{
                    color: "rgb(13,92,182)",
                    border: "1px solid blue",
                    height: "100%",
                    width: "100%",
                    borderRadius: "4px",
                  }}
                ></ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
