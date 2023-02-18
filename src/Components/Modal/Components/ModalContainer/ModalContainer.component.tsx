import React, { Children } from "react"
import "./ModalContainer.style.scss"
type Props = {
  children?: React.ReactNode
}

const ModalContainer = (props: Props) => {
  return (
    <div id="modal-container">
      {props.children}
    </div>
  )
}

export default ModalContainer