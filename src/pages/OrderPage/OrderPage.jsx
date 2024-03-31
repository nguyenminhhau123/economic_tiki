import { Checkbox, Form, InputNumber, Image } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { orderProduct } from "../../redux/useSelector/userSelector";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import logo from "../../assets/imgs/logo_real.png";
import {
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
} from "../../redux/slices/OrderProduct";
const OrderPage = () => {
  const [listCheckbox, setListCheckbox] = useState([]);
  const orderItems = useSelector(orderProduct);
  const totalAmount = orderItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  const dispatch = useDispatch();
  const handleOnchangeCount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };
  const removeHandleOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };
  const onChangeCheckbox = (e) => {
    if (listCheckbox?.includes(e.target.value)) {
      const newListCheckbox = listCheckbox?.filter(
        (item) => item !== e.target.value
      );
      setListCheckbox(newListCheckbox);
    } else {
      setListCheckbox([...listCheckbox, e.target.value]);
    }
  };
  console.log("stateCheckbox", listCheckbox);
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
  return (
    <div
      className="lg:px-[120px] bg:[#F5F5FA] h-[100hz] md:px-0
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
                <DeleteOutlined />
              </span>
            </div>
          </div>
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
                    <div className="w-[20%] h-[20%] mb-1">
                      <Image preview={false} src={logo} />
                    </div>
                    <div className="w-[100%] whitespace-nowrap overflow-hidden overflow-ellipsis hover:whitespace-normal hover:overflow-visible">
                      {item.name}
                    </div>
                  </div>
                </div>
                <div className="flex w-[50%]  justify-between items-center">
                  <span className="font-semibold w-[25%] ">{item.price}đ</span>

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
                            pointerEvents: item.amount === 1 ? "none" : "auto",
                            opacity: item.amount === 1 ? 0.5 : 1,
                          }}
                          size="small"
                        />
                      </div>
                    </button>
                    <InputNumber min={1} value={item.amount} defaultValue={1} />
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
                    {item.price * item?.amount}
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
              <span className="text-blue-600 cursor-pointer">thay đổi</span>
            </div>
            <div className="flex font-semibold gap-x-4">
              <div>Nguyễn Minh Hậu</div>
              <div>032842567</div>
            </div>
            <div>
              công ty TNHH quang quân, Xã Tóc Tiên, Thị xã Phú Mỹ, Bà Rịa - Vũng
              Tàu
            </div>
          </div>
          <div className="bg-white  p-4 ">
            <div className="text-[22px]">Đơn hàng</div>
            <div className="ml-2">{totalAmount} số lượng</div>
            <div className="w-full h-[1px] bg-gray-300 my-1"></div>
            <div className="">
              <div className="flex justify-between text-gray-500">
                <span>Tạm Tính</span>
                <span>679.000đ</span>
              </div>
              <div className="flex justify-between text-gray-500 ">
                <span>Giảm giá</span>
                <span>67.000đ</span>
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-3"></div>
              <div className="flex justify-between text-gray-500">
                <span>Tổng tiền</span>
                <span className="text-[26px] text-red-500">600.000đ</span>
              </div>
              <div className=" flex text-right w-[100%] justify-end items-center text-gray-400">
                (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và
                các chi phí phát sinh khác)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;