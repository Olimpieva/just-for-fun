import React, { PropsWithChildren } from "react";

import css from "./Modal.module.scss";

type Props = {
  onClose: () => void;
};

const Modal = ({ onClose, children }: PropsWithChildren<Props>) => (
  <div className={css.modal}>
    <div className={css.container}>
      <button className={css.closeButton} onClick={onClose}>
        <span>+</span>
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
