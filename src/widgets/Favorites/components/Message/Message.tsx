import { useId, type KeyboardEvent } from "react";

import { PixelButton, TypingText } from "shared/ui";

import css from "./Message.module.scss";

type Props = {
  text: string;
  onClose: () => void;
};

export const Message = ({ text, onClose }: Props) => {
  const titleId = useId();
  const textId = useId();

  if (!text) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
    }
  };

  return (
    <div className={css.layer}>
      <div
        className={css.window}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={textId}
        onKeyDown={handleKeyDown}
      >
        <div className={css.dialog}>
          <p id={titleId} className={css.titleBar}>
            warning.exe
          </p>
          <div id={textId} className={css.body}>
            <TypingText text={text} className={css.text} />
            <PixelButton className={css.ok} onClick={onClose} autoFocus>
              OK
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
};
