import { useEffect, useRef } from "react";
import { UseMutationResult } from "react-query";
import "./Spinner.style.scss";

type Props = {
  mutation: UseMutationResult<any, unknown, any, unknown> | null;
  loadingMessage: string;
  successMessage: string;
  failMessage: string;
};

const Spinner = ({
  mutation,
  loadingMessage,
  successMessage,
  failMessage,
}: Props) => {
  const createdrRef = useRef<number | null>(null);

  useEffect(() => {
    return () => window.clearTimeout(createdrRef.current || 0);
  }, []);

  if (!mutation) {
    return <></>;
  }
  let status = "";
  if (mutation.isLoading) {
    status = "loading";
    return (
      <div id="spinner-container" className={status}>
        <span>{loadingMessage?.trim().toLocaleLowerCase()}</span>
        <div id="spinner"></div>
      </div>
    );
  }
  if (mutation.isError) {
    status = "error";
    createdrRef.current = window.setTimeout(() => {
      mutation?.reset();
    }, 3000);
    return (
      <div id="spinner-container" className={status}>
        <span>{failMessage}</span>
        <div id="spinner"></div>
      </div>
    );
  }
  if (mutation.isSuccess) {
    status = "success";
    createdrRef.current = window.setTimeout(() => {
      mutation?.reset();
    }, 3000);
    return (
      <div id="spinner-container" className={status}>
        <span>{successMessage}</span>
        <div id="spinner"></div>
      </div>
    );
  }

  return <></>;
};

export default Spinner;
