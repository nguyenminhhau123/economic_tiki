import { useState } from "react";
import { Input } from "antd";
import "./style.css";
export default function InputForm(props) {
  const { placeholder, type, handleOnChange, ...rests } = props;

  const handleOnChangeValue = (e) => {
    const value = e.target.value;
    handleOnChange(value);
  };
  return (
    <div className="mb-7">
      <Input
        {...rests}
        type={type}
        placeholder={placeholder}
        value={props.value}
        onChange={handleOnChangeValue}
        className="h-[50px] border-t-0 border-r-0 border-l-0  focus:bg-[#E0F0FF] "
      />
    </div>
  );
}
