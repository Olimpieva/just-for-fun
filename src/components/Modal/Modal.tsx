import React, { PropsWithChildren } from "react";
import { ReactComponent as CloseIcon } from "assets/close-icon-red.svg";

import css from "./Modal.module.scss";

type Props = {
  onClose: () => void;
};

const Modal = ({ onClose, children }: PropsWithChildren<Props>) => (
  <div className={css.modal}>
    <div className={css.container}>
      <button
        type="button"
        className={css.closeButton}
        onClick={onClose}
        aria-label="Закрыть окно"
      >
        <CloseIcon aria-hidden="true" />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
