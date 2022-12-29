import React, { useState } from "react";
import { UseMutationResult } from "react-query";
import Modal from "../../../../Components/Modal";
import Spinner from "../../../../Components/Spinner";
import { CreateCategory } from "../../../../Mutations";

import "./ActionCard.style.scss";

type Props = {
  categoriesNum: number;
};

const ActionCard = ({ categoriesNum }: Props) => {
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [showMainModal, setShowMainModal] = useState<boolean>(false);

  // mutations
  const mutations: Record<
    number,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    6: CreateCategory(),
    7: CreateCategory(),
  };

  const handleClick = (formId: number) => {
    setSelectedFormId(formId);
    setShowMainModal(true);
  };

  return (
    <>
      <div className="action-card">
        <h2 className="title">Inflow Categories</h2>
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
          mutation={selectedFormId ? mutations[selectedFormId] : null}
        />
      ) : null}
      <Spinner
        mutation={selectedFormId ? mutations[selectedFormId] : null}
        message={"adding category"}
      />
    </>
  );
};

export default ActionCard;
