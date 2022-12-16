import { useState } from "react";
import { FetchCategories } from "../../../../../Queries";
import "./ModalBudgetItemForm.style.scss";

type Props = {
  setShowBudgetItemModal: React.Dispatch<React.SetStateAction<boolean>>;
};

interface BudgetItems {
  _id: string;
  title: string;
  amount: number;
  balance: number;
  category: string;
}

interface CategoryInterface {
  _id: string;
  title: string;
  categoryType: string;
}

const ModalBudgetItemForm = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [category, setCategory] = useState<CategoryInterface | null>(null);
  const [description, setDescription] = useState<string>("");
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const userId = "636ac4a250bbc5afa6004a8c";

  const { data: categoryData } = FetchCategories(userId);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.setShowBudgetItemModal(false);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category: CategoryInterface | null
  ) => {
    setCategory(category ? category : null);
    setShowCategoryOptions(!showCategoryOptions);
  };

  return (
    <div id="modal-budget-item-form">
      <form>
        <h2>Budget Item</h2>
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
              {category ? category.title : "Others"}
            </div>
            <div
              className={`category-options-container show-${showCategoryOptions}`}
            >
              <div
                className="category-options"
                onClick={(e) => onCategoryChange(e, null)}
              >
                {category ? "Others" : null}
              </div>

              {categoryData.map((ele: CategoryInterface) => {
                if (ele.categoryType === "outflow" && ele._id !== category?._id)
                  return (
                    <div
                      className="category-options"
                      onClick={(e) => onCategoryChange(e, ele)}
                      key={ele._id}
                    >
                      {ele.title}
                    </div>
                  );
                return null;
              })}
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

export default ModalBudgetItemForm;
