import { Col, Badge, Image, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import Search from "antd/lib/transfer/search";
import logo from "../../assets/imgs/logo3.png";
import { WrapperHeader } from "./styles";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { ResetUser } from "../../redux/slices/userSlice";
import { searchProduct } from "../../redux/slices/ProductSlice";
import {
  UserOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { user } from "../../redux/useSelector/userSelector";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../LoadingComponent/Loading";

export default function HeaderComponent({ isSearch, isCart }) {
  const [isPending, setIsPending] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const dispatch = useDispatch();
  // search
  const handleSearch = (e) => {
    setStateSearch(e.target.value);
    // console.log(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const handleLogoutUser = async () => {
    localStorage.clear();
    setIsPending(true);
    navigate("/");
    await UserService.logout_user();
    dispatch(ResetUser());
    setIsPending(false);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/sign-in");
  };
  //
  const data = useSelector(user);

  useEffect(() => {
    setUserName(data?.name);
    setUserAvatar(data?.avatar);
  }, [data?.name, data?.avatar]);
  const content = (
    <div className="font-normal">
      <p
        className="  cursor-pointer p-[4px] hover:text-primary"
        onClick={handleLogoutUser}
      >
        Logout
      </p>

      <p
        className="py-[2px] cursor-pointer hover:text-primary"
        onClick={() => navigate("/profile-user")}
      >
        Thông tin cá nhân
      </p>
      {data?.isAdmin && (
        <p
          className="py-[2px] cursor-pointer hover:text-primary"
          onClick={() => navigate("/system/admin")}
        >
          Quản lý hệ thống
        </p>
      )}
    </div>
  );
  return (
    // <div className="fixed top-0 left-0 w-[100%] z-[1000]">
    <div
      className={`w-full grid ${
        isCart ? "lg:grid-cols-2 " : "grid-cols-4"
      } bg-primary h-[80px]`}
    >
      <div
        className="flex col-span-2 lg:col-span-1 gap-x-3 justify-center items-center
      "
      >
        <div className="font-extrabold text-[25px] text-white  md:block hidden">
          Developer
        </div>
        <div
          className="m-0 flex justify-center 
           rounded-md items-center h-[10%] w-[10%]"
        >
          <Image src={logo} />
        </div>
      </div>
      {!isSearch && (
        <div className="flex lg:col-span-2 flex-1 justify-center items-center ">
          <div className="flex-1 lg:block hidden">
            <InputComponent
              placeholder="search"
              value={stateSearch}
              onChange={handleSearch}
            />
          </div>

          <div className="lg:block hidden">
            <ButtonComponent
              className="w-[20%]"
              textButton="Search"
              icon={<SearchOutlined />}
            />
          </div>
        </div>
      )}
      <div className="flex col-span-2 lg:col-span-1 items-center justify-center">
        <div className="flex justify-center items-center gap-x-10">
          <Loading isLoading={isPending}>
            <div className=" flex items-center justify-center text-white ml-6">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  className="w-[40px] h-[40px] rounded-full mr-2 object-cover"
                />
              ) : (
                <UserOutlined className="text-[30px]" />
              )}

              {data?.access_token ? (
                <Popover content={content} trigger="click">
                  <div className="cursor-pointer">
                    {userName?.length ? userName : data?.email}{" "}
                  </div>
                </Popover>
              ) : (
                <div>
                  <p
                    onClick={handleNavigate}
                    className="text-[12px] cursor-pointer"
                  >
                    Đăng nhập/đăng ký
                  </p>
                  <div className="flex">
                    <span>tài khoản</span>
                    <DownOutlined />
                  </div>
                </div>
              )}
            </div>
          </Loading>
          {!isCart && (
            <div className=" flex-1  hidden md:block ">
              <div className="flex justify-center items-center">
                <Badge count={4} size="small">
                  <ShoppingCartOutlined className="text-[30px] flex text-white" />
                </Badge>
                <span className="flex text-[16px]  text-white items-end">
                  Giỏ hàng
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
}
