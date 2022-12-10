import { useState } from "react";
import ModalContainer from "./Components/ModalContainer";
import ModalInflowForm from "./Components/ModalInflowForm";
import ModalOutflowForm from "./Components/ModalOutflowForm";
import ModalCategoryForm from "./Components/ModalCategoryForm";
import ModalSavingsForm from "./Components/ModalSavingsForm";

import "./Modal.style.scss";
import ModalBudgetForm from "./Components/ModalBudgetForm";
import { UseMutateFunction } from "react-query";

type Props = {
  quickActionId: number | null;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: UseMutateFunction<any, unknown, any, unknown>| null;
};

interface GetFormArgs {
  quickActionId: number | null;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: UseMutateFunction<any, unknown, any, unknown>|null;
}

const getForm = ({ quickActionId, setShowMainModal, mutate }: GetFormArgs) => {
  if (!quickActionId || !mutate ) {
    return null;
  }
  switch (quickActionId) {
    case 1:
      return (
        <ModalSavingsForm setShowMainModal={setShowMainModal} mutate={mutate} />
      );
    case 2:
      return (
        <ModalInflowForm setShowMainModal={setShowMainModal} mutate={mutate} />
      );
    case 3:
      return (
        <ModalOutflowForm setShowMainModal={setShowMainModal} mutate={mutate} />
      );
    // case 4:
    //   return (
    //     <ModalCategoryForm
    //       categoryType="Inflow"
    //       setShowMainModal={setShowMainModal}
    //       mutate={mutate}
    //     />
    //   );
    // case 5:
    //   return (
    //     <ModalCategoryForm
    //       categoryType="Outflow"
    //       setShowMainModal={setShowMainModal}
    //       mutate={mutate}
    //     />
    //   );
    // case "budget":
    //   return <ModalBudgetForm setShowMainModal={setShowMainModal} mutate={mutate}/>
    default:
      return null;
  }
};

const Modal = ({ quickActionId, setShowMainModal, mutate }: Props) => {

  return (
    <section id="modal">
      <ModalContainer />
      {getForm({ quickActionId, setShowMainModal, mutate })}
    </section>
  );
};

export default Modal;
