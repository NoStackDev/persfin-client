import { useRef, useState } from "react";
import { UseMutationResult } from "react-query";
import {
  useBudgetsQuery,
  useOutflowCategoriesQuery,
} from "../../../../Queries";
import "./ModalOutflowForm.style.scss";
import { BudgetType, BudgetItemType, CategoryType } from "../../../../TypeDefs";
import { Record } from "pocketbase";
import { CreateSavings, UpdateBudget } from "../../../../Mutations";
import { useOnClickOutside } from "../../../../Hooks";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const ModalOutflowForm = ({ setShowMainModal, mutation }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [takeFromSavings, setTakeFromSavings] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<CategoryType | Record | null>(null);
  const [budget, setBudget] = useState<BudgetType | Record | null>(null);
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
  const [formErrors, setFormErrors] = useState<{
    title: string | null;
    amount: string | null;
  }>({ title: null, amount: null });

  const modalOutflowFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalOutflowFormRef, setShowMainModal);

  const { data: categoryData } = useOutflowCategoriesQuery();
  const { data: budgetData } = useBudgetsQuery();

  const budgetMutation = UpdateBudget();
  const savingsMutation = CreateSavings();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (title.length < 1 || amount <= 0) {
      setFormErrors({
        title: title.length < 0 ? "required" : null,
        amount: amount <= 0 ? "must be greater than 0" : null,
      });
      return;
    }

    if (takeFromSavings) {
      savingsMutation
        .mutateAsync({
          amount: -amount,
        })
        .catch((err) => {
          throw new Error("deduction from savings failed");
        });
    }

    if (budget && item) {
      const updatedBudgetItems = budget.items.map((obj: BudgetItemType) => {
        if (obj.id !== item.id) return obj;
        obj.balance = obj.balance - amount;
        return obj;
      });
      budgetMutation
        .mutateAsync({
          budgetId: budget.id,
          title: budget.title.trim(),
          total: budget.total,
          balance: budget.balance - amount,
          description: budget.description.trim(),
          items: updatedBudgetItems,
        })
        .then(() =>
          mutation.mutate({
            title: title.trim(),
            amount,
            budget: budget,
            item: item,
            category: category?.id || item?.category,
            description: description.trim(),
          })
        );
      setShowMainModal(false);
      return;
    }

    mutation.mutate({
      title: title.trim(),
      amount,
      budget: budget,
      item: item,
      category: category?.id || item?.category,
      description: description.trim(),
    });
    setShowMainModal(false);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }

    setAmount(
      Math.min(
        takeFromSavings
          ? Number(localStorage.getItem("savings") || 0)
          : Number(localStorage.getItem("balance") || 0),
        Number(e.target.value),
        item ? item.balance : Infinity
      )
    );
  };

  const onBudgetChange = (budget: BudgetType | Record | null) => {
    setBudget(budget);
    setBudgetItems(budget?.items || null);
    setItem(budget ? budget.items[0] : null);
    setShowBudgetOptions(!showBudgetOptions);
    setAmount(
      Math.min(
        takeFromSavings
          ? Number(localStorage.getItem("savings") || 0)
          : Number(localStorage.getItem("balance") || 0),
        amount,
        budget ? budget.items[0].amount : Infinity
      )
    );
  };

  const onBudgetItemChange = (item: BudgetItemType | null) => {
    setItem(item ? item : null);
    setShowBudgetItemsOptions(!showBudgetItemsOptions);
    setAmount(
      Math.min(
        takeFromSavings
          ? Number(localStorage.getItem("savings") || 0)
          : Number(localStorage.getItem("balance") || 0),
        amount,
        item ? item.amount : Infinity
      )
    );
  };

  const onSavingsChange = () => {
    setTakeFromSavings(!takeFromSavings);
    setAmount(
      Math.min(
        !takeFromSavings
          ? Number(localStorage.getItem("savings") || 0)
          : Number(localStorage.getItem("balance") || 0),
        amount,
        item ? item.amount : Infinity
      )
    );
  };

  const onCategoryChange = (category: CategoryType | Record | null) => {
    setCategory(category);
    setShowCategoryOptions(!showCategoryOptions);
  };

  return (
    <div id="modal-outflow-form" ref={modalOutflowFormRef}>
      <h2>Outflow</h2>

      <form>
        <div className="form-body">
          <div className="title">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="validation-message">{formErrors.title}</p>
          </div>

          {/* take from saving */}
          <div className="savings">
            <div>
              <input
                type="checkbox"
                name="take_from_savings"
                id=""
                onChange={() => onSavingsChange()}
              />
              <label htmlFor="">take from savings</label>
            </div>
          </div>

          {/* amount */}
          <div className="amount-container">
            <div className="amount">
              <label htmlFor="amount">amount</label>
              <input
                type="text"
                onChange={(e) => onAmountChange(e)}
                id="amount"
                value={amount}
              />
              <p className="validation-message">{formErrors.amount}</p>
            </div>
            {item ? (
              <div className="limit">
                <div>item budget</div>
                <div>
                  &#x20A6;
                  {item ? item.balance.toLocaleString() : null}
                </div>
              </div>
            ) : null}
            <div className="limit">
              <div>{takeFromSavings ? "savings" : "balance"}</div>
              <div>
                &#x20A6;
                {takeFromSavings
                  ? Number(localStorage.getItem("savings")).toLocaleString()
                  : Number(localStorage.getItem("balance")).toLocaleString()}
              </div>
            </div>
          </div>

          {/* budgets  */}
          <div className="budget">
            <label htmlFor="budget-options-container">Budget</label>
            <div
              className="budget-selected"
              onClick={() => setShowBudgetOptions(!showBudgetOptions)}
            >
              {budget ? budget.title.trim() : "Unbudgeted"}
            </div>
            <div
              className={`budget-options-container show-${showBudgetOptions}`}
            >
              <div
                className="budget-options"
                onClick={() => onBudgetChange(null)}
              >
                {budget ? "Unbudgeted" : null}
              </div>

              {budgetData?.map((ele) => {
                if (ele.exhausted === false && ele.id !== budget?.id)
                  return (
                    <div
                      className="budget-options"
                      onClick={() => onBudgetChange(ele)}
                      key={ele.id}
                    >
                      {ele.title.trim()}
                    </div>
                  );
                return null;
              })}
            </div>
            {budget ? (
              <div className="limit">
                <div>available</div>
                <div> &#x20A6; {budget.balance}</div>
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
                {item ? item.title.trim() : null}
              </div>
              <div
                className={`budget-item-options-container show-${showBudgetItemsOptions}`}
              >
                {budgetItems?.map((ele: BudgetItemType) => {
                  if (ele.id !== item?.id)
                    return (
                      <div
                        className="budget-item-options"
                        onClick={() => onBudgetItemChange(ele)}
                        key={ele.id}
                      >
                        {ele.title}
                      </div>
                    );
                  return null;
                })}
              </div>
              {item ? (
                <div className="limit">
                  <div>available</div>
                  <div> &#x20A6; {item.balance}</div>
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
                {category ? category.title.trim() : "Others"}
              </div>
              <div
                className={`category-options-container show-${showCategoryOptions}`}
              >
                <div
                  className="category-options"
                  onClick={() => onCategoryChange(null)}
                >
                  {category ? "Others" : null}
                </div>

                {categoryData?.map((ele) => {
                  return (
                    <div
                      className="category-options"
                      onClick={() => onCategoryChange(ele)}
                      key={ele.id}
                    >
                      {ele.title.trim()}
                    </div>
                  );
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
      </form>
      <button type="submit" onClick={(e) => onSubmit(e)}>
        Add Outflow
      </button>
    </div>
  );
};

export default ModalOutflowForm;
