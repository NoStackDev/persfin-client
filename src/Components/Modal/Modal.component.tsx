import { useState } from "react";
import ModalContainer from "./Components/ModalContainer";
import ModalTransactionForm from "./Components/ModalTransactionForm";
// import ModalCategoryForm from "./Components/ModalCategoryForm";
// import ModalSavingsForm from "./Components/ModalSavingsForm";

import "./Modal.style.scss";
type Props = {};

const Modal = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return <section id="modal">
    <ModalContainer/>
    {/* <ModalCategoryForm/> */}
    {/* <ModalSavingsForm/> */}
    <ModalTransactionForm />
  </section>
};

export default Modal