import { useState } from "react";
import { UseMutationResult } from "react-query";
import { BudgetType, CategoryType } from "../../../../../../TypeDefs";
import "./CreateCategoryForm.style.scss";

type Props = {
  categoryType: string;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  prefillData?: CategoryType | BudgetType | null;
};

const CreateCategoryForm = ({
  categoryType,
  setShowMainModal,
  mutation,
  prefillData,
}: Props) => {
  const [title, setTitle] = useState<string>(prefillData?.title || "");
  const [description, setDescription] = useState<string>(
    prefillData?.description || ""
  );

  const userId = "636ac4a250bbc5afa6004a8c";

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (prefillData) {
      mutation.mutate({ categoryId: prefillData._id, title, description });
      setShowMainModal(false);
      return;
    }

    mutation.mutate({ userId, title, categoryType, description });
    setShowMainModal(false);
  };

  return (
    <div id="modal-create-category-form">
      <form>
        <h2>Category</h2>
        <div className="form-body">
          <div className="title">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="category-type">
            <label htmlFor="">Category Type</label>
            <input type="text" value={categoryType||(prefillData as CategoryType)?.categoryType} readOnly />
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
          {prefillData? "Edit Category": "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
