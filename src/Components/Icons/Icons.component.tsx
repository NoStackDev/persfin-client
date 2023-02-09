import "./Icons.style.scss";

type Props = {
  icon: string;
  maxWidth?: string;
};

const Icons = ({ icon, maxWidth }: Props) => {
  return (
    <span
      className="material-icons"
      style={{ maxWidth: maxWidth ? maxWidth : "30px", overflow: "hidden" }}
    >
      {icon}
    </span>
  );
};

export default Icons;
