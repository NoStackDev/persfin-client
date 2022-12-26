import { useState } from "react";
import "./ModalInflowForm.style.scss";
import { UseMutationResult } from "react-query";
import { FetchCategories } from "../../../../Queries";
import { CategoryType } from "../../../../Types";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const ModalInflowForm = ({ setShowMainModal, mutation }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [description, setDescription] = useState<string>("");
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const userId = "636ac4a250bbc5afa6004a8c";

  const { data: categoryData } = FetchCategories(userId);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutation.mutate({
      userId,
      title,
      amount,
      category: category?._id,
      description,
    });
    setShowMainModal(false);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category: CategoryType | null
  ) => {
    setCategory(category ? category : null);
    setShowCategoryOptions(!showCategoryOptions);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setAmount(Number(e.target.value));
  };

  return (
    <div id="modal-inflow-form">
      <form>
        <h2>Inflow</h2>
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
                if (ele.categoryType === "inflow" && ele._id !== category?._id)
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
          Add Inflow
        </button>
      </form>
    </div>
  );
};

export default ModalInflowForm;
