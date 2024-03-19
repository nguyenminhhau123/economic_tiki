import React, { Children, useState } from "react";
import { Drawer } from "antd";

const DrawerComponent = ({
  title = "Drawer",
  placement = "right",
  isOpen = false,
  children,
  productId,
  ...rests
}) => {
  return (
    <>
      <Drawer title={title} open={isOpen} {...rests}>
        {children}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
