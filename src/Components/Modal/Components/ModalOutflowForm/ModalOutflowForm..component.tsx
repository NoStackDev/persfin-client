import { useState } from "react";
import "./ModalOutflowForm.style.scss";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalOutflowForm = ({ setShowMainModal }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [category, setCategory] = useState<string>("Option 1");
  const [budget, setBudget] = useState<string>("unbudgeted");
  const [budgetItem, setBudgetItem] = useState<string>("Option 1");
  const [description, setDescription] = useState<string>("");
  const [showBudgetOptions, setShowBudgetOptions] = useState<boolean>(false);
  const [showBudgetItemsOptions, setShowBudgetItemsOptions] =
    useState<boolean>(false);
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowMainModal(false);
  };

  const onBudgetChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setBudgetItem(e.currentTarget.innerText.trim());
    setShowBudgetOptions(!showBudgetOptions);
  };

  const onBudgetItemChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setBudgetItem(e.currentTarget.innerText.trim());
    setShowBudgetItemsOptions(!showBudgetItemsOptions);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setCategory(e.currentTarget.innerText.trim());
    setShowCategoryOptions(!showCategoryOptions);
  };

  return (
    <div id="modal-outflow-form">
      <form>
        <h2>Outflow</h2>
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
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
          <div className="budget">
            <label htmlFor="budget-options-container">Budget</label>
            <div
              className="budget-selected"
              onClick={() => setShowBudgetOptions(!showBudgetOptions)}
            >
              {budget}
            </div>
            <div
              className={`budget-options-container show-${showBudgetOptions}`}
            >
              <div
                className="budget-options"
                onClick={(e) => onBudgetChange(e)}
              >
                unbudgeted
              </div>
              <div
                className="budget-options"
                onClick={(e) => onBudgetChange(e)}
              >
                Option 2
              </div>
              <div
                className="budget-options"
                onClick={(e) => onBudgetChange(e)}
              >
                Option 3
              </div>
            </div>
          </div>
          <div className="budget-item">
            <label htmlFor="budget-item-options-container">Budget Item</label>
            <div
              className="budget-item-selected"
              onClick={() => setShowBudgetItemsOptions(!showBudgetItemsOptions)}
            >
              {budgetItem}
            </div>
            <div
              className={`budget-item-options-container show-${showBudgetItemsOptions}`}
            >
              <div
                className="budget-item-options"
                onClick={(e) => onBudgetItemChange(e)}
              >
                unbudgeted
              </div>
              <div
                className="budget-item-options"
                onClick={(e) => onBudgetItemChange(e)}
              >
                Option 2
              </div>
              <div
                className="budget-item-options"
                onClick={(e) => onBudgetItemChange(e)}
              >
                Option 3
              </div>
            </div>
            <div className="limit">
              <div>limit</div>
              <div>12000</div>
            </div>
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

export default ModalOutflowForm;
