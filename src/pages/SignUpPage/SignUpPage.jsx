import React, { useEffect, useState } from "react";

import { Image, Row, Col } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import imLogo from "../../assets/imgs/imLogo.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as Message from "../../components/Message/Message";
export default function SignUpPage() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/sign-in");
  };
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const mutation = useMutationHooks((data) => UserService.signUpUser(data));

  const { data, isPending, isError, isSuccess } = mutation;

  const handleOnclickSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
  };
  useEffect(() => {
    if (isSuccess && data?.status == "ok") {
      // Message.success("register successful");
      handleNavigate();
    } else if (isError && data?.status == "ERR") {
      Message.error("register wrong");
    }
  });

  return (
    <div className="flex items-center justify-center bg-gray-300 h-[100vh]">
      <div className="flex w-[60%] h-[500px] rounded-lg bg-[#FFFFFF] ">
        <div className=" w-[100%] md:w-[60%] p-8">
          <h1 className="text-[30px] text-2xl font-semibold mb-4 mt-3">
            Xin chào
          </h1>
          <p className="mb-4 text-md">Đăng ký tài khoản mới</p>

          <InputForm
            handleOnChange={handleOnchangeEmail}
            value={email}
            placeholder="nhập tài khoản"
          ></InputForm>
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
            placeholder="nhập password"
            type={isShowPassword ? "text" : "password"}
          ></InputForm>
          <div className="relative">
            <span
              className="z-10 absolute top-5 right-2"
              onClick={() => {
                setIsShowConfirmPassword(!isShowConfirmPassword);
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          <InputForm
            handleOnChange={handleOnchangeConfirmPassword}
            value={confirmPassword}
            placeholder="nhập lại password"
            type={isShowConfirmPassword ? "text" : "password"}
          />
          {data?.status == "ERR" && <span>{data?.errMessage}</span>}

          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              className="text-2xl h-[48px] w-[220px]"
              size={50}
              styleButton={{
                color: "#fff",
                background: "rgb(255, 57, 69)",
                border: "none",
                height: "48px",
                width: "100%",
                borderRadius: "4px",
              }}
              textButton="Đăng ký"
              onClick={handleOnclickSignUp}
            />
          </Loading>
          <div className="mt-5">
            Đã có tài khoản?
            <span
              className="text-blue-400 cursor-pointer"
              onClick={handleNavigate}
            >
              Đăng nhập ngay
            </span>
          </div>
        </div>

        <div className="bg-[#E0F0FF] flex-1  hidden md:block ">
          <div className="flex items-center justify-center flex-col py-28">
            <Image preview={false} width="203px" height="203px" src={imLogo} />

            <div className=" text-md text-center mt-3 text-blue-700 ">
              <div className="font-medium mb-1">Mua sắm ngay</div>
              <div>Siêu ưu đãi mỗi ngày</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
