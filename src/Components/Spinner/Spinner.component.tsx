import { useEffect, useRef } from "react";
import { UseMutationResult } from "react-query";
import "./Spinner.style.scss";

type Props = {
  mutation: UseMutationResult<any, unknown, any, unknown> | null;
  message?: string;
};

const Spinner = ({ mutation, message }: Props) => {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current || 0);
  }, []);

  if (!mutation) {
    return <></>;
  }
  let status = "";
  if (mutation.isLoading) {
    status = "loading";
    return (
      <div id="spinner-container" className={status}>
        <span>{message?.trim().toLocaleLowerCase()}</span>
        <div id="spinner"></div>
      </div>
    );
  }
  if (mutation.isError) {
    status = "error";
    timerRef.current = window.setTimeout(() => {
      mutation?.reset();
    }, 5000);
    return (
      <div id="spinner-container" className={status}>
        <span>failed</span>
        <div id="spinner"></div>
      </div>
    );
  }
  if (mutation.isSuccess) {
    status = "success";
    timerRef.current = window.setTimeout(() => {
      mutation?.reset();
    }, 5000);
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
