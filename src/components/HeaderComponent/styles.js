import { Row } from "antd";
import styled from "styled-components";
export const WrapperHeader = styled(Row)`
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgb(26, 148, 255);
  align-items: center;

  flex-wrap: nowrap;
`;
export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  align: center;
`;
export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 12px;
`;
