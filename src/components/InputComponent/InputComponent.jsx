import { Input } from "antd";
const InputComponent = ({ value, onChange, name }) => {
  const handleOnChange = (e) => {
    const event = {
      target: {
        value: e.target.value,
        name: name,
      },
    };
    onChange(event);
  };

  return (
    <Input
      className="bg-white rounded-none h-[50px]"
      value={value}
      name={name}
      onChange={handleOnChange}
    />
  );
};

export default InputComponent;
