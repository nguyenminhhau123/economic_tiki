import { Checkbox, Form, InputNumber, Image, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import * as orderService from "../../services/OrderService";
import { toast, Zoom } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  user,
  orderProduct,
  selectedOrder,
} from "../../redux/useSelector/userSelector";
import { useEffect, useMemo, useRef, useState } from "react";
import { createOrderStore } from "../../redux/slices/OrderProduct";
import { resetItemsOrder } from "../../redux/slices/OrderProduct";
import { convertPrice } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  const [payment, setPayment] = useState(null);
  const [deliver, setDeliver] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listCheckbox, setListCheckbox] = useState([]);

  const orderItems = useSelector(orderProduct);
  const userDetails = useSelector((state) => state.user.userDetails);
  const dataUser = useSelector(user);
  const itemSelected = useSelector(selectedOrder);
  const orderItemsSelected = useSelector(
    (state) => state.order?.orderItemsSelected
  );
  const shippingAddress = useSelector((state) => state.order?.shippingAddress);
  const totalAmount = orderItemsSelected?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  // const userDetails = useSelector((state) => state.user.userDetails);
  // // console.log("userDetails", userDetails);
  const shipping = useSelector((state) => state.order.shippingAddress);
  console.log("shipping", shipping);
  // Hàm để lấy trạng thái của checkbox từ Local Storage khi load lại trang
  useEffect(() => {
    const storedListCheckbox = JSON.parse(localStorage.getItem("listCheckbox"));
    if (storedListCheckbox) {
      setListCheckbox(storedListCheckbox);
    }
  }, []);
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
    let randomNumber;
    if (priceMemo > 300000) {
      randomNumber = Math.random() * (25000 - 20000) + 20000;
    } else if (priceMemo >= 10000) {
      randomNumber = Math.random() * (15000 - 10000) + 10000;
    } else {
      return 0;
    }
    return Math.floor(randomNumber);
  }, [priceMemo]);

  const priceTotal = useMemo(() => {
    return priceMemo - priceDiscount + priceDeliver;
  }, [priceMemo, priceDiscount, priceDeliver]);

  // const mutationOrder = useMutation({
  //   mutationFn: (data) => {
  //     console.log("data", data);
  //     const { token, ...rests } = data;
  //     return orderService.createOrder(token, rests);
  //   },
  // });
  // const { isPending, isSuccess } = mutationOrder;
  // const createOrder = async () =>
  //   mutationOrder.mutate({
  //     token: dataUser?.access_token,
  //     orderItems: orderItemsSelected,
  //     paymentMethod: payment,
  //     deliver: deliver,
  //     itemsPrice: priceMemo,
  //     shippingPrice: priceDeliver,
  //     totalPrice: priceTotal,
  //     shippingAddress: shippingAddress,
  //     user: dataUser?.id,
  //   });
  const createOrderAction = async () => {
    const res = await orderService.createOrder({
      token: dataUser?.access_token,
      orderItems: orderItemsSelected,
      paymentMethod: payment,
      deliver: deliver,
      itemsPrice: priceMemo,
      shippingPrice: priceDeliver,
      totalPrice: priceTotal,
      shippingAddress: shippingAddress,
      user: dataUser?.id,
    });
    if (res) {
      dispatch(createOrderStore(res));
    }
  };

  const handleAddCard = async () => {
    try {
      await createOrderAction();
      toast.success(" Đặt hàng thành công!", {
        position: "top-right",
        transition: Zoom,
      });
      navigate("/ordersuccess");
      dispatch(resetItemsOrder());
    } catch {}
  };

  return (
    <div className="lg:px-[120px] ">
      <div
        className="bg:[#F5F5FA] h-[100hz] md:px-0 lg:px-[120px]
    "
      >
        <span className="text-[24px] font-medium bg-white">Thanh toán</span>
        <div className=" w-full flex lg:flex-row md:flex-col sm:flex-col gap-x-4 max-sm:w-[100%]">
          <div className="lg:w-[70%] sm:w-auto md:[100%]">
            <div className=" py-4 px-4 bg-white h-[440px] w-full mb-2">
              <span className="text-[24px] ">Chọn phương thức giao hàng</span>
              <div className=" py-4 px-4 w-[60%] bg-[#F1F6FF] border border-[#5d7db6] ">
                <div className="flex gap-2 mb-3">
                  <Checkbox
                    className="rounded-[50%]"
                    onChange={() => setDeliver("fast")}
                    checked={deliver == "fast"}
                  ></Checkbox>
                  <span className="text-yellow-500"> FAST</span>
                  <span> giao hàng nhanh chóng</span>
                </div>
                <div className="flex gap-2">
                  <Checkbox
                    className="rounded-[50%]"
                    onChange={() => setDeliver("slow")}
                    checked={deliver == "slow"}
                  ></Checkbox>
                  <span className="text-yellow-500">SLOW</span>
                  <span> giao hàng tiết kiệm</span>
                </div>
              </div>
              <p className="h-[2px] w-full bg-slate-100 mt-10 mb-16"></p>
              <span className="text-[24px] ">Chọn phương thức thanh toán</span>
              <div className=" py-4 px-4 w-[60%] bg-[#F1F6FF] border border-[#5d7db6] ">
                <div className="flex gap-2 mb-3">
                  <Checkbox
                    onChange={() => setPayment("cash")}
                    checked={payment === "cash"}
                    className="rounded-[50%]"
                  ></Checkbox>
                  <span className="text-[18px]">
                    Thanh toán bằng tiền mặt khi nhận hàng
                  </span>
                </div>
                <div className="flex gap-2 mb-3">
                  <Checkbox
                    onChange={() => setPayment("credit")}
                    className="rounded-[50%]"
                    checked={payment === "credit"}
                  ></Checkbox>
                  <span className="text-[18px]">
                    Thanh toán bằng credit card
                  </span>
                </div>
              </div>
            </div>
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
                <div>{shipping?.fullName || userDetails?.data.name}</div>
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
                  <span>{convertPrice(priceMemo)}</span>
                </div>
                <div className="flex justify-between text-gray-500 ">
                  <span>Giảm giá</span>
                  <span>{convertPrice(priceDiscount)}</span>
                </div>
                <div className="flex justify-between text-gray-500 ">
                  <span>phí vận chuyển</span>
                  <span>{convertPrice(priceDeliver)}</span>
                </div>
                <div className="w-full h-[1px] bg-gray-300 my-3"></div>
                <div className="flex justify-between text-gray-500">
                  <span>Tổng tiền</span>
                  <span className="text-[26px] text-red-500">
                    {convertPrice(priceTotal)}
                  </span>
                </div>
                <div className=" flex text-right w-[100%] justify-end items-center text-gray-400">
                  (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và
                  các chi phí phát sinh khác)
                </div>
              </div>
              <Button
                className="w-[100%] h-[50px] mt-2 text-[25px] bg-red-500 text-white "
                disabled={
                  !orderItems || orderItems.length === 0 || !deliver || !payment
                }
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

export default PaymentPage;
