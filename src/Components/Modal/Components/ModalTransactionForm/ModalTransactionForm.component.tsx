import { useState } from "react";
import "./ModalTransactionForm.style.scss";

type Props = {};

const ModalTransactionForm = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [category, setCategory] = useState<string>("Option 1");
  const [description, setDescription] = useState<string>("");
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(e.target);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setCategory(e.currentTarget.innerText.trim());
    setShowCategoryOptions(!showCategoryOptions);
  };

  return (
    <div id="modal-transaction-form">
      <form>
        <h2>Transaction</h2>
        <div className="form-body">
          <div className="title">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="amount">
            <label htmlFor="amount">amount</label>
            <input
              type="text"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
          <div className="category">
            <label htmlFor="category-options-container">Category</label>
            <div
              className="category-selected"
              onClick={() => setShowCategoryOptions(!showCategoryOptions)}
            >
              {category}
            </div>
            <div
              className={`category-options-container show-${showCategoryOptions}`}
            >
              <div
                className="category-options"
                onClick={(e) => onCategoryChange(e)}
              >
                Option 1
              </div>
              <div
                className="category-options"
                onClick={(e) => onCategoryChange(e)}
              >
                Option 2
              </div>
              <div
                className="category-options"
                onClick={(e) => onCategoryChange(e)}
              >
                Option 3
              </div>
            </div>
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description-text-area"
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
        </div>
        <button type="submit" onClick={(e) => onSubmit(e)}>
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default ModalTransactionForm;
