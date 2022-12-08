import "./Spinner.style.scss";

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  message?: string;
};

const Spinner = ({ isLoading, isError, isSuccess, message }: Props) => {
  let status = "";
  if (isLoading) {
    status = "loading";
    return (
      <div id="spinner-container" className={status}>
        <span>adding {message?.trim().toLocaleLowerCase()}</span>
        <div id="spinner"></div>
      </div>
    );
  }
  if (isError) {
    status = "error";
    return (
      <div id="spinner-container" className={status}>
        <span>failed</span>
        <div id="spinner"></div>
      </div>
    );
  }
  if (isSuccess) {
    status = "success";
    return (
      <div id="spinner-container" className={status}>
        <span>successful</span>
        <div id="spinner"></div>
      </div>
    );
  }

  return <></>;
};

export default Spinner;
