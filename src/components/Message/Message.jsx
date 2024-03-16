import React from "react";
import { Button, message, Space } from "antd";

export const success = (mes = "Success") => {
  message.success(mes);
};

export const error = (mes = "error") => {
  message.error(mes);
};
export const warning = (mes = "warning") => {
  message.success(mes);
};
