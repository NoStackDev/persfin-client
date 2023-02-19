import { useState } from "react";
import { UseMutationResult } from "react-query";
import Spinner from "../../Components/Spinner";
import {
  CreateInflowCategory,
  CreateOutflowCategory,
  DeleteInflowCategory,
  DeleteOutflowCategory,
  UpdateInflowCategory,
  UpdateOutflowCategory,
} from "../../Mutations";
import { ModalCreateCategoryForm, ModalManageCategoryForm } from "../Modal";

import "./ActionCard.style.scss";

type Props = {
  title: string;
  categoriesNum: number;
  categoryType: string;
};

const ActionCard = ({ title, categoriesNum, categoryType }: Props) => {
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const createMutations: Record<
    string,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    inflowCategories: CreateInflowCategory(),
    outflowCategories: CreateOutflowCategory(),
  };

  const deleteMutations: Record<
    string,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    inflowCategories: DeleteInflowCategory(),
    outflowCategories: DeleteOutflowCategory(),
  };

  const updateMutations: Record<
    string,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    inflowCategories: UpdateInflowCategory(),
    outflowCategories: UpdateOutflowCategory(),
  };

  const handleClick = (formId: number) => {
    setSelectedFormId(formId);
    setShowModal(true);
  };

  const renderModal = () => {
    if (showModal) {
      switch (selectedFormId) {
        case 6:
          return (
            <ModalCreateCategoryForm
              categoryType={categoryType}
              setShowModal={setShowModal}
              mutation={createMutations[categoryType]}
            />
          );

        case 7:
          return (
            <ModalManageCategoryForm
              categoryType={categoryType}
              setShowModal={setShowModal}
              updateMutation={updateMutations[categoryType]}
              deleteMutation={deleteMutations[categoryType]}
            />
          );
      }
    }
    return null;
  };

  return (
    <>
      <div className="action-card">
        <h2 className="title">{title}</h2>
        <h3 className="number">{categoriesNum}</h3>
        <button className="manage-categories" onClick={() => handleClick(7)}>
          Manage Categories
        </button>
        <button className="create-Category" onClick={() => handleClick(6)}>
          Create Category
        </button>
      </div>
      {renderModal()}
      <Spinner
        mutation={updateMutations[categoryType]}
        loadingMessage={"updating category"}
        successMessage={"updated category"}
        failMessage={"failed to update category"}
      />
      <Spinner
        mutation={deleteMutations[categoryType]}
        loadingMessage={"deleting category"}
        successMessage={"deleted category"}
        failMessage={"failed to delete category"}
      />
      <Spinner
        mutation={selectedFormId ? createMutations[categoryType] : null}
        loadingMessage={"adding category"}
        successMessage={"added category"}
        failMessage={"failed to add category"}
      />
    </>
  );
};

export default ActionCard;
