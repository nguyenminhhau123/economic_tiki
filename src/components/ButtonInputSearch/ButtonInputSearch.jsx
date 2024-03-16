import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
export default function ButtonInputSearch(props) {
  const { placeholder, textButton } = props;
  return (
    <div className=" justify-center flex">
      <InputComponent placeholder={placeholder} />
      <ButtonComponent textButton={textButton} icon={<SearchOutlined />} />
    </div>
  );
}
