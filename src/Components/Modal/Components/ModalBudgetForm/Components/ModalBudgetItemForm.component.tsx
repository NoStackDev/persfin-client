import { useEffect, useRef, useState } from "react";
import { useOutflowCategoriesQuery } from "../../../../../Queries";
import "./ModalBudgetItemForm.style.scss";
import { BudgetItemType, CategoryType } from "../../../../../TypeDefs";
import { Record } from "pocketbase";
import { useOnClickOutside } from "../../../../../Hooks";
import Spinner from "../../../../Spinner";
import { ModalCreateCategoryForm } from "../../ModalCategoryForm";
import { CreateOutflowCategory } from "../../../../../Mutations";
import ModalContainer from "../../ModalContainer";

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
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const [formErrors, setFormErrors] = useState<{
    title: string | null;
    amount: string | null;
  }>({ title: null, amount: null });

  const modalBudgetItemFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalBudgetItemFormRef, setShowBudgetItemModal);

  const categoryOptionsRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(categoryOptionsRef, setShowCategoryOptions);

  // queries
  const { data: categoryData } = useOutflowCategoriesQuery();

  // mutation
  const createCategoryMutation = CreateOutflowCategory();

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
    if (title.length < 1 || amount <= 0) {
      setFormErrors({
        title: title.length < 1 ? "required" : null,
        amount: amount <= 0 ? "must be greater than 0" : null,
      });
      return;
    }
    e.preventDefault();
    const tempCategoryId = category ? category.id : null;
    handleItemAddition({
      id: prefillItemData?.id || Date.now().toString(),
      title: title.trim(),
      amount: Number(amount),
      balance: prefillItemData?.balance || Number(amount),
      category: tempCategoryId,
      description: description.trim(),
    });
    setShowBudgetItemModal(false);
  };

  const onCategoryChange = (category: CategoryType | Record | undefined) => {
    setCategory(category);
    setShowCategoryOptions(!showCategoryOptions);
  };

  return (
    <>
      <ModalContainer>
        <div id="modal-budget-item-form" ref={modalBudgetItemFormRef}>
          {showCreateCategoryModal ? null : (
            <>
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
                    <p className="validation-message">{formErrors.title}</p>
                  </div>

                  {/* amount  */}
                  <div className="amount">
                    <label htmlFor="amount">amount</label>
                    <input type="text" onChange={(e) => onAmountChange(e)} />
                    <p className="validation-message">{formErrors.amount}</p>
                  </div>

                  {/* category  */}
                  <div className="category">
                    <label htmlFor="category-options-container">Category</label>
                    <div
                      className="category-selected"
                      onClick={() =>
                        setShowCategoryOptions(!showCategoryOptions)
                      }
                      ref={categoryOptionsRef}
                    >
                      <div> {category ? category.title : "Others"}</div>
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
                      ref={categoryOptionsRef}
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

                      <div
                        className="category-options add-category"
                        onClick={(e) => setShowCreateCategoryModal(true)}
                      >
                        add category
                      </div>
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

export default ModalBudgetItemForm;
