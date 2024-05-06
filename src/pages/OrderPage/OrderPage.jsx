import { Checkbox, Form, InputNumber, Image, Button, Descriptions } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast, Zoom } from "react-toastify";
import {
  orderProduct,
  selectedOrder,
} from "../../redux/useSelector/userSelector";
import { useEffect, useMemo, useRef, useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import logo from "../../assets/imgs/logo_real.png";
import {
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeOrderAllProduct,
  setSelectedOrderItems,
} from "../../redux/slices/OrderProduct";
import { convertPrice } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import StepsComponent from "../../components/StepComponent/StepsComponent";
const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listCheckbox, setListCheckbox] = useState([]);

  const orderItems = useSelector(orderProduct);

  const orderItemsSelected = useSelector(
    (state) => state.order?.orderItemsSelected
  );

  const totalAmount = orderItemsSelected.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  // const totalAmount = listCheckbox?.length;
  const userDetails = useSelector((state) => state.user.userDetails);
  const shipping = useSelector((state) => state.order.shippingAddress);

  // Hàm để lấy trạng thái của checkbox từ Local Storage khi load lại trang
  useEffect(() => {
    const storedListCheckbox = JSON.parse(localStorage.getItem("listCheckbox"));
    if (storedListCheckbox) {
      setListCheckbox(storedListCheckbox);
    }
  }, []);

  // Hàm để lưu trạng thái của checkbox vào Local Storage khi thay đổi
  useEffect(() => {
    localStorage.setItem("listCheckbox", JSON.stringify(listCheckbox));
  }, [listCheckbox]);
  useEffect(() => {
    if (listCheckbox && listCheckbox.length > 0) {
      dispatch(setSelectedOrderItems({ listCheckbox }));
    }
  }, [listCheckbox]);

  const itemSelected = useSelector(selectedOrder);

  const handleOnchangeCount = (type, idProduct) => {
    const currentItem = orderItems.find((item) => item.product === idProduct);

    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      // Kiểm tra nếu số lượng hiện tại đã là 1 thì không thực hiện giảm nữa
      if (currentItem.amount > 1) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const removeHandleOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };
  const onChangeCheckbox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setListCheckbox([...listCheckbox, value]);
    } else {
      setListCheckbox(listCheckbox.filter((item) => item !== value));
    }
  };
  const onChangeAllCheckbox = (e) => {
    if (e.target.checked) {
      const newListCheckbox = [];
      orderItems.forEach((element) => {
        newListCheckbox.push(element?.product);
      });
      setListCheckbox(newListCheckbox);
    } else {
      setListCheckbox([]);
    }
  };
  const handleRemoveAllProduct = () => {
    if (listCheckbox?.length >= 1) {
      dispatch(removeOrderAllProduct({ listCheckbox }));
    }
  };

  const priceMemo = useMemo(() => {
    const result = itemSelected?.reduce((total, cur) => {
      return (total += cur.price * cur.amount);
    }, 0);
    return result;
  }, [itemSelected]);
  const priceDiscount = useMemo(() => {
    const result = itemSelected?.reduce((total, cur) => {
      const discountDecimal = cur.discount / 100;
      return (total += priceMemo * discountDecimal);
    }, 0);
    return result;
  }, [itemSelected, priceMemo]);

  const priceDeliver = useMemo(() => {
    if (priceMemo <= 200000 && priceMemo > 1) {
      return 20000;
    } else if (priceMemo <= 500000) {
      return 10000;
    } else {
      return 0;
    }
  }, [priceMemo]);

  const priceTotal = useMemo(() => {
    return priceMemo - priceDiscount + priceDeliver;
  }, [priceMemo, priceDiscount, priceDeliver]);
  const handleAddCard = () => {
    if (listCheckbox.length > 0 && orderItemsSelected?.length > 0) {
      navigate("/shipping");
    } else {
      toast.error("is not item!", {
        position: "top-right",
        transition: Zoom,
      });
    }
  };
  const stepsItems = [
    {
      title: "20.000 VND",
      description: "Dưới 200.000 VND",
    },
    {
      title: "10.000 VND",
      description: "Từ 200.000 VND đến dưới 500.000 VND",
    },
    {
      title: "0 VND",
      description: "Trên 500.00 VND",
    },
  ];
  return (
    <div className="lg:px-[120px] ">
      <div
        className="bg:[#F5F5FA] h-[100hz] md:px-0 lg:px-[120px]
    "
      >
        <span className="text-[24px] font-medium">GIỎ HÀNG</span>
        <div className=" w-full flex lg:flex-row md:flex-col sm:flex-col gap-x-4 max-sm:w-[100%]">
          <div className="lg:w-[70%] sm:w-auto md:[100%]">
            <div className="bg-white flex mb-4 px-2 w-[100%]">
              <div className="w-[50%] gap-x-2">
                <Checkbox
                  onChange={onChangeAllCheckbox}
                  checked={listCheckbox?.length == orderItems?.length}
                ></Checkbox>
                <span className="text-[18px] ml-2">
                  tất cả {orderItems?.length} sản phẩm
                </span>
              </div>

              <div className="flex w-[50%] justify-center items-center ">
                <span className="w-[25%]">đơn giá</span>
                <span className="w-[30%]">số lượng</span>
                <span className="w-[30%]">thành tiền</span>
                <span className="w-[15%]">
                  <DeleteOutlined onClick={handleRemoveAllProduct} />
                </span>
              </div>
            </div>
            <StepsComponent
              items={stepsItems}
              current={
                priceDeliver == 20000 ? 0 : priceDeliver == 10000 ? 1 : 2
              }
            />
            {orderItems?.map((item) => {
              return (
                <div className="bg-white flex-1 flex px-2 py-4">
                  <div className="w-[50%] flex gap-x-3">
                    <div className="w-[3%]">
                      <Checkbox
                        onChange={onChangeCheckbox}
                        value={item.product}
                        checked={listCheckbox.includes(item.product)}
                      />
                    </div>

                    <img
                      className=" w-[10%] h-[48px] object-cover"
                      src={item?.image}
                    ></img>
                    <div className="w-[80%]">
                      <div className="w-[20%] h-[20%] mb-3  ">
                        <Image preview={false} src={logo} />
                      </div>
                      <div className="w-[100%] whitespace-nowrap overflow-hidden overflow-ellipsis hover:whitespace-normal hover:overflow-visible">
                        {item.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-[50%]  justify-between items-center">
                    <span className="font-semibold w-[25%] ">
                      {convertPrice(item.price)}
                    </span>

                    <div className="flex gap-1 w-[30%] ">
                      <button
                        onClick={() => {
                          handleOnchangeCount("decrease", item?.product);
                        }}
                        className="text-[#000] text-[60%] border border-gray-100 rounded-md px-1 cursor-pointer"
                      >
                        <div disable={item?.amount === 1}>
                          <MinusOutlined
                            style={{
                              pointerEvents:
                                item.amount === 1 ? "none" : "auto",
                              opacity: item.amount === 1 ? 0.5 : 1,
                            }}
                            size="small"
                          />
                        </div>
                      </button>
                      <InputNumber
                        min={1}
                        value={item.amount}
                        defaultValue={1}
                      />
                      <button
                        onClick={() => {
                          handleOnchangeCount("increase", item?.product);
                        }}
                        className="text-[#000] text-[60%]  border border-gray-100 rounded-md px-1 cursor-pointer"
                      >
                        <PlusOutlined />
                      </button>
                    </div>

                    <div className=" text-red-500 w-[30%]">
                      {convertPrice(item.price * item?.amount)}
                    </div>
                    <span className="w-[15%]">
                      <DeleteOutlined
                        onClick={() => {
                          removeHandleOrder(item?.product);
                        }}
                      />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-1 hidden sm:block">
            <div className="bg-white p-4 ">
              <div className="flex justify-between ">
                <span className="text-gray-400 ">Giao tới</span>
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate("/shipping")}
                >
                  thay đổi
                </span>
              </div>
              <div className="flex font-semibold gap-x-4">
                <div>
                  {shipping ? shipping?.fullName : userDetails?.data.name}
                </div>
                <div>{shipping?.phone || userDetails?.data.phone}</div>
              </div>
              <div>
                {shipping?.address || userDetails?.data.address} -
                <span> {shipping?.city || userDetails?.data.city}</span>
              </div>
            </div>
            <div className="bg-white  p-4 ">
              <div className="text-[22px]">Đơn hàng</div>
              <div className="ml-2">{totalAmount} số lượng</div>
              <div className="w-full h-[1px] bg-gray-300 my-1"></div>
              <div className="">
                <div className="flex justify-between text-gray-500">
                  <span>Tạm Tính</span>
                  <span>
                    {listCheckbox.length > 0 && convertPrice(priceMemo)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 ">
                  <span>Giảm giá</span>
                  <span>
                    {listCheckbox.length > 0 && convertPrice(priceDiscount)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 ">
                  <span>phí vận chuyển</span>
                  <span>
                    {" "}
                    {listCheckbox.length > 0 && convertPrice(priceDeliver)}
                  </span>
                </div>
                <div className="w-full h-[1px] bg-gray-300 my-3"></div>
                <div className="flex justify-between text-gray-500">
                  <span>Tổng tiền</span>
                  <span className="text-[26px] text-red-500">
                    {listCheckbox.length > 0 && convertPrice(priceTotal)}
                  </span>
                </div>
                <div className=" flex text-right w-[100%] justify-end items-center text-gray-400">
                  (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và
                  các chi phí phát sinh khác)
                </div>
              </div>
              <Button
                className="w-[100%] h-[50px] mt-2 text-[25px] bg-red-500 text-white "
                onClick={handleAddCard}
              >
                Mua Hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
