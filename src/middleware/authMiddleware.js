import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = (req, res, next) => {
  // console.log("req header1", req.headers.token);
  const token = req.headers.token.split(" ")[1];
  // console.log("token2", token);
  // verify a token symmetric
  // if
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        errMassage: "The  authemtication",
        status: "ERR",
      });
    }
    // console.log("user::::", user);
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        errMassage: "The authemtication",
        status: "ERR",
      });
    }
  });
};
export const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  console.log("tokenauth", token);
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        errMassage: "The authemtication",
        status: "ERR",
      });
    }
    // console.log("user 3", user);
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        errMessage: "The authemtication",
        status: "ERR",
      });
    }
  });
};
