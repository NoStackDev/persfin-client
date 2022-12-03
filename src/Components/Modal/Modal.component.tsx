import { useState } from "react";
import ModalContainer from "./Components/ModalContainer";
import ModalInflowForm from "./Components/ModalInflowForm";
import ModalOutflowForm from "./Components/ModalOutflowForm";
import ModalCategoryForm from "./Components/ModalCategoryForm";
import ModalSavingsForm from "./Components/ModalSavingsForm";

import "./Modal.style.scss";
import ModalBudgetForm from "./Components/ModalBudgetForm";

type Props = {
  quickActionId: number | null;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const getForm = ({quickActionId, setShowMainModal}: Props) => {
  if (!quickActionId) {
    return null;
  }
  switch (quickActionId) {
    case 1:
      return <ModalSavingsForm setShowMainModal={setShowMainModal}/>;
    case 2:
      return <ModalInflowForm setShowMainModal={setShowMainModal}/>;
    case 3:
      return <ModalOutflowForm setShowMainModal={setShowMainModal}/>;
    case 4:
      return <ModalCategoryForm categoryType="Inflow" setShowMainModal={setShowMainModal}/>;
    case 5:
      return <ModalCategoryForm categoryType="Outflow" setShowMainModal={setShowMainModal}/>;
    // case "budget":
    //   return <ModalBudgetForm />
    default:
      return null;
  }
};

const Modal = ({quickActionId, setShowMainModal}: Props) => {
  return (
    <section id="modal">
      <ModalContainer />
      {getForm({quickActionId, setShowMainModal})}
    </section>
  );
};

export default Modal;
