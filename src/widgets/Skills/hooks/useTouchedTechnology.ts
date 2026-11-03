import { useState, type KeyboardEvent, type PointerEvent } from "react";

export const useTouchedTechnology = () => {
  const [touched, setTouched] = useState<string | null>(null);

  const isTouched = (name: string) => touched === name;

  const getHandlers = (name: string) => ({
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "touch") {
        setTouched(current => (current === name ? null : name));
      }
    },
    onBlur: () => setTouched(null),
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Escape") {
        setTouched(null);
        event.currentTarget.blur();
      }
    },
  });

  return { isTouched, getHandlers };
};
