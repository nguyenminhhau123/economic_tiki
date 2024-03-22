import * as UserService from "../services/UserService.js";

export const createUserController = async (req, res) => {
  try {
    const data = await req.body;
    console.log("data", req.body);
    const { email, password, confirmPassword } = data;
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        errMessage: "the input is required",
      });
    } else if (!isCheckEmail) {
      res.status(200).json({
        status: "ERR",
        errMessage: "the email is in wrong format!",
      });
    } else if (password !== confirmPassword) {
      res.status(200).json({
        status: "ERR",
        errMessage: "The password is equal confirmpassword",
      });
    } else {
      const response = await UserService.createUser(data);
      res.status(200).json(response);
    }
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const signInUserController = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        errMessage: "the input is required",
      });
    } else if (!isCheckEmail) {
      res.status(200).json({
        status: "ERR",
        errMessage: "the email is in wrong format!",
      });
    } else {
      const response = await UserService.signInUser(data);
      // console.log("sign in data: ", response);
      const { refresh_token, ...newResPonse } = response;
      // lưu refresh_token vào cookie
      res.cookie("refresh_token", refresh_token, { httpOnly: true });

      // console.log(req.cookie("refresh_token"));
      // res.cookie("as", "123");
      res.status(200).json(newResPonse);
    }
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const updateUserController = async (req, res) => {
  try {
    const idUser = req.params.id;
    // console.log("idUser", idUser);
    const data = req.body;
    if (!idUser) {
      res.status(200).json({
        status: "ERR",
        errMessage: "The User is required",
      });
    }
    const response = await UserService.updateUser(idUser, data);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const deleteUserController = async (req, res) => {
  try {
    const idUser = req.params.id;
    if (!idUser) {
      res.status(200).json({
        status: "ERR",
        errMessage: "The User is required",
      });
    } else {
      const response = await UserService.deleteUser(idUser);
      res.status(200).json(response);
    }
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const deleteManyUserController = async (req, res) => {
  const data = res.body;
  try {
    const response = await UserService.deleteMany(data);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const getAllUserController = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const getDetailUserController = async (req, res) => {
  try {
    const idUser = req.params.id;
    if (!idUser) {
      res.status(200).json({
        status: "ERR",
        errMessage: "The User is required",
      });
    } else {
      const response = await UserService.getDetailUser(idUser);
      res.status(200).json(response);
    }
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const refreshToken = async (req, res) => {
  // console.log("req cookiesewe:", req.cookies.refresh_token);
  try {
    // const token = req.headers.token.split(" ")[1];
    const token = req.cookies.refresh_token;
    console.log("token cookie:", token);
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        errMessage: "The token is required",
      });
    }
    const response = await UserService.refreshTokenService(token);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
export const logout = async (req, res) => {
  try {
    const cookie = res.clearCookie("refresh_token");
    const response = await UserService.logoutUserService(cookie);
    res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      errMessage: err,
    });
  }
};
