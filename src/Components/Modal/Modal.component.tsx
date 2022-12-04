import { useState } from "react";
import ModalContainer from "./Components/ModalContainer";
import ModalInflowForm from "./Components/ModalInflowForm";
import ModalOutflowForm from "./Components/ModalOutflowForm";
import ModalCategoryForm from "./Components/ModalCategoryForm";
import ModalSavingsForm from "./Components/ModalSavingsForm";

import "./Modal.style.scss";
import ModalBudgetForm from "./Components/ModalBudgetForm";
import { CreateSavings } from "../../Mutations";
import { UseMutateFunction } from "react-query";

type Props = {
  quickActionId: number | null;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  // mutate: UseMutateFunction<any, unknown, any, unknown>;
  mutations: Record<string, UseMutateFunction<any, unknown, any, unknown>>
};

interface GetFormArgs {
  quickActionId: number | null;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  // mutate: UseMutateFunction<any, unknown, any, unknown>;
  mutations: Record<string, UseMutateFunction<any, unknown, any, unknown>>
}

const getForm = ({ quickActionId, setShowMainModal, mutations }: GetFormArgs) => {
  if (!quickActionId) {
    return null;
  }
  switch (quickActionId) {
    case 1:
      return (
        <ModalSavingsForm setShowMainModal={setShowMainModal} mutate={mutations["1"]} />
      );
    // case 2:
    //   return (
    //     <ModalInflowForm setShowMainModal={setShowMainModal} mutate={mutate} />
    //   );
    // case 3:
    //   return (
    //     <ModalOutflowForm setShowMainModal={setShowMainModal} mutate={mutate} />
    //   );
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

const Modal = ({ quickActionId, setShowMainModal, mutations }: Props) => {


  return (
    <section id="modal">
      <ModalContainer />
      {getForm({ quickActionId, setShowMainModal, mutations })}
    </section>
  );
};

export default Modal;
