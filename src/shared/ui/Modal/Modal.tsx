import { useEffect, useRef, type PropsWithChildren } from "react";

import CloseIcon from "assets/ui/close-icon-red.svg?react";

import css from "./Modal.module.scss";

type Props = {
  title: string;
  onClose: () => void;
};

export const Modal = ({ title, onClose, children }: PropsWithChildren<Props>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const container = containerRef.current;
    closeButtonRef.current?.focus();

    return () => {
      const activeElement = document.activeElement;
      if (
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected &&
        (activeElement === document.body || container?.contains(activeElement))
      ) {
        previousFocus.focus();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={css.modal}>
      <div ref={containerRef} className={css.container} role="dialog" aria-label={title}>
        <button
          ref={closeButtonRef}
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
};
