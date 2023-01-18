import React, { useState } from "react";
import { UseMutationResult } from "react-query";
import Modal from "../../Components/Modal";
import Spinner from "../../Components/Spinner";
import { CreateInflowCategory, CreateOutflowCategory } from "../../Mutations";

import "./ActionCard.style.scss";

type Props = {
  title: string;
  categoriesNum: number;
  categoryType: string;
};

const ActionCard = ({ title, categoriesNum, categoryType }: Props) => {
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [showMainModal, setShowMainModal] = useState<boolean>(false);

  const mutations: Record<
    string,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    inflowCategories: CreateInflowCategory(),
    outflowCategories: CreateOutflowCategory(),
  };

  const handleClick = (formId: number) => {
    setSelectedFormId(formId);
    setShowMainModal(true);
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
          Create Cagtegory
        </button>
      </div>
      {showMainModal ? (
        <Modal
          quickActionId={selectedFormId}
          setShowMainModal={setShowMainModal}
          mutation={selectedFormId ? mutations[categoryType] : null}
          categoryType={categoryType}
        />
      ) : null}
      <Spinner
        mutation={selectedFormId ? mutations[categoryType] : null}
        message={"adding category"}
      />
    </>
  );
};

export default ActionCard;
