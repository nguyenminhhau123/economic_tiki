import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { Image, Form } from "antd"; // Chỉ import Form từ antd
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import InputForm from "../../components/InputForm/InputForm";
import imLogo from "../../assets/imgs/imLogo.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser, userDetails } from "../../redux/slices/userSlice";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = () => {
    navigate("/sign-up");
  };

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const mutation = useMutationHooks((data) => UserService.signInUser(data));
  const { data, isPending, isSuccess } = mutation;

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(userDetails(res));
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  useEffect(() => {
    if (isSuccess && data?.status === "ok") {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      toast.success(" Login Successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });

      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleOnclickSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className="flex items-center justify-center bg-gray-300 h-[100vh]">
      <div className="flex sm:w-[900px] h-[500px] rounded-lg bg-[#FFFFFF]">
        <div className="w-[100%] md:w-[60%] p-8">
          <h1 className="text-[30px] text-2xl font-semibold mb-4 mt-3">
            Xin chào
          </h1>
          <p className="mb-4 text-md">Đăng Nhập vào tài khoản</p>
          <Form
            name="signInForm"
            initialValues={{ remember: true }}
            onFinish={handleOnclickSignIn}
          >
            <InputForm
              handleOnChange={handleOnchangeEmail}
              value={email}
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              placeholder="Nhập email"
            />
            <div className="relative">
              <span
                className="z-10 absolute top-5 right-2"
                onClick={() => {
                  setIsShowPassword(!isShowPassword);
                }}
              >
                {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
            </div>
            <InputForm
              handleOnChange={handleOnchangePassword}
              value={password}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              placeholder="Nhập mật khẩu"
              type={isShowPassword ? "text" : "password"}
            />
            {data?.status === "ERR" && (
              <span className="text-red-500">{data?.errMessage}</span>
            )}
            <Loading isLoading={isPending}>
              <ButtonComponent
                disabled={!email.length || !password.length}
                onClick={handleOnclickSignIn}
                className="text-2xl h-[48px] w-[220px]"
                size={50}
                textButton="Đăng Nhập"
                styleButton={{
                  color: "#fff",
                  background: "rgb(255, 57, 69)",
                  border: "none",
                  height: "48px",
                  width: "100%",
                  borderRadius: "4px",
                }}
              />
            </Loading>
          </Form>
          <div className="text-blue-400 mt-5 cursor-pointer">
            Quên mật khẩu ?
          </div>
          <div className="mt-5">
            Chưa có tài khoản?
            <span
              className="text-blue-400 cursor-pointer"
              onClick={handleNavigate}
            >
              Tạo tài khoản
            </span>
          </div>
        </div>
        <div className="bg-[#E0F0FF] hidden md:block flex-1 py-28">
          <div className="flex flex-col items-center justify-center">
            <Image
              className=""
              preview={false}
              src={imLogo}
              width={"200px"}
              height={"200px"}
            />
            <div className="justify-center items-center mt-2 gap-3 text-blue-700">
              <div className="font-medium mb-1">Mua sắm ngay</div>
              <div>Siêu ưu đãi mỗi ngày</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
