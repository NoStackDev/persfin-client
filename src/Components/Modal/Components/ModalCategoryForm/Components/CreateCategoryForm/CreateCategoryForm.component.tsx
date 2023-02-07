import { Record } from "pocketbase";
import { useRef, useState } from "react";
import { UseMutationResult } from "react-query";
import { BudgetType, CategoryType } from "../../../../../../TypeDefs";
import { useOnClickOutside } from "../../../../../../Hooks";
import "./CreateCategoryForm.style.scss";

type Props = {
  categoryType: string;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  prefillData?: CategoryType | BudgetType | Record | null;
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
  const createCategoryFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(createCategoryFormRef, setShowMainModal);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (prefillData) {
      mutation.mutate({
        categoryId: prefillData.id,
        title: title.trim(),
        description: description.trim(),
      });
      setShowMainModal(false);
      return;
    }

    mutation.mutate({ title: title.trim(), description: description.trim() });
    setShowMainModal(false);
  };

  return (
    <div id="modal-create-category-form" ref={createCategoryFormRef}>
      <h2>Category</h2>

      <form>
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
            <input
              type="text"
              value={categoryType.includes("inflow") ? "Inflow" : "Outflow"}
              readOnly
            />
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
      </form>
      <button type="submit" onClick={(e) => onSubmit(e)}>
        {prefillData ? "Edit Category" : "Add Category"}
      </button>
    </div>
  );
};

export default CreateCategoryForm;
