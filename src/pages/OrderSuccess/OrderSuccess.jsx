import React from "react";
import { useQuery } from "@tanstack/react-query";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { Space, Table, Tag } from "antd";
import { convertPrice, price } from "../../utils/utils";
import CartComponent from "../../components/CartComponent/CartComponent";
// import { StyledButton } from "./styles";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { productSearch } from "../../redux/useSelector/userSelector";
import { Children, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounHook";
import Loading from "../../components/LoadingComponent/Loading";
import { useDispatch } from "react-redux";
import { setProduct } from "../../redux/slices/ProductSlice";
import { productData } from "../../redux/useSelector/userSelector";
function OrderSuccess() {
  const [isShow, setIsShow] = useState(false);
  const [typeProduct, setTypeProduct] = useState("");
  const refStateProducts = useRef([]);
  const dispatch = useDispatch();
  const [stateProducts, setStateProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const dataProduct = useSelector(productData);
  useEffect(() => {
    if (dataProduct?.length > 0) {
      refStateProducts.current = dataProduct;
    }
  }, [dataProduct]);
  const searchProduct = useSelector(productSearch);
  const debounceSearch = useDebounce(searchProduct, 1000);

  const refSearch = useRef();
  const fetchData = async (context) => {
    const limitProduct = context?.queryKey && context?.queryKey[1];
    const searchProduct = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(searchProduct, limitProduct);
    if (searchProduct?.length > 0 || refSearch.current) {
      setStateProducts(res?.productFilter);
      dispatch(setProduct(res?.productFilter));
      return res;
    } else {
      setStateProducts(res?.productAll);
      dispatch(setProduct(res?.productAll));
      return res;
    }
  };
  const getDataProduct = useQuery({
    queryKey: ["products", limit, debounceSearch],
    queryFn: fetchData,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const { data, isPending } = getDataProduct;

  useEffect(() => {
    if (data?.productAll?.length > 0) {
      setStateProducts(data?.productAll);
    }
  }, [data]);
  const getAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();

    if (res?.status == "ok") {
      setTypeProduct(res);
    }
  };
  useEffect(() => {
    getAllTypeProduct();
  }, []);

  const orderDetails = useSelector((state) => state?.order?.createOrderStore);

  const { orderItems, shippingAddress, totalPrice } = orderDetails?.data;
  console.log(orderDetails);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Is Paid",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (
        <Tag color={isPaid ? "green" : "volcano"}>
          {isPaid ? "Paid" : "Unpaid"}
        </Tag>
      ),
    },
  ];

  const dataSource = orderItems?.map((item, index) => ({
    key: index,
    name: item?.name,
    amount: item?.amount,
    price: price(item?.price),
    isPaid: item?.isPaid,
  }));

  return (
    <div className="lg:px-[120px] mt-3">
      <div className="text-[20px] font-semibold">Chi tiết đơn hàng</div>
      <Table columns={columns} dataSource={dataSource} />
      <div>
        <p className="text-[18px] ">
          <span className="font-semibold"> Shipping Address:</span>
          <span>
            {" "}
            {`${shippingAddress?.fullName}, ${shippingAddress?.address}, ${shippingAddress?.city}`}
          </span>
        </p>
        <p className="text-[18px] mt-2">
          <span className="font-semibold"> Total Price:</span>
          <span> {convertPrice(totalPrice)}</span>
        </p>
      </div>
      <div className="h-[1px] bg-slate-200 m-4"></div>
      <div className="w-full">
        <button
          className="text-white bg-blue-500 text-[20px]  py-4 px-8 flex justify-center items-center"
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? (
            <span>Đóng sản phẩm liên quan</span>
          ) : (
            <span>Xem những sản phẩm khác</span>
          )}
        </button>
        {isShow ? (
          <Loading isLoading={isPending}>
            <div className=" lg:px-[120px] md:p-0 items-center justify-center">
              <div className="bg-bgColor grid md:grid-cols-3 lg:grid-cols-5 mt-[20px] sm:grid-cols-2 justify-center items-center gap-x-3 gap-y-4">
                {refStateProducts.current?.map((product) => (
                  <CartComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-3">
                {stateProducts?.length === data?.total ||
                data?.totalPage === 1 ||
                data?.totalPage === null ? (
                  <div
                    styleButton={{
                      border: "1px solid #ccc",
                      color: "#999",
                      width: "240px",
                      height: "38px",
                      borderRadius: "4px",
                      background: "#f9f9f9",
                      cursor: "not-allowed",
                    }}
                    size="large"
                    textButton="Out of product"
                    disabled
                  />
                ) : (
                  <div
                    onClick={() => setLimit((prevLimit) => prevLimit + 5)}
                    styleButton={{
                      border: "1px solid rgb(11, 116, 229)",
                      color: "white",
                      width: "240px",
                      height: "38px",
                      borderRadius: "4px",
                      background: "#0065D7",
                    }}
                    size="large"
                    textButton={isPending ? "Load more" : "Add product"}
                  />
                )}
              </div>
            </div>
          </Loading>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OrderSuccess;
