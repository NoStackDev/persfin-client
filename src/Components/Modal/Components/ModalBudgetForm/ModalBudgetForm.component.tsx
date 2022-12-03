import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import ModalBudgetItemForm from "./Components/ModalBudgetItemForm.component";
import "./ModalBudgetForm.style.scss";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalBudgetForm = ({ setShowMainModal }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [total, setTotal] = useState<string>("0");
  const [description, setDescription] = useState<string>("");
  const [showBudgetItemModal, setShowBudgetItemModal] =
    useState<boolean>(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowMainModal(false);
  };

  return (
    <div id="modal-budget-form">
      <form>
        <h2>Budget</h2>
        <div className="form-body">
          <div className="title">
            <label htmlFor="title-input">Title</label>
            <input
              type="text"
              id="title-input"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="budget-items">
            <label htmlFor="">Item(s)</label>
            <div className="budget-items-container">
              <div className="item">
                <div className="item-title">Coke</div>
                <div className="amount">2000</div>
              </div>
              <div className="item">
                <div className="item-title">Coke</div>
                <div className="amount">2000</div>
              </div>
              <div
                className="add-item"
                onClick={() => setShowBudgetItemModal(!showBudgetItemModal)}
              >
                + add item
              </div>
            </div>
          </div>
          {/* <div className="category">
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
          </div> */}
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
          Add Budget
        </button>
      </form>
      {showBudgetItemModal ? (
        <div className="budget-item-modal">
          <ModalContainer />
          <ModalBudgetItemForm
            setShowBudgetItemModal={setShowBudgetItemModal}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ModalBudgetForm;
