import { useEffect, useRef, useState } from "react";
import { useOutflowCategoriesQuery } from "../../../../../Queries";
import "./ModalBudgetItemForm.style.scss";
import { BudgetItemType, CategoryType } from "../../../../../TypeDefs";
import { Record } from "pocketbase";
import { useOnClickOutside } from "../../../../../Hooks";

type Props = {
  setShowBudgetItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleItemAddition: (item: BudgetItemType) => void;
  prefillItemData: BudgetItemType | null;
};

const ModalBudgetItemForm = ({
  setShowBudgetItemModal,
  handleItemAddition,
  prefillItemData,
}: Props) => {
  const [title, setTitle] = useState<string>(prefillItemData?.title || "");
  const [amount, setAmount] = useState<number>(prefillItemData?.amount || 0);
  const [category, setCategory] = useState<CategoryType | Record | undefined>(
    undefined
  );
  const [description, setDescription] = useState<string>(
    prefillItemData?.description || ""
  );
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const modalBudgetItemFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalBudgetItemFormRef, setShowBudgetItemModal);

  const categoryOptionsRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(categoryOptionsRef, setShowCategoryOptions);

  const { data: categoryData } = useOutflowCategoriesQuery();

  useEffect(() => {
    if (prefillItemData && categoryData) {
      setCategory(categoryData.find((obj) => obj.id === prefillItemData.id));
    }
  }, [categoryData, prefillItemData]);

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setAmount(Number(e.target.value));
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const tempCategoryId = category ? category.id : null;
    handleItemAddition({
      id: prefillItemData?.id || Date.now().toString(),
      title,
      amount: Number(amount),
      balance: prefillItemData?.balance || Number(amount),
      category: tempCategoryId,
      description,
    });
    setShowBudgetItemModal(false);
  };

  const onCategoryChange = (category: CategoryType | Record | undefined) => {
    setCategory(category);
    setShowCategoryOptions(!showCategoryOptions);
  };

  return (
    <div id="modal-budget-item-form" ref={modalBudgetItemFormRef}>
      <h2>Budget Item</h2>

      <form>
        <div className="form-body">
          {/* title  */}
          <div className="title">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          {/* amount  */}
          <div className="amount">
            <label htmlFor="amount">amount</label>
            <input
              type="text"
              onChange={(e) => onAmountChange(e)}
              value={amount}
            />
          </div>
          {/* category  */}
          <div className="category" ref={categoryOptionsRef}>
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
                onClick={() => onCategoryChange(undefined)}
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
                    {ele.title}
                  </div>
                );
              })}
            </div>
          </div>
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
        {prefillItemData ? "Update" : "Add Item"}
      </button>
    </div>
  );
};

export default ModalBudgetItemForm;
