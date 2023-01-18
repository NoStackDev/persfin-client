import ModalContainer from "./Components/ModalContainer";
import ModalInflowForm from "./Components/ModalInflowForm";
import ModalOutflowForm from "./Components/ModalOutflowForm";
import {
  CreateCategoryForm,
  ManageCategoryForm,
} from "./Components/ModalCategoryForm";
import ModalSavingsForm from "./Components/ModalSavingsForm";

import "./Modal.style.scss";
import ModalBudgetForm from "./Components/ModalBudgetForm";
import { UseMutationResult } from "react-query";
import { BudgetType, CategoryType } from "../../TypeDefs";
import { Record } from "pocketbase";

type Props = {
  quickActionId: number | null;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation?: UseMutationResult<any, unknown, any, unknown> | null;
  prefillData?: CategoryType | BudgetType | Record | null;
  categoryType?: string;
};

const getForm = ({
  quickActionId,
  setShowMainModal,
  mutation,
  prefillData,
  categoryType,
}: Props) => {
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
          prefillData={prefillData}
        />
      );
    case 6:
      return (
        <CreateCategoryForm
          categoryType={categoryType || ""}
          setShowMainModal={setShowMainModal}
          mutation={mutation}
          prefillData={prefillData}
        />
      );
    case 7:
      return (
        <ManageCategoryForm
          categoryType={categoryType || ""}
          setShowMainModal={setShowMainModal}
        />
      );
    default:
      return null;
  }
};

const Modal = ({
  quickActionId,
  setShowMainModal,
  mutation,
  prefillData,
  categoryType,
}: Props) => {
  return (
    <section id="modal">
      <ModalContainer />
      {getForm({
        quickActionId,
        setShowMainModal,
        mutation,
        prefillData,
        categoryType,
      })}
    </section>
  );
};

export default Modal;
