import { useState } from "react";
import ModalContainer from "./Components/ModalContainer";
import ModalInflowForm from "./Components/ModalInflowForm";
import ModalOutflowForm from "./Components/ModalOutflowForm";
import ModalCategoryForm from "./Components/ModalCategoryForm";
import ModalSavingsForm from "./Components/ModalSavingsForm";

import "./Modal.style.scss";
import ModalBudgetForm from "./Components/ModalBudgetForm";
import { UseMutationResult } from "react-query";

type Props = {
  quickActionId: number | null;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown> | null;
};

interface GetFormArgs {
  quickActionId: number | null;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown> | null;
}

const getForm = ({
  quickActionId,
  setShowMainModal,
  mutation,
}: GetFormArgs) => {
  if (!quickActionId || !mutation) {
    return null;
  }
  switch (quickActionId) {
    case 1:
      return (
        <ModalSavingsForm
          setShowMainModal={setShowMainModal}
          mutation={mutation}
        />
      );
    case 2:
      return (
        <ModalInflowForm
          setShowMainModal={setShowMainModal}
          mutation={mutation}
        />
      );
    case 3:
      return (
        <ModalOutflowForm
          setShowMainModal={setShowMainModal}
          mutation={mutation}
        />
      );
    case 4:
      return (
        <ModalBudgetForm
          setShowMainModal={setShowMainModal}
          mutation={mutation}
        />
      );
    case 5:
      return (
        <ModalCategoryForm
          categoryType="inflow"
          setShowMainModal={setShowMainModal}
          mutation={mutation}
        />
      );
    case 6:
      return (
        <ModalCategoryForm
          categoryType="outflow"
          setShowMainModal={setShowMainModal}
          mutation={mutation}
        />
      );
    default:
      return null;
  }
};

const Modal = ({ quickActionId, setShowMainModal, mutation }: Props) => {
  return (
    <section id="modal">
      <ModalContainer />
      {getForm({ quickActionId, setShowMainModal, mutation })}
    </section>
  );
};

export default Modal;
