import React from "react";
import { Steps } from "antd";
function StepsComponent({ current = 0, items = [] }) {
  console.log("items", items);
  console.log(current);
  const { Step } = { Steps };
  return (
    <div>
      <Steps current={current}>
        {items.map((item) => {
          return (
            <Step
              key={item.title}
              title={item.title}
              description={item.description}
            ></Step>
          );
        })}
      </Steps>
    </div>
  );
}

export default StepsComponent;
