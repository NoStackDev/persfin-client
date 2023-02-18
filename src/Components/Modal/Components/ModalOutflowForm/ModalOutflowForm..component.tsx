import { useRef, useState } from "react";
import { UseMutationResult } from "react-query";
import {
  useBudgetsQuery,
  useOutflowCategoriesQuery,
} from "../../../../Queries";
import "./ModalOutflowForm.style.scss";
import { BudgetType, BudgetItemType, CategoryType } from "../../../../TypeDefs";
import { Record } from "pocketbase";
import {
  CreateOutflowCategory,
  CreateSavings,
  UpdateBudget,
} from "../../../../Mutations";
import { useOnClickOutside } from "../../../../Hooks";
import Spinner from "../../../Spinner";
import { ModalCreateCategoryForm } from "../ModalCategoryForm";
import ModalContainer from "../ModalContainer";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const ModalOutflowForm = ({ setShowModal, mutation }: Props) => {
  const [inputStates, setInputStates] = useState<{
    title: string;
    amount: number;
    category: CategoryType | Record | null;
    budget: BudgetType | Record | null;
    budgetItems: BudgetItemType[] | null;
    item: BudgetItemType | null;
    description: string;
  }>({
    title: "",
    amount: 0,
    category: null,
    budget: null,
    budgetItems: null,
    item: null,
    description: "",
  });

  const [takeFromSavings, setTakeFromSavings] = useState(false);
  const [showBudgetOptions, setShowBudgetOptions] = useState(false);
  const [showBudgetItemsOptions, setShowBudgetItemsOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    title: string | null;
    amount: string | null;
  }>({ title: null, amount: null });

  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const modalOutflowFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalOutflowFormRef, setShowModal);
  const budgetRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(budgetRef, setShowBudgetOptions);
  const budgetItemsRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(budgetItemsRef, setShowBudgetItemsOptions);
  const categoryRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(categoryRef, setShowCategoryOptions);

  // queries
  const { data: categoryData } = useOutflowCategoriesQuery();
  const { data: budgetData } = useBudgetsQuery();

  // mutations
  const budgetMutation = UpdateBudget();
  const savingsMutation = CreateSavings();
  const createCategoryMutation = CreateOutflowCategory();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (inputStates.title.length < 1 || inputStates.amount <= 0) {
      setFormErrors({
        title: inputStates.title.length < 0 ? "required" : null,
        amount: inputStates.amount <= 0 ? "must be greater than 0" : null,
      });
      return;
    }

    if (takeFromSavings) {
      savingsMutation
        .mutateAsync({
          amount: -inputStates.amount,
        })
        .catch((err) => {
          throw new Error("deduction from savings failed");
        });
    }

    if (inputStates.budget && inputStates.item) {
      const updatedBudgetItems = inputStates.budget.items.map(
        (obj: BudgetItemType) => {
          if (obj.id !== inputStates.item?.id) return obj;
          obj.balance = obj.balance - inputStates.amount;
          return obj;
        }
      );
      budgetMutation
        .mutateAsync({
          budgetId: inputStates.budget.id,
          title: inputStates.budget.title.trim(),
          total: inputStates.budget.total,
          balance: inputStates.budget.balance - inputStates.amount,
          description: inputStates.budget.description.trim(),
          items: updatedBudgetItems,
        })
        .then(() =>
          mutation.mutate({
            title: inputStates.title.trim(),
            amount: inputStates.amount,
            budget: inputStates.budget,
            item: inputStates.item,
            category: inputStates.category?.id || inputStates.item?.category,
            description: inputStates.description.trim(),
          })
        );
      setShowModal(false);
      return;
    }

    mutation.mutate({
      title: inputStates.title.trim(),
      amount: inputStates.amount,
      budget: inputStates.budget,
      item: inputStates.item,
      category: inputStates.category?.id || inputStates.item?.category,
      description: inputStates.description.trim(),
    });
    setShowModal(false);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }

    setInputStates({
      ...inputStates,
      amount: Math.min(
        takeFromSavings
          ? Number(localStorage.getItem("savings") || 0)
          : Number(localStorage.getItem("balance") || 0),
        Number(e.target.value),
        inputStates.item ? inputStates.item.balance : Infinity
      ),
    });
  };

  const onBudgetChange = (budget: BudgetType | Record | null) => {
    setInputStates({
      ...inputStates,
      budget: budget,
      budgetItems: budget?.items,
      item: budget?.items[0],
      amount: Math.min(
        takeFromSavings
          ? Number(localStorage.getItem("savings") || 0)
          : Number(localStorage.getItem("balance") || 0),
        inputStates.amount,
        budget ? budget.items[0].amount : Infinity
      ),
    });
    setShowBudgetOptions(!showBudgetOptions);
  };

  const onBudgetItemChange = (item: BudgetItemType | null) => {
    setInputStates({
      ...inputStates,
      item: item,
      amount: Math.min(
        takeFromSavings
          ? Number(localStorage.getItem("savings") || 0)
          : Number(localStorage.getItem("balance") || 0),
        inputStates.amount,
        item ? item.amount : Infinity
      ),
    });
    setShowBudgetItemsOptions(!showBudgetItemsOptions);
  };

  const onSavingsChange = (e: React.MouseEvent<HTMLDivElement>) => {
    (document.getElementById("take-from-savings") as HTMLInputElement).checked =
      takeFromSavings ? false : true;
    setTakeFromSavings(!takeFromSavings);
    setInputStates({
      ...inputStates,
      amount: Math.min(
        !takeFromSavings
          ? Number(localStorage.getItem("savings") || 0)
          : Number(localStorage.getItem("balance") || 0),
        inputStates.amount,
        inputStates.item ? inputStates.item.amount : Infinity
      ),
    });
  };

  const onCategoryChange = (category: CategoryType | Record | null) => {
    setInputStates({ ...inputStates, category: category });
    setShowCategoryOptions(!showCategoryOptions);
  };

  return (
    <>
      <ModalContainer>
        <div id="modal-outflow-form" ref={modalOutflowFormRef}>
          {showCreateCategoryModal ? null : (
            <>
              <h2>Outflow</h2>

              <form>
                <div className="form-body">
                  <div className="title">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setInputStates({
                          ...inputStates,
                          title: e.target.value,
                        })
                      }
                      value={inputStates.title}
                    />
                    <p className="validation-message">{formErrors.title}</p>
                  </div>

                  {/* take from saving */}
                  <div className="savings" onClick={(e) => onSavingsChange(e)}>
                    <input
                      type="checkbox"
                      name="take_from_savings"
                      id="take-from-savings"
                    />
                    <label htmlFor="">take from savings</label>
                  </div>

                  {/* amount */}
                  <div className="amount-container">
                    <div className="amount">
                      <label htmlFor="amount">amount</label>
                      <input
                        type="text"
                        onChange={(e) => onAmountChange(e)}
                        id="amount"
                        value={inputStates.amount}
                      />
                      <p className="validation-message">{formErrors.amount}</p>
                    </div>
                    {inputStates.item ? (
                      <div className="limit">
                        <div>item budget</div>
                        <div>
                          &#x20A6;
                          {inputStates.item
                            ? inputStates.item.balance.toLocaleString()
                            : null}
                        </div>
                      </div>
                    ) : null}
                    <div className="limit">
                      <div>
                        {takeFromSavings ? "savings" : "available balance"}
                      </div>
                      <div>
                        &#x20A6;
                        {takeFromSavings
                          ? Number(
                              localStorage.getItem("savings")
                            ).toLocaleString()
                          : Number(
                              localStorage.getItem("balance")
                            ).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* budgets  */}
                  <div className="budget">
                    <label htmlFor="budget-options-container">Budget</label>
                    <div
                      className="budget-selected"
                      onClick={() => setShowBudgetOptions(!showBudgetOptions)}
                      ref={budgetRef}
                    >
                      <div>
                        {inputStates.budget
                          ? inputStates.budget.title.trim()
                          : "Unbudgeted"}
                      </div>
                      <span
                        className={`material-icons ${
                          showBudgetOptions ? "open" : null
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                    <div
                      className={`budget-options-container show-${showBudgetOptions}`}
                      ref={budgetRef}
                    >
                      <div
                        className="budget-options inputdiv"
                        onClick={() => onBudgetChange(null)}
                      >
                        {inputStates.budget ? "Unbudgeted" : null}
                      </div>

                      {budgetData?.map((ele) => {
                        if (
                          ele.exhausted === false &&
                          ele.id !== inputStates.budget?.id
                        )
                          return (
                            <div
                              className="budget-options inputdiv"
                              onClick={() => onBudgetChange(ele)}
                              key={ele.id}
                            >
                              {ele.title.trim()}
                            </div>
                          );
                        return null;
                      })}
                    </div>
                    {inputStates.budget ? (
                      <div className="limit">
                        <div>available</div>
                        <div> &#x20A6; {inputStates.budget.balance}</div>
                      </div>
                    ) : null}
                  </div>

                  {/* budget items  */}
                  {inputStates.budget ? (
                    <div className="budget-item">
                      <label htmlFor="budget-item-options-container">
                        Items
                      </label>
                      <div
                        className="budget-item-selected"
                        onClick={() =>
                          setShowBudgetItemsOptions(!showBudgetItemsOptions)
                        }
                        ref={budgetItemsRef}
                      >
                        <div>
                          {inputStates.item
                            ? inputStates.item.title.trim()
                            : null}
                        </div>
                        <span
                          className={`material-icons ${
                            showBudgetItemsOptions ? "open" : null
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                      <div
                        className={`budget-item-options-container show-${showBudgetItemsOptions}`}
                        ref={budgetItemsRef}
                      >
                        {inputStates.budgetItems?.map((ele: BudgetItemType) => {
                          if (ele.id !== inputStates.item?.id)
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
                      {inputStates.item ? (
                        <div className="limit">
                          <div>available</div>
                          <div> &#x20A6; {inputStates.item.balance}</div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {/* category  */}
                  {inputStates.budget ? null : (
                    <div className="category">
                      <label htmlFor="category-options-container">
                        Category
                      </label>
                      <div
                        className="category-selected"
                        onClick={() =>
                          setShowCategoryOptions(!showCategoryOptions)
                        }
                        ref={categoryRef}
                      >
                        <div>
                          {inputStates.category
                            ? inputStates.category.title.trim()
                            : "Others"}
                        </div>
                        <span
                          className={`material-icons ${
                            showCategoryOptions ? "open" : null
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                      <div
                        className={`category-options-container show-${showCategoryOptions}`}
                        ref={categoryRef}
                      >
                        <div
                          className="category-options"
                          onClick={() => onCategoryChange(null)}
                        >
                          {inputStates.category ? "Others" : null}
                        </div>

                        {categoryData?.map((ele) => {
                          return ele.id !== inputStates.category?.id ? (
                            <div
                              className="category-options"
                              onClick={() => onCategoryChange(ele)}
                              key={ele.id}
                            >
                              {ele.title.trim()}
                            </div>
                          ) : null;
                        })}

                        <div
                          className="category-options add-category"
                          onClick={(e) => setShowCreateCategoryModal(true)}
                        >
                          add category
                        </div>
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
                      onChange={(e) =>
                        setInputStates({
                          ...inputStates,
                          description: e.target.value,
                        })
                      }
                      value={inputStates.description}
                    ></textarea>
                  </div>
                </div>
              </form>
              <button type="submit" onClick={(e) => onSubmit(e)}>
                Add Outflow
              </button>
            </>
          )}
          {showCreateCategoryModal ? (
            <ModalCreateCategoryForm
              mutation={createCategoryMutation}
              categoryType={"outflow"}
              setShowModal={setShowCreateCategoryModal}
            />
          ) : null}
        </div>
      </ModalContainer>

      <Spinner
        mutation={createCategoryMutation}
        loadingMessage={"adding category"}
        successMessage={"added category"}
        failMessage={"failed to add category"}
      />
    </>
  );
};

export default ModalOutflowForm;
