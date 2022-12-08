import { useState } from "react";
import "./ModalInflowForm.style.scss";
import { UseMutateFunction } from "react-query";
import { FetchCategories } from "../../../../Queries";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: UseMutateFunction<any, unknown, any, unknown>;
};

const ModalInflowForm = ({ setShowMainModal, mutate }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("Others");
  const [description, setDescription] = useState<string>("");
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const userId = "636ac4a250bbc5afa6004a8c";

  const { data: categoryData } = FetchCategories(userId);
  console.log(categoryData);
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    mutate({ userId, title, amount, category: categoryId, description });
    setShowMainModal(false);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string | null
  ) => {
    setCategoryId(id);
    setCategory(e.currentTarget.innerText.trim());
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
          <div className="category">
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
                onClick={(e) => onCategoryChange(e, null)}
              >
                Others
              </div>

              {categoryData.map(
                (ele: { title: string; _id: string; categoryType: string }) => {
                  if (ele.categoryType === "inflow")
                    return (
                      <div
                        className="category-options"
                        onClick={(e) => onCategoryChange(e, ele._id)}
                        key={ele._id}
                      >
                        {ele.title}
                      </div>
                    );
                }
              )}
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
          Add Inflow
        </button>
      </form>
    </div>
  );
};

export default ModalInflowForm;
