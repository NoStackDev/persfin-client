import { useEffect, useState } from "react";
import { FetchCategories } from "../../../../../Queries";
import "./ModalBudgetItemForm.style.scss";
import { BudgetItemType, CategoryType } from "../../../../../TypeDefs";

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
  const [amount, setAmount] = useState<string>(
    prefillItemData?.amount.toString() || "0"
  );
  const [category, setCategory] = useState<CategoryType | null | undefined>(
    null
  );
  const [description, setDescription] = useState<string>(
    prefillItemData?.description || ""
  );
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const userId = "636ac4a250bbc5afa6004a8c";

  const { data: categoryData } = FetchCategories(userId);

  useEffect(() => {
    if (prefillItemData && categoryData) {
      setCategory(
        (categoryData as CategoryType[]).find(
          (obj) => obj._id === prefillItemData.category
        )
      );
    }
  }, [categoryData, prefillItemData]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const tempCategoryId = category ? category._id : null;
    handleItemAddition({
      _id: prefillItemData?._id || Date.now().toString(),
      title,
      amount: Number(amount),
      balance: prefillItemData?.balance || Number(amount),
      category: tempCategoryId,
      description,
    });
    setShowBudgetItemModal(false);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category: CategoryType | null
  ) => {
    setCategory(category ? category : null);
    setShowCategoryOptions(!showCategoryOptions);
  };

  return (
    <div id="modal-budget-item-form">
      <form>
        <h2>Budget Item</h2>
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
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
          {/* category  */}
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
          {prefillItemData ? "Update" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default ModalBudgetItemForm;
