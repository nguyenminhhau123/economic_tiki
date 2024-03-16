import React from "react";
import { Checkbox, Col, Row, Rate } from "antd";
export default function NavbarComponent() {
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((item) => {
          return <div>{item}</div>;
        });
      case "checkBox":
        return (
          <Checkbox.Group className="w-full flex gap-[8px] flex-col">
            {options.map((item) => {
              return <Checkbox value={item.value}>{item.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((item) => {
          return (
            <>
              <div className="flex gap-1 f-full">
                <Rate className="" disabled defaultValue={item} />
                <span className="">{`từ ${item} sao`}</span>
              </div>
            </>
          );
        });
      case "price":
        return options.map((item) => {
          return (
            <>
              <div className="mt-2 p-1 w-fit flex gap-3 border rounded-lg bg-slate-200">
                {item}
              </div>
            </>
          );
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <div className="text-xl font-normal">thông tin sản phẩm</div>
      <div>{renderContent("text", ["TV", "MÁY GIẶT", "TỦ LẠNH"])}</div>
      <div>
        {renderContent("checkBox", [
          { value: "a", label: "a" },
          { value: "b", label: "b" },
        ])}
      </div>
      <div>{renderContent("star", [3, 4, 5])}</div>
      <div>{renderContent("price", ["dưới 500.000", "trên 500.000"])}</div>
    </div>
  );
}
