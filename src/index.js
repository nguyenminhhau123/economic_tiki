import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
// cấu hình các midware
const app = express();
dotenv.config();
const URL = process.env.MONGO_DB;
const PORT = process.env.PORT || 5050;
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors({ credentials: true, origin: " http://localhost:5173" }));
// app.use("/user", router);
routes(app);
mongoose
  .connect(URL)
  .then(() => {
    console.log("connect to DB");
    app.listen(PORT, () => {
      console.log(`Server is running at port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "lỗi kết nối server");
  });
