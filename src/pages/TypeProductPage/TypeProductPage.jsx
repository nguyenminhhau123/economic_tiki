import React, { useEffect, useState } from "react";
import { Row, Col, Pagination } from "antd";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CartComponent from "../../components/CartComponent/CartComponent";
import * as ProductService from "../../services/ProductService";
import { useLocation } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { productSearch } from "../../redux/useSelector/userSelector";
import { useDebounce } from "../../hooks/useDebounHook";

export default function TypeProductPage() {
  const dataSearch = useSelector(productSearch);
  const debounceSearch = useDebounce(dataSearch, 1000);

  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  const [productType, setProductType] = useState([]);
  const location = useLocation();
  const { state } = location;

  const [isLoading, setIsLoading] = useState(false);
  const fetchDataProductType = async (state, page, limit) => {
    setIsLoading(true);
    const res = await ProductService.getProductType(state, page, limit);
    console.log("res", state, page, limit);
    if (res?.status == "Ok") {
      setIsLoading(false);
      setProductType(res.productFilter);
      setPagination({
        ...pagination,
        total: res?.total,
        limit: res?.totalPage,
      });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchDataProductType(state, pagination.page, pagination.limit);
    }
  }, [state, pagination.page]); // Chỉ theo dõi pagination.page

  const handleOnchangePagination = (current, pageSize) => {
    setPagination({
      ...pagination,
      page: current - 1,
      limit: pageSize,
    });
  };
  console.log("productTypee", productType);
  return (
    <div className="w-full bg-[#efefef]">
      <div className="px-12 m-0 items-center justify-center sm:p-0 md:px-0">
        <Loading isLoading={isLoading}>
          <Row className="flex-col md:flex-row pt-10">
            <Col className="md:bg-bgColor w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  items-center flex-1 gap-3  ">
              {productType
                ?.filter((pro) => {
                  if (debounceSearch === "") {
                    return pro;
                  } else if (
                    pro?.name
                      ?.toLowerCase()
                      ?.includes(debounceSearch?.toLowerCase())
                  ) {
                    return pro;
                  }
                })
                ?.map((product) => {
                  return (
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
                  );
                })}
            </Col>
            {/* NavbarComponent */}
            <div className="md:w-auto bg-bgColor md:mt-0 md:ml-2 sm:mt-2 p-10 rounded-md md:block">
              <NavbarComponent />
            </div>
          </Row>
        </Loading>
        <div className=" flex items-center justify-center mt-10">
          <Pagination
            defaultCurrent={pagination.page + 1}
            total={100}
            onChange={handleOnchangePagination}
          />
        </div>
      </div>
    </div>
  );
}
