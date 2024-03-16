import React from "react";
import { Button } from "antd";

export default function ButtonComponent(props) {
  const { size, textButton, styleButton, onClick, disabled } = props;

  return (
    <div>
      <Button
        style={{
          ...styleButton,
          background: disabled ? "#ccc" : "#0A68FF",
        }}
        disabled={disabled}
        className="text-white rounded-none h-[50px]"
        size={size}
        onClick={onClick}
      >
        {textButton}
      </Button>
    </div>
  );
}
