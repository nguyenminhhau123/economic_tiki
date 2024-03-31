import React, { useState } from "react";
import "./style.css";
import { Image, Col, Row, InputNumber } from "antd";
import imageProduct from "../../assets/imgs/imtest.webp";
import imageSmall from "../../assets/imgs/imsmall.webp";
import imageSmall2 from "../../assets/imgs/imsmall2.webp";
import { StarFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import { Rate } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as ProductService from "../../services/ProductService";
import { user } from "../../redux/useSelector/userSelector";
import { addOrderProduct } from "../../redux/slices/OrderProduct";
export default function ProductDetailsComponent(idProduct) {
  const userId = useSelector(user);
  const dispatch = useDispatch();
  const [numberProduct, setNumberProduct] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnchangeCount = (type) => {
    if (type == "increase") {
      setNumberProduct((pre) => pre + 1);
    } else {
      setNumberProduct((pre) => pre - 1);
    }
  };
  const fetchDataProductDetails = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]?.id;

    try {
      if (id) {
        const res = await ProductService.getDetailsProduct(id);

        return res.data;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching product details");
    }
  };

  const queryProduct = useQuery({
    queryKey: ["products", idProduct],
    queryFn: fetchDataProductDetails,
    enabled: idProduct !== null && idProduct !== undefined,
  });
  const { refetch, isLoading, data: ProductDetails } = queryProduct;
  console.log("ProductDetails", ProductDetails);
  const handleAddProduct = () => {
    if (!userId?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: ProductDetails?.name,
            amount: numberProduct,
            price: ProductDetails?.price,
            image: ProductDetails?.image,
            product: ProductDetails?._id,
          },
        })
      );
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2 mt-3 lg:px-[120px] md:px-18 sm:px-3">
        <div className="bg-white lg:pr-3 md:flex-row w-full lg:grid-cols-1">
          <Image
            src={ProductDetails?.image}
            width={624}
            height={624}
            alt={ProductDetails?.name}
            preview={false}
          />
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
          <h1 className="text-xl font-medium ">{ProductDetails?.name}</h1>
          <div className="gap-3">
            <Rate defaultValue={ProductDetails?.rating} />
            <span>
              <span className="text-gray-300"> |</span> Đã bán{" "}
              {ProductDetails?.selled}
            </span>
            <div className="text-2xl font-medium mb-2">
              {ProductDetails?.price} đ
            </div>

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
                <button
                  onClick={() => {
                    handleOnchangeCount("decrease");
                  }}
                  className="text-[#000] text-[20px] border border-gray-100 rounded-md px-1 cursor-pointer"
                >
                  <MinusOutlined size="small" />
                </button>
                <InputNumber min={1} value={numberProduct} defaultValue={1} />
                <button
                  onClick={() => {
                    handleOnchangeCount("increase");
                  }}
                  className="text-[#000] text-[20px] border border-gray-100 rounded-md px-1 cursor-pointer"
                >
                  <PlusOutlined />
                </button>
              </div>
              <div className="flex gap-3 mt-3">
                <ButtonComponent
                  onClick={handleAddProduct}
                  border={false}
                  className="text-2xl w-[20%] h[20%]"
                  textButton="Mua Ngay"
                  styleButton={{
                    backgroundColor: "#F92411 !important",
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
