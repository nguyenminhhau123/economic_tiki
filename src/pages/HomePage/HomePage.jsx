import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SliderComponent from "../../components/SlideComponent/SlideComponent";
import { useQuery } from "@tanstack/react-query";
import slider2 from "../../assets/imgs/slider2.webp";
import slider3 from "../../assets/imgs/slider3.webp";
import slider4 from "../../assets/imgs/slider4.webp";
import slider5 from "../../assets/imgs/slider5.webp";
import slider6 from "../../assets/imgs/slider6.webp";
import slider7 from "../../assets/imgs/slider7.webp";
// import slider6 from "../../assets/imgs/slider6.jpg";
// import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
// import ButtonComPonent from "../../components/ButtonComponent/ButtonComponent";
import CartComponent from "../../components/CartComponent/CartComponent";
import { StyledButton } from "./styles";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { productSearch } from "../../redux/useSelector/userSelector";
import { Children, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounHook";
import Loading from "../../components/LoadingComponent/Loading";
import { useDispatch } from "react-redux";
import { setProduct } from "../../redux/slices/ProductSlice";
import { productData } from "../../redux/useSelector/userSelector";
export default function HomePage() {
  const [typeProduct, setTypeProduct] = useState("");
  const refStateProducts = useRef([]);
  const dispatch = useDispatch();
  const [stateProducts, setStateProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const dataProduct = useSelector(productData);
  useEffect(() => {
    if (dataProduct.length > 0) {
      refStateProducts.current = dataProduct;
    }
  }, [dataProduct]);
  const searchProduct = useSelector(productSearch);
  const debounceSearch = useDebounce(searchProduct, 1000);
  console.log("stateProducts2323", stateProducts);
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

  // refSearch.current = true;:
  // Dòng này đảm bảo rằng if (refSearch.current) sẽ luôn trả về true trong các lần kế tiếp sau lần render đầu tiên, điều này đảm bảo rằng dữ liệu không bị tải lại mỗi lần useEffect được gọi.
  // useEffect(() => {
  //   if (refSearch.current) {
  //     setLoading(true);
  //     fetchData(debounceSearch);
  //   }
  //   refSearch.current = true;
  //   setLoading(false);
  // }, [debounceSearch]);
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
  // // Hàm tìm kiếm bị trì hoãn bởi debounce
  // const debounceSearch = debounce((value) => {
  //   fetchData(value);
  //   console.log("Searching for:", value);
  // }, 500);
  const getAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    console.log("resda", res);
    if (res?.status == "ok") {
      setTypeProduct(res);
    }
  };
  useEffect(() => {
    getAllTypeProduct();
  }, []);

  return (
    <>
      <div className="  lg:px-[120px] flex text-[20px] items-center font-medium h-[44px] gap-x-4 mt-1 ">
        {typeProduct?.data?.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </div>
      <div className=" h-[1270px]">
        <div className="lg:px-[120px] md:p-0">
          <SliderComponent
            arrImages={[slider2, slider3, slider4, slider5, slider6, slider7]}
          />
        </div>
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
                <StyledButton
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
                <StyledButton
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
      </div>
    </>
  );
}
