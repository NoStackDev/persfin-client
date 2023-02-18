import { useState } from "react";
import { UseMutationResult } from "react-query";
import Spinner from "../../Components/Spinner";
import { CreateInflowCategory, CreateOutflowCategory } from "../../Mutations";
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

  const mutations: Record<
    string,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    inflowCategories: CreateInflowCategory(),
    outflowCategories: CreateOutflowCategory(),
  };

  const handleClick = (formId: number) => {
    setSelectedFormId(formId);
    setShowModal(true);
  };

  const renderModal = () => {
    if (showModal) {
      switch (selectedFormId) {
        case 7:
          return (
            <ModalManageCategoryForm
              categoryType={categoryType}
              setShowModal={setShowModal}
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
        mutation={selectedFormId ? mutations[categoryType] : null}
        loadingMessage={"adding category"}
        successMessage={"added category"}
        failMessage={"failed to add category"}
      />
    </>
  );
};

export default ActionCard;
