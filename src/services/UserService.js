import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { genneralAccessToken, genneralRefreshToken } from "./JwtService.js";
export const createUser = async (newUser) => {
  const { name, email, password, phone, isAdmin, city, address } = newUser;
  const hashPassword = bcrypt.hashSync(password, 10);

  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          errMessage: " the email is already",
        });
      }
      const createUser = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
        isAdmin,
        city,
        address,
      });
      if (createUser) {
        resolve({
          status: "ok",
          message: "create successful",
          data: createUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const signInUser = async (loginUser) => {
  const { name, email, password, confirmPassword, phone } = loginUser;
  // const hashPassword = bcrypt.hashSync(password, 10);
  // const comparePassword = bcrypt.compareSync(password, hashPassword);
  // console.log("comparePassword", comparePassword);

  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          errMessage: " the email is not define!",
        });
      }
      const checkComparePassword = await bcrypt.compareSync(
        password,
        checkUser.password
      );

      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      // console.log("refresh_token", refresh_token);
      // console.log("access_token", access_token);
      if (!checkComparePassword) {
        resolve({
          status: "ERR",
          errMessage: " the user or password incorrect!",
        });
      } else {
        resolve({
          status: "ok",
          message: "login successful!",
          // data: checkUser,
          access_token: access_token,
          refresh_token: refresh_token,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const updateUser = async (id, dataUser) => {
  // console.log("dataUser", dataUser);
  // const { name, email, password, confirmPassword, phone } = dataUser;
  // console.log("id", id);
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "ok",
          errMessage: "the user is not defined",
        });
      } else {
        const updateUser = await User.findByIdAndUpdate(id, dataUser, {
          new: true,
        });
        // console.log("updateUser", updateUser);
        resolve({
          status: "ok",
          message: "update user successful!",
          data: updateUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "ok",
          errMessage: "the user is not defined",
        });
      }

      await User.findByIdAndDelete(id);
      resolve({
        status: "ok",
        message: "delete user successful!",
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteManyUser = async (ids) => {
  console.log("ids", ids);
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids });
      resolve({
        status: "ok",
        massage: "delete is successful",
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await User.find();
      resolve({
        status: "ok",
        message: "get all user successful!",
        data: userData,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getDetailUser = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          errMessage: "the user is not defined",
        });
      }
      if (checkUser) {
        const user = await User.findById(id);
        resolve({
          status: "ok",
          message: "details user successful!",
          data: user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const refreshTokenService = async (token) => {
  // token ở đây là refresh_token ở dưới cookie
  console.log("token refresh", token);
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          console.log("err", err);
          resolve({
            status: "ERROR",
            errMessage: "the authemtication",
          });
        }
        // console.log("userToken23", user);
        const access_token = await genneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        resolve({
          status: "Ok",
          message: "SUCCESS freshToken",
          access_token: access_token,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const logoutUserService = async (cookie) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (cookie) {
        resolve({
          status: "Ok",
          message: "logout Successful",
        });
      }
    } catch (error) {
      reject("error", error);
    }
  });
};
