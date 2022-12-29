import { useState } from "react";
import { UseMutationResult } from "react-query";
import "./CreateCategoryForm.style.scss";

type Props = {
  categoryType: string;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const CreateCategoryForm = ({
  categoryType,
  setShowMainModal,
  mutation,
}: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const userId = "636ac4a250bbc5afa6004a8c";

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
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
            <input type="text" value={categoryType} readOnly />
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
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
