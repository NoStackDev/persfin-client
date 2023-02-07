import { useRef, useState } from "react";
import "./ModalInflowForm.style.scss";
import { UseMutationResult } from "react-query";
import { useInflowCategoriesQuery } from "../../../../Queries";
import { CategoryType } from "../../../../TypeDefs";
import { Record } from "pocketbase";
import { useOnClickOutside } from "../../../../Hooks";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const ModalInflowForm = ({ setShowMainModal, mutation }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<CategoryType | Record | null>(null);
  const [description, setDescription] = useState<string>("");
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<{
    title: string | null;
    amount: string | null;
  }>({ title: null, amount: null });

  const modalInflowFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalInflowFormRef, setShowMainModal);

  const { data: categoryData } = useInflowCategoriesQuery();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (title.length < 1 || amount <= 0) {
      setFormErrors({
        title: title.length < 1 ? "required" : null,
        amount: amount <= 0 ? "must be greater than 0" : null,
      });
      return;
    }

    mutation.mutate({
      title: title.trim(),
      amount,
      category: category?.id,
      description: description.trim(),
    });
    setShowMainModal(false);
  };

  const onCategoryChange = (category: CategoryType | Record | null) => {
    setCategory(category);
    setShowCategoryOptions(!showCategoryOptions);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setAmount(Number(e.target.value));
  };

  return (
    <div id="modal-inflow-form" ref={modalInflowFormRef}>
      <h2>Inflow</h2>

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
            <input
              type="text"
              onChange={(e) => onAmountChange(e)}
              value={amount}
            />
            <p className="validation-message">{formErrors.amount}</p>
          </div>

          {/* category  */}
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
                onClick={() => onCategoryChange(category)}
              >
                {category ? "Others" : null}
              </div>

              {categoryData?.map((ele) => {
                return (
                  <div
                    className="category-options"
                    onClick={(e) => onCategoryChange(ele)}
                    key={ele.id}
                  >
                    {ele.title.trim()}
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
        Add Inflow
      </button>
    </div>
  );
};

export default ModalInflowForm;
