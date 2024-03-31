import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index";
import axios from "axios";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { Fragment, useEffect } from "react";
import { isJsonString } from "../src/utils/utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { updateUser } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { user } from "./redux/useSelector/userSelector";

export default function App() {
  const isAdmin = useSelector(user);
  const dispatch = useDispatch();
  useEffect(() => {
    const { decode, storageData } = handleDecoded();
    if (decode?.id && storageData) {
      handleGetDetailsUser(decode?.id, storageData);
    }
  }, []);

  // interceptors sẽ chạy trước tk useEffect để get details
  // khi mà acc_token hết hạn nó sẽ tạo lại cái acc_token mới và bỏ vào get_detail
  const handleDecoded = () => {
    // Lấy access_token đã hết hạn từ localStorage
    let storageData = localStorage.getItem("access_token");
    // Kiểm tra xem storageData có tồn tại và có phải là dạng {}
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
    }

    return { decode, storageData };
  };

  //  Add a request interceptor
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decode } = handleDecoded();
      const currentTime = new Date();
      const data = await UserService.refresh_token();

      if (decode?.exp < currentTime.getTime() / 1000) {
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);

    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const isCheckAuth = !route.isPrivate || isAdmin.isAdmin;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;

            // Kiểm tra điều kiện path hợp lệ trước khi trả về Route
            if (isCheckAuth && typeof route.path === "string") {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            } else {
              return null; // Không trả về Route nếu path không hợp lệ
            }
          })}
        </Routes>
      </Router>
    </div>
  );
}
