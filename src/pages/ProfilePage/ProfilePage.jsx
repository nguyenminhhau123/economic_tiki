import React, { Children, useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useSelector } from "react-redux";
import { user } from "../../redux/useSelector/userSelector";
import * as UserService from "../../services/UserService";
import Loading from "../../components/LoadingComponent/Loading";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getBase64 } from "../../utils/utils";
import { useMutation } from "@tanstack/react-query";
export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = useSelector(user);
  const [email, setEmail] = useState(dataUser?.email);
  const [name, setName] = useState(dataUser?.name);
  const [phone, setPhone] = useState(dataUser?.phone);
  const [address, setAddress] = useState(dataUser?.address);
  const [avatar, setAvatar] = useState(dataUser?.avatar);
  const mutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token, ...rests } = data;
      return UserService.updateUser(id, rests, access_token);
    },
  });
  const { isPending, isSuccess } = mutation;
  useEffect(() => {
    if (isSuccess) {
      handleGetDetailsUser(dataUser?.id, dataUser?.access_token);
      navigate("/");
      toast.success(" update success!", {
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
    }
  }, [isSuccess]);
  useEffect(() => {
    setEmail(dataUser?.email);
    setName(dataUser?.name);
    setPhone(dataUser?.phone);
    setAddress(dataUser?.address);
    setAvatar(dataUser?.avatar);
  }, [dataUser]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };

  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file && !file.url && !file.preview) {
      const preview = await getBase64(file.originFileObj);
      setAvatar(preview);
    }
  };

  // update
  const handleUpdateUser = () => {
    mutation.mutate({
      id: dataUser?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: dataUser?.access_token,
    });
  };
  return (
    <div className="lg:px-[200px] mt-3">
      <div>
        <div className="text-center font-medium text-[24px] mb-2">
          Edit Your Profile
        </div>
        <Loading isLoading={isPending}>
          <div className="gap-y-3 ">
            <InputForm
              handleOnChange={handleOnChangeEmail}
              value={email}
              placeholder="Your Email"
              suffix={<MailOutlined />}
            />
            <InputForm
              handleOnChange={handleOnChangeName}
              value={name}
              placeholder="Your Name"
              suffix={<UserOutlined />}
            />
            <InputForm
              handleOnChange={handleOnChangePhone}
              value={phone}
              placeholder="Phone"
              suffix={<PhoneOutlined />}
            />
            <InputForm
              handleOnChange={handleOnChangeAddress}
              value={address}
              placeholder="Address"
              suffix={<HomeOutlined />}
            />
          </div>
        </Loading>
        <div>
          <Upload onChange={handleOnChangeAvatar} maxCount={1}>
            <Button className="" icon={<UploadOutlined />}>
              Upload Avatar
            </Button>
          </Upload>

          <div className="gap-y-3 flex justify-center items-center">
            {avatar && (
              <img
                src={avatar}
                className=" w-[60px] h-[60px] rounded-full object-cover "
              />
            )}
          </div>
        </div>
        <div className=" rounded-md">
          <ButtonComponent
            onClick={handleUpdateUser}
            textButton="Update"
            styleButton={{
              marginTop: "5px",
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
