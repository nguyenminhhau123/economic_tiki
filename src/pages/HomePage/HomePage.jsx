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
export default function HomePage() {
  const dataModel = ["Tủ lạnh", "Máy giặt", "Tivi", "laptop", "Điện thoại"];
  const fetchData = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  });

  return (
    <>
      <div className=" px-[120px] flex justify-center items-center h-[44px] gap-x-6 ">
        {dataModel.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </div>
      <div className=" h-[1270px]">
        <div className="lg:px-[120px] md:p-0">
          <SliderComponent
            arrImages={[slider2, slider3, slider4, slider5, slider6, slider7]}
          />
        </div>

        <div className=" lg:px-[120px] md:p-0 items-center justify-center">
          <div className="bg-bgColor grid md:grid-cols-3 lg:grid-cols-5 mt-[20px] sm:grid-cols-2 justify-center items-center gap-x-3 gap-y-4">
            {data?.productAll?.map((product) => (
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
              />
            ))}
          </div>
          <div className="flex justify-center mt-3 ">
            <StyledButton
              styleButton={{
                border: "1px solid rgb(11,116,229)",
                color: "white",
                width: "240px",
                height: "38px",
                borderRadius: "4px",
                background: "#0065D7",
              }}
              size="large"
              textButton="Xem thêm"
            />
          </div>
        </div>
      </div>
    </>
  );
}
