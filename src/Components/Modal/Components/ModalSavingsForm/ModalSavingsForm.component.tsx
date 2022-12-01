import { useState } from "react";
import "./ModalSavingsForm.style.scss";

type Props = {};

const ModalSavingsForm = (props: Props) => {
  const [amount, setAmount] = useState<number>(0);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(amount);
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
              onChange={(e) => setAmount(Number(e.target.value))}
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
