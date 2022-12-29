import { useState } from "react";
import { UseMutationResult } from "react-query";
import { FetchBudgets, FetchCategories } from "../../../../Queries";
import "./ModalOutflowForm.style.scss";
import { BudgetType, BudgetItemType, CategoryType } from "../../../../TypeDefs";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const ModalOutflowForm = ({ setShowMainModal, mutation }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [budget, setBudget] = useState<BudgetType | null>(null);
  const [budgetItems, setBudgetItems] = useState<BudgetItemType[] | null>(null);
  const [item, setItem] = useState<BudgetItemType | null>(
    budgetItems ? budgetItems[0] : null
  );
  const [description, setDescription] = useState<string>("");
  const [showBudgetOptions, setShowBudgetOptions] = useState<boolean>(false);
  const [showBudgetItemsOptions, setShowBudgetItemsOptions] =
    useState<boolean>(false);
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const userId = "636ac4a250bbc5afa6004a8c";

  const { data: categoryData } = FetchCategories(userId);
  const { data: budgetData } = FetchBudgets(userId);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutation.mutate({
      userId,
      title,
      amount,
      budget: budget?._id,
      item: item?._id,
      category: category?._id,
      description,
    });
    setShowMainModal(false);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setAmount(Number(e.target.value));
  };

  const onBudgetChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    budget: BudgetType | null
  ) => {
    setBudget(budget);
    setBudgetItems(budget?.items || null);
    setItem(budget ? budget.items[0] : null);
    setShowBudgetOptions(!showBudgetOptions);
  };

  const onBudgetItemChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: BudgetItemType | null
  ) => {
    setItem(item ? item : null);
    setShowBudgetItemsOptions(!showBudgetItemsOptions);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category: CategoryType | null
  ) => {
    setCategory(category ? category : null);
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
            <label htmlFor="amount">amount</label>
            <input
              type="text"
              onChange={(e) => onAmountChange(e)}
              value={amount}
            />
          </div>

          {/* budgets  */}
          <div className="budget">
            <label htmlFor="budget-options-container">Budget</label>
            <div
              className="budget-selected"
              onClick={() => setShowBudgetOptions(!showBudgetOptions)}
            >
              {budget ? budget.title : "Unbudgeted"}
            </div>
            <div
              className={`budget-options-container show-${showBudgetOptions}`}
            >
              <div
                className="budget-options"
                onClick={(e) => onBudgetChange(e, null)}
              >
                {budget ? "Unbudgeted" : null}
              </div>

              {budgetData.map((ele: BudgetType) => {
                if (ele.completed === false && ele._id !== budget?._id)
                  return (
                    <div
                      className="budget-options"
                      onClick={(e) => onBudgetChange(e, ele)}
                      key={ele._id}
                    >
                      {ele.title}
                    </div>
                  );
                return null;
              })}
            </div>
            {budget ? (
              <div className="limit">
                <div>limit</div>
                <div>{budget.balance}</div>
              </div>
            ) : null}
          </div>

          {/* budget items  */}
          {budget ? (
            <div className="budget-item">
              <label htmlFor="budget-item-options-container">Items</label>
              <div
                className="budget-item-selected"
                onClick={() =>
                  setShowBudgetItemsOptions(!showBudgetItemsOptions)
                }
              >
                {item ? item.title : null}
              </div>
              <div
                className={`budget-item-options-container show-${showBudgetItemsOptions}`}
              >
                {budgetItems?.map((ele: BudgetItemType) => {
                  if (ele._id !== item?._id)
                    return (
                      <div
                        className="budget-item-options"
                        onClick={(e) => onBudgetItemChange(e, ele)}
                        key={ele._id}
                      >
                        {ele.title}
                      </div>
                    );
                  return null;
                })}
              </div>
              {item ? (
                <div className="limit">
                  <div>limit</div>
                  <div>{item.balance}</div>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* category  */}
          {budget ? null : (
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

                {categoryData.map((ele: CategoryType) => {
                  if (
                    ele.categoryType === "outflow" &&
                    ele._id !== category?._id
                  )
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
          )}

          {/* description  */}
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
          Add Outflow
        </button>
      </form>
    </div>
  );
};

export default ModalOutflowForm;
