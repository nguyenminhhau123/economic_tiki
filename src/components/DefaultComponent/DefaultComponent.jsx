import HeaderComponent from "../HeaderComponent/HeaderComPonent";

export default function DefaultComponent({ children }) {
  return (
    <div>
      <HeaderComponent />
      {children}
    </div>
  );
}
