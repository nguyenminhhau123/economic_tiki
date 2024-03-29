import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="px-[120px]">
        <span
          className="cursor-pointer font-bold"
          onClick={() => navigate("/")}
        >
          Trang chủ
        </span>
        - <span className="text-[14px]">chi tiết sản phẩm</span>
      </div>
      <ProductDetailsComponent id={id} />
    </>
  );
}
