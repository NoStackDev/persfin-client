import { useState } from "react";
import { UseMutateFunction } from "react-query";
import "./ModalSavingsForm.style.scss";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: UseMutateFunction<any, unknown, any, unknown>;
};

const ModalSavingsForm = ({ setShowMainModal, mutate }: Props) => {
  const [amount, setAmount] = useState<number>(0);

  const userId = "636ac4a250bbc5afa6004a8c";

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ userId, amount });
    setShowMainModal(false);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setAmount(Number(e.target.value));
  };

  return (
    <div id="modal-savings-form">
      <form>
        <h2>Savings</h2>
        <div className="form-body">
          <div className="title">
            <label htmlFor="title">Amount</label>
            <input
              type="text"
              onChange={(e) => onAmountChange(e)}
              value={amount}
            />
          </div>
        </div>
        <button type="submit" onClick={(e) => onSubmit(e)}>
          Add Savings
        </button>
      </form>
    </div>
  );
};

export default ModalSavingsForm;
