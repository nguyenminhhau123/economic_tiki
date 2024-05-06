import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../redux/slices/OrderProduct";
import { useNavigate } from "react-router-dom";
function ShippingPage() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  console.log("userDetails", userDetails);
  const shipping = useSelector((state) => state.order.shippingAddress);
  const { data } = userDetails;
  console.log(data);
  useEffect(() => {
    if (userDetails) {
      setFullName(shipping.fullName || data.name);
      setAddress(shipping.address || data.address);
      setCity(shipping.city || data.city);
      setPhone(shipping.phone || data.phone);
    }
  }, [userDetails]);
  const handlerShipping = (e) => {
    e.preventDefault();
    dispatch(
      setShippingAddress({
        fullName: fullName,
        address: address,
        city: city,
        phone: phone,
      })
    );
    navigate("/payment");
  };

  return (
    <>
      <h2 className="text-center mb-4 text-3xl">Shipping</h2>
      <form onSubmit={handlerShipping} className="text-center  p-4 rounded-md">
        <div className="flex items-center justify-center gap-x-2 mb-4">
          <label className="mr-2 text-lg font-light w-[4%]">Name:</label>
          <input
            className="w-[40%] h-[45px] rounded-lg border border-gray-300 px-2"
            type="text"
            name="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-x-2 mb-4">
          <label className="mr-2 text-lg font-light  w-[4%]">Address:</label>
          <input
            className="w-[40%] h-[45px] rounded-lg border border-gray-300 px-2"
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-x-2 mb-4">
          <label className="mr-2 text-lg font-light  w-[4%]">City:</label>
          <input
            className="w-[40%] h-[45px] rounded-lg border border-gray-300 px-2"
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center gap-x-2 mb-4">
          <label className="mr-2 text-lg font-light  w-[4%]">Phone:</label>
          <input
            className="w-[40%] h-[45px] rounded-lg border border-gray-300 px-2"
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <input
            type="submit"
            value="SAVE"
            className="text-lg p-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700"
          />
        </div>
      </form>
    </>
  );
}

export default ShippingPage;
