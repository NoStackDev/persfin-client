import { useRef, useState } from "react";
import { UseMutationResult } from "react-query";
import { useOnClickOutside } from "../../../../Hooks";
import "./ModalSavingsForm.style.scss";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const ModalSavingsForm = ({ setShowMainModal, mutation }: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const modalSavingsFormRef = useRef<HTMLDivElement>(null);
  const [formErrors, setFormErrors] = useState<{
    amount: string | null;
  }>({ amount: null });

  useOnClickOutside(modalSavingsFormRef, setShowMainModal);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (amount <= 0) {
      setFormErrors({
        amount: amount <= 0 ? "must be greater than 0" : null,
      });
      return;
    }

    mutation.mutate({ amount });
    setShowMainModal(false);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }

    if (
      Number(e.target.value) >
      Number(localStorage.getItem("balance")?.split(",").join("") || "0")
    ) {
      setAmount(
        Number(localStorage.getItem("balance")?.split(",").join("") || "0")
      );
      return;
    }

    setAmount(Number(e.target.value));
  };

  return (
    <div id="modal-savings-form" ref={modalSavingsFormRef}>
      <h2>Savings</h2>

      <form>
        <div className="form-body">
          <div className="title">
            <label htmlFor="title">Amount</label>
            <input
              type="text"
              onChange={(e) => onAmountChange(e)}
              value={amount}
            />
          </div>
          <p className="validation-message">{formErrors.amount}</p>
          <div className="limit">
            <div>available</div>
            <div>&#x20A6; {localStorage.getItem("balance") || 0}</div>
          </div>
        </div>
      </form>
      <button type="submit" onClick={(e) => onSubmit(e)}>
        Add Savings
      </button>
    </div>
  );
};

export default ModalSavingsForm;
