import { useNavigate } from "react-router-dom";
export default function TypeProduct({ name }) {
  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "-")}`,
      { state: type }
    );
  };
  return (
    <div
      className="w-fit flex cursor-pointer"
      onClick={() => {
        handleNavigateType(name);
      }}
    >
      {name}
    </div>
  );
}
