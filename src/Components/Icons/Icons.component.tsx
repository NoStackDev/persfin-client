import "./Icons.style.scss";

type Props = {
  icon: string;
  maxWidth?: string;
  showOptions?: boolean;
};

const Icons = ({ icon, maxWidth, showOptions }: Props) => {
  return (
    <span
      className={`material-icons ${showOptions ? "open" : null}`}
      style={{ maxWidth: maxWidth ? maxWidth : "30px", overflow: "hidden" }}
    >
      {icon}
    </span>
  );
};

export default Icons;
