import { Record } from "pocketbase";
import { useRef, useState } from "react";
import { UseMutationResult } from "react-query";
import { BudgetType, CategoryType } from "../../../../../../TypeDefs";
import { useOnClickOutside } from "../../../../../../Hooks";
import "./CreateCategoryForm.style.scss";
import ModalContainer from "../../../ModalContainer";

type Props = {
  categoryType: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  prefillData?: CategoryType | BudgetType | Record | null;
};

const CreateCategoryForm = ({
  categoryType,
  setShowModal,
  mutation,
  prefillData,
}: Props) => {
  const [title, setTitle] = useState<string>(prefillData?.title || "");
  const [description, setDescription] = useState<string>(
    prefillData?.description || ""
  );
  const [formErrors, setFormErrors] = useState<{
    title: string;
  }>({ title: "" });

  const createCategoryFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(createCategoryFormRef, setShowModal);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (title.trim().length < 1) {
      setFormErrors({ title: "required" });
      return;
    }

    if (prefillData) {
      mutation.mutate({
        categoryId: prefillData.id,
        title: title.trim(),
        description: description.trim(),
      });
      setShowModal(false);
      return;
    }

    mutation.mutate({ title: title.trim(), description: description.trim() });
    setShowModal(false);
  };

  return (
    <ModalContainer>
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
              <p className="validation-message">{formErrors.title}</p>
            </div>
            <div className="category-type">
              <label htmlFor="">Category Type</label>
              <input
                type="text"
                value={
                  categoryType.toLowerCase().includes("inflow")
                    ? "Inflow"
                    : "Outflow"
                }
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
    </ModalContainer>
  );
};

export default CreateCategoryForm;
